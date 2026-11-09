'use client';

import React from 'react';
import { Sparkles, Crown, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  freeLettersUsed: number;
  maxFreeLetters: number;
  onOpenPricing: () => void;
}

export const Header: React.FC<HeaderProps> = ({ freeLettersUsed, maxFreeLetters, onOpenPricing }) => {
  const remaining = Math.max(0, maxFreeLetters - freeLettersUsed);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">PenaDigital AI</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                Malaysia 🇲🇾
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Penjana Surat Rasmi Standard Kerajaan & Korporat</p>
          </div>
        </div>

        {/* Free quota and pricing */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium text-slate-700">
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Had Percuma: <strong className="text-emerald-700">{remaining}/{maxFreeLetters}</strong> surat</span>
          </div>

          <button
            onClick={onOpenPricing}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-sm transition-all"
          >
            <Crown className="w-4 h-4" />
            <span>Langgan Pro <span className="hidden sm:inline">(RM10/bln)</span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
