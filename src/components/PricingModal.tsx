'use client';

import React from 'react';
import { X, Check, Sparkles, Zap, Shield, Crown } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="relative p-6 sm:p-8 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Pelan & Harga Telus
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Pilih Pelan Yang Sesuai Untuk Anda
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Tiada langganan tersembunyi. Boleh bayar sekali sahaja atau langgan bulanan untuk jimat lebih banyak.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Percuma */}
          <div className="rounded-xl p-5 border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Percubaan
              </div>
              <h3 className="text-xl font-bold text-slate-900">Percuma</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-3xl font-black text-slate-900">RM0</span>
                <span className="text-xs text-slate-500 ml-1">/ selamanya</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Sesuai untuk mencuba dan melihat format surat.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3 surat sebulan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Akses templat asas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eksport cetak PDF</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 px-4 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 transition-colors"
            >
              Guna Sekarang
            </button>
          </div>

          {/* Card 2: Pay-per-surat */}
          <div className="rounded-xl p-5 border border-slate-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                Sekali Guna
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pay-Per-Surat</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-3xl font-black text-slate-900">RM1.90</span>
                <span className="text-xs text-slate-500 ml-1">/ surat</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Paling popular untuk pelajar atau pengguna sekali-sekala.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1 surat siap format rasmi</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Muat turun fail Word (.docx) & PDF</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tanpa watermark</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Jana semula tanpa had dalam 24 jam</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                alert('Sistem pembayaran dalam talian (Billplz / ToyyibPay) akan diaktifkan untuk akaun anda tidak lama lagi!');
                onClose();
              }}
              className="mt-6 w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
            >
              Pilih Pay-Per-Surat
            </button>
          </div>

          {/* Card 3: Pro Bulanan */}
          <div className="rounded-xl p-5 border-2 border-emerald-500 bg-gradient-to-b from-emerald-50/50 to-white flex flex-col justify-between relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
              Paling Bernilai
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center space-x-1">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Tanpa Had</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Pro Bulanan</h3>
              <div className="mt-3 flex items-baseline">
                <span className="text-3xl font-black text-slate-900">RM9.90</span>
                <span className="text-xs text-slate-500 ml-1">/ bulan</span>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Untuk peniaga kecil, setiausaha persatuan, dan pencari kerja.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Surat tanpa had</strong> (penggunaan wajar)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Akses semua 10+ templat premium</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Simpan rekod & arkib surat lepas</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pilihan pelbagai nada & variasi AI</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                alert('Pakej Pro Bulanan akan dihubungkan ke ToyyibPay / FPX!');
                onClose();
              }}
              className="mt-6 w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all shadow-md"
            >
              Langgan Pro (RM9.90)
            </button>
          </div>
        </div>

        {/* Footer reassurance */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          🔒 Pembayaran selamat disokong FPX Perbankan Internet Malaysia (Maybank, CIMB, Bank Islam, RHB, dll.).
        </div>
      </div>
    </div>
  );
};
