import { NextResponse } from 'next/server';
import { LetterFormData } from '@/types/letter';
import { LETTER_TEMPLATES } from '@/lib/templates';
import { formatMalaysianLetter } from '@/lib/letterFormatter';

export async function POST(req: Request) {
  try {
    const data: LetterFormData = await req.json();

    if (!data.templateId || !data.senderName) {
      return NextResponse.json({ error: 'Maklumat wajib tidak lengkap.' }, { status: 400 });
    }

    const template = LETTER_TEMPLATES.find((t) => t.id === data.templateId);
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    // IF NO API KEY IS CONFIGURED: Return instant high-quality local rule-based generation
    if (!apiKey) {
      const formatted = formatMalaysianLetter(data);
      return NextResponse.json({
        letter: formatted,
        isMock: true,
        message: 'Dijana menggunakan enjin templat standard Malaysia (Mod Luar Talian / API Key belum ditetapkan).',
      });
    }

    // AI PROMPT CONSTRUCTION (Mengikut panduan Kualiti AI Malaysia)
    const prompt = `Anda adalah pakar penulisan surat rasmi Bahasa Melayu mengikut standard Jabatan Perkhidmatan Awam (JPA) dan korporat Malaysia.
Tulis perenggan-perenggan isi kandungan bagi surat rasmi berikut.

PANDUAN KETAT:
1. Format Surat Rasmi Malaysia:
   - Perenggan pertama (1) TIDAK BERNOMBOR dan ringkas menyatakan tujuan surat dengan jelas.
   - Perenggan kedua (2) dan seterusnya DIBERIKAN NOMBOR (cth: "2.   ...", "3.   ...").
   - Bahasa Melayu baku, tatabahasa tinggi, sopan, bernada ${data.tone === 'sangat_formal' ? 'sangat formal, tegas dan tertib' : data.tone === 'ringkas' ? 'ringkas dan terus kepada maksud' : 'rasmi dan sopan'}.
2. Larangan Reka Fakta (Anti-Hallucination):
   - JANGAN reka nombor kad pengenalan, nombor akaun, atau fakta baharu yang tidak dibekalkan oleh pengguna.
   - Jika maklumat kritikal tiada, gunakan penanda [ISI DI SINI].
3. Format Output:
   - Kembalikan HANYA senarai perenggan dalam format JSON array of strings: ["perenggan 1", "perenggan 2", "perenggan 3"].
   - Jangan sertakan kepala surat (alamat/tarikh) dalam array ini kerana sistem telah menguruskannya secara berasingan.

MAKLUMAT PENGGUNA:
- Jenis Surat: ${template?.name || 'Surat Rasmi'}
- Pengirim: ${data.senderName} (${data.specificData?.jawatanSemasa || 'Individu'})
- Penerima: ${data.recipientTitle || 'Penerima'}, ${data.recipientCompany || 'Organisasi'}
- Tajuk: ${data.subject || template?.defaultSubject}
- Butiran Spesifik: ${JSON.stringify(data.specificData, null, 2)}
- Nota Tambahan Pengguna: ${data.additionalNotes || 'Tiada'}

KEMBALIKAN HANYA JSON VALID BERBENTUK:
{
  "paragraphs": [
    "Perenggan 1 (tanpa nombor)...",
    "Perenggan 2 (huraian terperinci)...",
    "Perenggan 3 (harapan/tindakan seterusnya)..."
  ]
}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!response.ok) {
      console.warn('Gemini API call failed, falling back to local formatter', await response.text());
      const fallback = formatMalaysianLetter(data);
      return NextResponse.json({
        letter: fallback,
        isMock: true,
        message: 'API AI menghadapi gangguan sementara. Menggunakan templat standard.',
      });
    }

    const result = await response.json();
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
    let paragraphs: string[] = [];

    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        paragraphs = parsed.paragraphs || [];
      } catch (e) {
        console.error('Failed to parse AI JSON output:', e);
      }
    }

    const formatted = formatMalaysianLetter(data, paragraphs.length > 0 ? paragraphs : undefined);
    return NextResponse.json({
      letter: formatted,
      isMock: false,
      message: 'Surat berjaya dijana dengan AI mengikut format rasmi JPA Malaysia.',
    });
  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Ralat semasa menjana surat rasmi.' },
      { status: 500 }
    );
  }
}
