'use client';

import React, { useState } from 'react';
import { LETTER_TEMPLATES, LETTER_CATEGORIES } from '@/lib/templates';
import { LetterTemplate, LetterCategory } from '@/types/letter';
import { 
  Briefcase, 
  GraduationCap, 
  AlertCircle, 
  Building2, 
  FileText, 
  ArrowRight, 
  Search,
  Sparkles
} from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: LetterTemplate) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  AlertCircle: <AlertCircle className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplateId,
  onSelectTemplate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = LETTER_TEMPLATES.filter((tpl) => {
    const matchesCat = activeCategory === 'semua' || tpl.category === activeCategory;
    const matchesQuery =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.defaultSubject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Format Rasmi Terkini 2026</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pilih Templat Surat Rasmi Anda
        </h1>
        <p className="text-slate-600 text-sm">
          Isi beberapa butiran penting dalam 30 saat. AI akan menyusun surat mengikut piawaian rasmi Malaysia, siap untuk dimuat turun ke Word atau PDF.
        </p>
      </div>

      {/* Search & Category Pills */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start w-full sm:w-auto">
          {LETTER_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 font-semibold'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{iconMap[cat.icon]}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari templat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplateId === template.id;
          return (
            <div
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={`group cursor-pointer rounded-xl p-5 border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {template.category.replace('_', ' ')}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                      Dipilih
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-base">
                  {template.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {template.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                <span>Gunakan Templat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
