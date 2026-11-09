import { LetterFormData, GeneratedLetter } from '@/types/letter';
import { LETTER_TEMPLATES } from './templates';

export function formatMalaysianLetter(data: LetterFormData, generatedParagraphs?: string[]): GeneratedLetter {
  const template = LETTER_TEMPLATES.find(t => t.id === data.templateId);
  const closingPhrase = data.tone === 'sangat_formal' 
    ? 'BERKHIDMAT UNTUK NEGARA' 
    : data.tone === 'ringkas' 
    ? 'Yang ikhlas,' 
    : 'Yang benar,';

  // Fallback paragraphs if AI is not available
  const paragraphs = generatedParagraphs && generatedParagraphs.length > 0 
    ? generatedParagraphs 
    : buildFallbackParagraphs(data, template);

  const senderBlock = `${data.senderName || '[Nama Pengirim]'}
${data.senderAddress || '[Alamat Pengirim]'}
${data.senderPhone ? `No. Telefon: ${data.senderPhone}` : ''}
${data.senderEmail ? `Emel: ${data.senderEmail}` : ''}`.trim();

  const recipientBlock = `${data.recipientTitle || '[Jawatan Penerima]'}
${data.recipientCompany || '[Nama Organisasi / Syarikat]'}
${data.recipientAddress || '[Alamat Penerima]'}`.trim();

  const dateAndRef = {
    date: data.letterDate || new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
    refNo: data.refNo || undefined
  };

  const subject = (data.subject || template?.defaultSubject || 'SURAT RASMI').toUpperCase();

  const signatureBlock = {
    phrase: closingPhrase,
    name: (data.senderName || '[NAMA PENGIRIM]').toUpperCase(),
    designation: data.specificData?.['jawatanSemasa'] || data.specificData?.['noMatrik'] || undefined
  };

  // Full plain text representation
  const lineDivider = '─'.repeat(60);
  const fullFormattedText = `${senderBlock}
${lineDivider}
${recipientBlock}

Rujukan Kami : ${dateAndRef.refNo || '─'}
Tarikh       : ${dateAndRef.date}

${data.salutation || 'Tuan / Puan,'}

${subject}

${paragraphs.map((p, idx) => {
  if (idx === 0) return p;
  return `${idx + 1}.   ${p}`;
}).join('\n\n')}

${template?.suggestedClosing || 'Kerjasama daripada pihak Tuan amat saya hargai.'}

Sekian, terima kasih.

"${signatureBlock.phrase}"


..........................................
(${signatureBlock.name})
${signatureBlock.designation ? signatureBlock.designation : ''}
`.trim();

  return {
    senderBlock,
    recipientBlock,
    dateAndRef,
    salutation: data.salutation || 'Tuan / Puan,',
    subject,
    paragraphs,
    closing: template?.suggestedClosing || 'Kerjasama daripada pihak Tuan amat saya hargai.',
    signatureBlock,
    fullFormattedText
  };
}

function buildFallbackParagraphs(data: LetterFormData, template?: ReturnType<typeof LETTER_TEMPLATES.find>): string[] {
  const d = data.specificData;
  switch (data.templateId) {
    case 'cuti_kerja':
      return [
        `Adalah saya dengan segala hormatnya merujuk kepada perkara di atas.`,
        `Saya, ${data.senderName}, bertugas sebagai ${d.jawatanSemasa || 'kakitangan syarikat'} ingin memohon cuti rehat bagi tempoh ${d.jumlahHari || 'beberapa hari'} bermula dari ${d.tarikhMula || '[Tarikh Mula]'} sehingga ${d.tarikhTamat || '[Tarikh Tamat]'}.`,
        `Tujuan permohonan cuti ini adalah kerana ${d.alasanCuti || 'mempunyai urusan keluarga yang tidak dapat dielakkan'}. Segala tugasan penting dan perkara mendesak telah saya selesaikan dan diserahkan kepada perhatian ${d.penamaTugas || 'rakan sekerja'} sepanjang ketiadaan saya.`,
        `Sehubungan itu, saya memohon pertimbangan yang sewajarnya daripada pihak Tuan/Puan untuk meluluskan permohonan cuti ini.`
      ];

    case 'letak_jawatan':
      return [
        `Dengan segala hormatnya, saya merujuk kepada perkara yang tersebut di atas.`,
        `Sukacita dimaklumkan bahawa saya, ${data.senderName}, dengan ini mengemukakan notis rasmi peletakan jawatan saya sebagai ${d.jawatanSemasa || 'kakitangan'} di ${data.recipientCompany || 'syarikat ini'}, berkuat kuasa mengikut tempoh notis ${d.tempohNotis || 'satu bulan'}. Hari terakhir saya berkhidmat adalah pada ${d.tarikhAkhir || '[Tarikh Akhir]'}.`,
        `Keputusan ini diambil ${d.sebabRingkas ? `kerana ${d.sebabRingkas}` : 'setelah pertimbangan teliti demi hala tuju peribadi dan kerjaya saya'}. Sepanjang tempoh notis ini, saya bersedia memberi kerjasama penuh dalam memastikan proses penyerahan tugas (handover) berjalan lancar dan teratur.`,
        `Saya ingin merakamkan setinggi-tinggi penghargaan dan terima kasih kepada pihak pengurusan serta rakan sekerja atas segala sokongan, peluang dan bimbingan yang telah dicurahkan sepanjang tempoh perkhidmatan saya di sini.`
      ];

    case 'aduan_pbt':
      return [
        `Dengan segala hormatnya saya menarik perhatian pihak Tuan/Puan mengenai perkara di atas.`,
        `Saya selaku wakil penduduk ingin mengemukakan aduan rasmi berhubung ${d.jenisAduan || 'kerosakan fasiliti awam'} yang berlokasi di ${d.lokasiTepat || '[Lokasi Lengkap]'}. Masalah ini telah berlarutan dan memerlukan perhatian segera pihak berkuasa tempatan.`,
        `Keadaan tersebut telah ${d.kesanMasalah || 'menimbulkan risiko keselamatan yang serius kepada penduduk dan pengguna jalan raya'}. Sekiranya tidak dibaiki segera, dikhuatiri boleh menyebabkan kemalangan atau kerugian yang lebih besar.`,
        `Justeru itu, besarlah harapan kami agar pihak Tuan/Puan dapat menjalankan pemeriksaan tapak dan melaksanakan ${d.tuntutanTindakan || 'tindakan pembaikan segera'} demi kesejahteraan masyarakat setempat.`
      ];

    case 'rayuan_saman':
      return [
        `Dengan segala hormatnya perkara di atas adalah dirujuk.`,
        `Saya merujuk kepada Notis Saman No. ${d.noNotisSaman || '[No Saman]'} yang dikenakan ke atas kenderaan bernombor pendaftaran ${d.noKenderaan || '[No Plat]'} atas kesalahan ${d.kesalahanDinyatakan || 'meletak kenderaan'}.`,
        `Dengan penuh rasa rendah diri, saya mengakui kesilapan tersebut dan memohon rayuan pengurangan kadar kompaun atas sebab ${d.alasanRayuan || 'kesempitan kewangan yang dihadapi pada masa ini'}. Kejadian tersebut berlaku di luar kawalan saya dan saya berjanji akan lebih berwaspada pada masa hadapan.`,
        `Oleh yang demikian, saya merayu jasa baik pihak Tuan agar dapat memberikan pertimbangan diskaun pengurangan denda ke tahap yang paling minimum.`
      ];

    case 'tuntutan_bayaran':
      return [
        `Dengan hormatnya perkara di atas adalah dirujuk.`,
        `Pihak kami ingin menarik perhatian Tuan/Puan berhubung Invois No. ${d.noInvois || '[No Invois]'} yang berjumlah ${d.jumlahTertunggak || 'RM [Jumlah]'} bagi ${d.perkhidmatanDibekal || 'pembekalan perkhidmatan'} yang telah disempurnakan.`,
        `Berdasarkan rekod akaun kami, tarikh matang bagi invois tersebut telah luput pada ${d.tarikhMatangLalu || '[Tarikh Matang]'}, namun sehingga ke hari ini bayaran masih belum kami terima.`,
        `Sehubungan itu, kami memohon kerjasama pihak Tuan/Puan untuk menjelaskan bayaran tertunggak ini dalam kadar segera ke akaun bank: ${d.maklumatAkaunBank || '[Maklumat Akaun Bank]'}. Sila abaikan surat ini sekiranya pembayaran telah dilakukan.`
      ];

    default:
      return [
        `Dengan segala hormatnya perkara di atas adalah dirujuk.`,
        `Saya, ${data.senderName}, ingin memaklumkan kepada pihak Tuan/Puan mengenai permohonan ini berhubung ${data.subject || 'urusan berkaitan'}.`,
        `Permohonan ini dikemukakan dengan tujuan untuk ${data.additionalNotes || 'mendapatkan pertimbangan dan kelulusan daripada pihak pengurusan yang bertanggungjawab'}.`,
        `Segala dokumen sokongan yang diperlukan sedia dilampirkan bagi melancarkan proses semakan dan tindakan lanjut pihak Tuan/Puan.`
      ];
  }
}
