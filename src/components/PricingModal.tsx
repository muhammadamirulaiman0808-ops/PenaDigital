'use client';

import React, { useState } from 'react';
import { X, Check, Crown, Loader2, CreditCard, ShieldCheck } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'pay_per_surat' | 'pro' | null>(null);
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/create-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan,
          name: payerName,
          email: payerEmail,
          phone: payerPhone,
        }),
      });

      const data = await res.json();

      if (res.ok && data.paymentUrl) {
        // Redirect to ToyyibPay FPX Gateway
        window.location.href = data.paymentUrl;
      } else {
        setErrorMessage(data.error || 'Gagal memulakan pembayaran. Sila cuba sebentar lagi.');
      }
    } catch (err: any) {
      setErrorMessage('Ralat sambungan ke gateway perbankan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="relative p-6 sm:p-8 text-center bg-gradient-to-b from-slate-50 to-white border-b border-slate-100">
          <button
            onClick={() => {
              setSelectedPlan(null);
              onClose();
            }}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            Pelan & Bayaran Selamat FPX
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
            Pilih Pelan PenaDigital AI Anda
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
            Disokong pembayaran perbankan atas talian FPX Malaysia (Maybank, CIMB, Bank Islam, RHB, dll.).
          </p>
        </div>

        {/* If a plan is selected: Show Checkout Form */}
        {selectedPlan ? (
          <form onSubmit={handleCheckout} className="p-6 sm:p-8 max-w-md mx-auto space-y-4">
            <div className="text-center pb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Pelan Dipilih:</span>
              <h3 className="text-lg font-extrabold text-slate-900">
                {selectedPlan === 'pay_per_surat' ? 'Pay-Per-Surat (RM 2.00)' : 'PenaDigital Pro Bulanan (RM 10.00)'}
              </h3>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Penuh</label>
              <input
                type="text"
                required
                placeholder="Cth: Muhammad Danish"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Emel (Untuk Resit FPX)</label>
              <input
                type="email"
                required
                placeholder="Cth: nama@email.com"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">No. Telefon</label>
              <input
                type="tel"
                required
                placeholder="Cth: 0123456789"
                value={payerPhone}
                onChange={(e) => setPayerPhone(e.target.value)}
                className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="w-1/3 py-2.5 px-4 text-xs font-semibold rounded-lg border border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
              >
                Kembali
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 py-2.5 px-4 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center space-x-2 shadow-md disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyambung ke FPX...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Terus ke FPX Bank</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-500 flex items-center justify-center space-x-1 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dikuasakan oleh ToyyibPay & Bank Negara Malaysia</span>
            </p>
          </form>
        ) : (
          /* Pricing Cards Grid */
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
                  Sesuai untuk mencuba dan melihat format surat rasmi.
                </p>

                <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>3 surat sebulan percuma</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Akses semua 10 templat asas</span>
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
                Guna Sekarang (Percuma)
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
                  <span className="text-3xl font-black text-slate-900">RM2.00</span>
                  <span className="text-xs text-slate-500 ml-1">/ surat</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  Paling popular untuk pelajar atau urusan sekali-sekala.
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
                    <span>Tanpa sebarang watermark</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Jana semula tanpa had dalam 24 jam</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan('pay_per_surat')}
                className="mt-6 w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              >
                Bayar RM2.00 (FPX)
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
                  <span>Akses Penuh</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pro Bulanan</h3>
                <div className="mt-3 flex items-baseline">
                  <span className="text-3xl font-black text-slate-900">RM10.00</span>
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
                    <span>Eksport tanpa had Word (.docx) & PDF</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sokongan keutamaan</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setSelectedPlan('pro')}
                className="mt-6 w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all shadow-md"
              >
                Langgan Pro RM10.00 (FPX)
              </button>
            </div>
          </div>
        )}

        {/* Footer reassurance */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          🔒 Pembayaran selamat dikuasakan oleh ToyyibPay & FPX Perbankan Internet Malaysia.
        </div>
      </div>
    </div>
  );
};
