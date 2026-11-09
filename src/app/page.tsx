'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { TemplateSelector } from '@/components/TemplateSelector';
import { LetterForm } from '@/components/LetterForm';
import { LetterPreview } from '@/components/LetterPreview';
import { PricingModal } from '@/components/PricingModal';
import { LetterTemplate, LetterFormData, GeneratedLetter } from '@/types/letter';
import { LETTER_TEMPLATES } from '@/lib/templates';
import { formatMalaysianLetter } from '@/lib/letterFormatter';
import { CheckCircle, ShieldCheck, Clock, FileDown, HelpCircle } from 'lucide-react';

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate | null>(null);
  const [step, setStep] = useState<'selector' | 'form' | 'preview'>('selector');
  const [formData, setFormData] = useState<LetterFormData | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [generationMessage, setGenerationMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [freeLettersUsed, setFreeLettersUsed] = useState(0);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('surat_ai_quota');
    if (saved) {
      setFreeLettersUsed(parseInt(saved, 10) || 0);
    }

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('payment') === 'success') {
        setPaymentSuccess(true);
        localStorage.setItem('surat_ai_quota', '0'); // Reset / grant access
      }
    }
  }, []);

  const handleSelectTemplate = (template: LetterTemplate) => {
    setSelectedTemplate(template);
    setStep('form');
  };

  const handleBackToSelector = () => {
    setStep('selector');
  };

  const handleFormSubmit = async (data: LetterFormData) => {
    setFormData(data);
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.letter) {
        setGeneratedLetter(result.letter);
        setIsMock(result.isMock || false);
        setGenerationMessage(result.message || '');
        setStep('preview');

        // Increment quota
        const updatedQuota = freeLettersUsed + 1;
        setFreeLettersUsed(updatedQuota);
        localStorage.setItem('surat_ai_quota', updatedQuota.toString());
      } else {
        // Fallback to local formatter
        const fallback = formatMalaysianLetter(data);
        setGeneratedLetter(fallback);
        setIsMock(true);
        setGenerationMessage('Dijana menggunakan enjin templat standard.');
        setStep('preview');
      }
    } catch (err) {
      console.error('API Error:', err);
      const fallback = formatMalaysianLetter(data);
      setGeneratedLetter(fallback);
      setIsMock(true);
      setGenerationMessage('Menjana secara mod templat tempatan.');
      setStep('preview');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    if (formData) {
      handleFormSubmit(formData);
    }
  };

  const handleNewLetter = () => {
    setStep('selector');
    setSelectedTemplate(null);
    setGeneratedLetter(null);
  };

  return (
    <>
      <Header
        freeLettersUsed={freeLettersUsed}
        maxFreeLetters={3}
        onOpenPricing={() => setIsPricingOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {paymentSuccess && (
          <div className="mb-6 bg-emerald-500 text-white p-4 rounded-xl shadow-lg flex items-center justify-between animate-fade-in no-print">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Pembayaran FPX Anda Berjaya!</h4>
                <p className="text-xs text-emerald-100">
                  Terima kasih kerana melanggan. Akaun anda kini telah dinaik taraf untuk akses penuh.
                </p>
              </div>
            </div>
            <button
              onClick={() => setPaymentSuccess(false)}
              className="text-white hover:text-emerald-200 text-xs font-semibold px-3 py-1 bg-white/20 rounded-lg"
            >
              Tutup
            </button>
          </div>
        )}
        {step === 'selector' && (
          <div className="space-y-12">
            <TemplateSelector
              selectedTemplateId={selectedTemplate?.id || ''}
              onSelectTemplate={handleSelectTemplate}
            />

            {/* Why choose this platform section (Section 4 & 9 of business plan) */}
            <div className="pt-8 border-t border-slate-200">
              <h2 className="text-center text-lg font-bold text-slate-800 mb-6">
                Kenapa Guna PenaDigital AI?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Format Piawai Malaysia</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Mengikut susun atur rasmi kerajaan & korporat: tajuk bold, nombor perenggan bermula perenggan kedua, dan penutup rasmi.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Siap Kurang 30 Saat</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Tak perlu cari contoh di Google atau pening memikirkan ayat. Hanya isi 4–5 ruang ringkas dan surat anda terus siap.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <FileDown className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Eksport Word (.docx) & PDF</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Muat turun terus ke Microsoft Word untuk disimpan atau diedit, serta sokongan cetakan terus PDF bersaiz A4.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SEO & FAQ Section (Minggu 4 pelan perniagaan) */}
            <div className="bg-slate-100/70 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>Soalan Lazim (FAQ)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Adakah format surat ini diterima jabatan kerajaan dan majikan?</h4>
                  <p className="text-slate-600">
                    Ya. Susun atur mematuhi panduan penulisan surat rasmi Malaysia dengan kedudukan alamat, nombor rujukan, tarikh, tajuk huruf besar bergaris, dan penutup "Sekian, terima kasih".
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-1">Adakah data peribadi saya disimpan?</h4>
                  <p className="text-slate-600">
                    Privasi anda adalah keutamaan kami (PDPA). Teks surat dijana secara terus dan anda mempunyai kawalan penuh untuk menyunting maklumat sebelum memuat turun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'form' && selectedTemplate && (
          <LetterForm
            template={selectedTemplate}
            onBack={handleBackToSelector}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        )}

        {step === 'preview' && generatedLetter && formData && (
          <LetterPreview
            letter={generatedLetter}
            formData={formData}
            isMock={isMock}
            message={generationMessage}
            onRegenerate={handleRegenerate}
            onNewLetter={handleNewLetter}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} <strong>PenaDigital AI</strong>. Hak Cipta Terpelihara (Malaysia).
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:underline cursor-pointer">Syarat Perkhidmatan</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Dasar Privasi (PDPA)</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer" onClick={() => setIsPricingOpen(true)}>Harga & Pakej</span>
          </div>
        </div>
      </footer>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
      />
    </>
  );
}
