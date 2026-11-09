'use client';

import React, { useState } from 'react';
import { GeneratedLetter, LetterFormData } from '@/types/letter';
import { exportToDocx } from '@/lib/docxExport';
import { 
  Download, 
  Printer, 
  Copy, 
  Check, 
  RotateCcw, 
  PlusCircle, 
  Edit3, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface LetterPreviewProps {
  letter: GeneratedLetter;
  formData: LetterFormData;
  isMock: boolean;
  message?: string;
  onRegenerate: () => void;
  onNewLetter: () => void;
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({
  letter,
  formData,
  isMock,
  message,
  onRegenerate,
  onNewLetter,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [paragraphs, setParagraphs] = useState<string[]>(letter.paragraphs);
  const [subject, setSubject] = useState<string>(letter.subject);

  const handleCopy = () => {
    navigator.clipboard.writeText(letter.fullFormattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportWord = async () => {
    try {
      setIsExporting(true);
      const updatedLetter: GeneratedLetter = {
        ...letter,
        subject,
        paragraphs,
      };
      const filename = `Surat_${formData.templateId}_${Date.now()}.docx`;
      await exportToDocx(updatedLetter, filename);
    } catch (err) {
      console.error('Word export error:', err);
      alert('Ralat ketika memuat turun fail Word. Sila cuba lagi.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...paragraphs];
    updated[index] = value;
    setParagraphs(updated);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm no-print">
        <button
          onClick={onNewLetter}
          className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-slate-500" />
          <span>Surat Baharu</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onRegenerate}
            className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Jana Semula</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Disalin!' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak / PDF</span>
          </button>

          <button
            onClick={handleExportWord}
            disabled={isExporting}
            className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-md shadow-emerald-600/20"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Memuat turun...' : 'Muat Turun Word (.docx)'}</span>
          </button>
        </div>
      </div>

      {/* Info notification */}
      {message && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center space-x-2.5 no-print">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Editable tip */}
      <div className="bg-slate-100 border border-slate-200/80 rounded-lg px-4 py-2.5 flex items-center justify-between text-xs text-slate-600 no-print">
        <div className="flex items-center space-x-2">
          <Edit3 className="w-4 h-4 text-emerald-600" />
          <span>Anda boleh <strong>menyunting terus isi kandungan</strong> surat di bawah sebelum memuat turun.</span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">Format A4 Sebenar</span>
      </div>

      {/* A4 PAPER CONTAINER */}
      <div id="letter-printable" className="a4-paper font-sans text-slate-900 text-sm leading-relaxed border border-slate-200">
        {/* SENDER ADDRESS */}
        <div className="whitespace-pre-line text-xs font-normal text-slate-800">
          {letter.senderBlock}
        </div>

        {/* HORIZONTAL RULE */}
        <hr className="my-4 border-t-2 border-slate-800" />

        {/* RECIPIENT & DATE / REF */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="whitespace-pre-line text-xs font-normal text-slate-800 flex-1">
            {letter.recipientBlock}
          </div>

          <div className="text-xs text-right whitespace-nowrap text-slate-700">
            <div><span className="font-semibold">Rujukan Kami :</span> {letter.dateAndRef.refNo || '─'}</div>
            <div><span className="font-semibold">Tarikh       :</span> {letter.dateAndRef.date}</div>
          </div>
        </div>

        {/* SALUTATION */}
        <div className="mb-4 text-xs font-semibold text-slate-800">
          {letter.salutation}
        </div>

        {/* SUBJECT (TAJUK) */}
        <div className="mb-6 font-bold text-xs uppercase tracking-wide border-b border-transparent">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full font-bold uppercase underline focus:outline-none focus:bg-amber-50 px-1 -mx-1 rounded"
          />
        </div>

        {/* PARAGRAPHS */}
        <div className="space-y-4 text-xs leading-relaxed text-justify">
          {paragraphs.map((p, idx) => (
            <div key={idx} className="flex items-start space-x-2 group">
              {idx > 0 && (
                <span className="font-bold shrink-0 w-6 text-slate-800 pt-0.5">{idx + 1}.</span>
              )}
              <textarea
                rows={Math.max(2, Math.ceil(p.length / 75))}
                value={p}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                className="w-full bg-transparent focus:bg-amber-50 focus:outline-none p-1 -m-1 rounded resize-none border border-transparent hover:border-slate-200 focus:border-amber-300 transition-colors"
              />
            </div>
          ))}
        </div>

        {/* CLOSING */}
        <div className="mt-6 text-xs text-slate-800">
          {letter.closing}
        </div>

        <div className="mt-4 text-xs font-semibold text-slate-800">
          Sekian, terima kasih.
        </div>

        {/* VALEDICTION / SLOGAN */}
        <div className="mt-4 text-xs font-bold text-slate-900">
          "{letter.signatureBlock.phrase}"
        </div>

        {/* SIGNATURE SPACE */}
        <div className="mt-12 text-xs font-semibold text-slate-800 space-y-1">
          <div className="text-slate-400">...................................................</div>
          <div className="font-bold text-slate-900">({letter.signatureBlock.name})</div>
          {letter.signatureBlock.designation && (
            <div className="text-slate-600 font-normal">{letter.signatureBlock.designation}</div>
          )}
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-900 no-print">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block text-amber-950">Peringatan Penting:</strong>
          <span>
            Sila semak semula semua nama, tarikh, nombor akaun dan fakta penting sebelum surat diserahkan. Platform ini adalah alat bantu penulisan dan bukan pengganti khidmat guaman profesional.
          </span>
        </div>
      </div>
    </div>
  );
};
