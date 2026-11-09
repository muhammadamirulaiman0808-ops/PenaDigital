'use client';

import React, { useState } from 'react';
import { LetterTemplate, LetterFormData, LetterTone } from '@/types/letter';
import { ArrowLeft, Sparkles, HelpCircle, Building, User, Calendar, FileText } from 'lucide-react';

interface LetterFormProps {
  template: LetterTemplate;
  onBack: () => void;
  onSubmit: (formData: LetterFormData) => void;
  isLoading: boolean;
}

export const LetterForm: React.FC<LetterFormProps> = ({
  template,
  onBack,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<LetterFormData>({
    templateId: template.id,
    senderName: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    recipientTitle: '',
    recipientCompany: '',
    recipientAddress: '',
    salutation: template.defaultSalutation,
    letterDate: new Date().toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' }),
    refNo: '',
    tone: 'formal',
    subject: template.defaultSubject,
    specificData: {},
    additionalNotes: '',
  });

  const handleSpecificChange = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      specificData: {
        ...prev.specificData,
        [key]: val,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tukar Templat</span>
        </button>

        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
          {template.name}
        </span>
      </div>

      {/* Guidance box */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 flex items-start space-x-3 text-xs text-amber-900">
        <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block text-amber-950 mb-0.5">Panduan Templat:</strong>
          <span>{template.guidance}</span>
        </div>
      </div>

      {/* SECTION 1: Pengirim */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
          <User className="w-4 h-4 text-emerald-600" />
          <span>1. Maklumat Anda (Pengirim)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Penuh <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Cth: Muhammad Danish bin Roslan"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              No. Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Cth: 013-4567890"
              value={formData.senderPhone}
              onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Pengirim <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="Cth: No. 12, Jalan Desa Permai 4, 43000 Kajang, Selangor Darul Ehsan"
              value={formData.senderAddress}
              onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Penerima */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
          <Building className="w-4 h-4 text-emerald-600" />
          <span>2. Maklumat Penerima (Organisasi / Majikan / Pihak Berkuasa)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Jawatan Penerima <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Cth: Pengarah Urusan / Pegawai Aduan Awam / Dekan"
              value={formData.recipientTitle}
              onChange={(e) => setFormData({ ...formData, recipientTitle: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Organisasi / Syarikat <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Cth: Majlis Perbandaran Kajang / Syarikat Maju Sdn Bhd"
              value={formData.recipientCompany}
              onChange={(e) => setFormData({ ...formData, recipientCompany: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Alamat Lengkap Penerima <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              placeholder="Cth: Menara MPKj, Jalan Cempaka Putih, 43000 Kajang, Selangor"
              value={formData.recipientAddress}
              onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
              className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Butiran Khusus Surat */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 text-slate-900 font-bold text-sm">
          <FileText className="w-4 h-4 text-emerald-600" />
          <span>3. Butiran Surat: {template.name}</span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tajuk Surat (Huruf Besar Mengikut Standard)
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full text-xs font-semibold px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase"
            />
          </div>

          {template.fields.map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  required={field.required}
                  rows={3}
                  placeholder={field.placeholder}
                  value={formData.specificData[field.key] || ''}
                  onChange={(e) => handleSpecificChange(field.key, e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              ) : (
                <input
                  type="text"
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData.specificData[field.key] || ''}
                  onChange={(e) => handleSpecificChange(field.key, e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              )}
            </div>
          ))}

          {/* Nada Surat */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tahap Nada Surat:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'formal', label: 'Rasmi & Sopan (Standard)' },
                { id: 'sangat_formal', label: 'Sangat Formal & Tertib' },
                { id: 'ringkas', label: 'Ringkas & Padat' },
              ].map((tone) => (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, tone: tone.id as LetterTone })}
                  className={`px-3 py-2 text-xs rounded-lg border font-medium transition-all text-center ${
                    formData.tone === tone.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-1 ring-emerald-500'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tone.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Menjana Surat Rasmi Mengikut Standard...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Jana Surat Rasmi Sekarang (Percuma)</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center text-slate-500 mt-2">
          Format menepati garis panduan surat rasmi JPA Malaysia & boleh disunting sebelum dimuat turun.
        </p>
      </div>
    </form>
  );
};
