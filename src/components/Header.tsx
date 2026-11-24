'use client';

import React from 'react';
import { Home, MapPin } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

export function Header() {
  const handleWhatsAppClick = () => {
    trackEvent('Contact', {
      source: 'header_whatsapp',
      content_name: 'Contato Header Residencial Alero',
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-3">
        <a
          href="#topo"
          className="flex items-center gap-2.5 group focus:outline-none"
          aria-label="Residencial Alêro — Voltar ao topo"
        >
          <div className="w-9 h-9 rounded-xl bg-[#065F46] text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-800 transition-colors">
            <Home className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-[15px] sm:text-base tracking-tight text-[#111827] leading-none">
              Residencial Alêro
            </span>
            <span className="text-[11px] font-medium text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#065F46] shrink-0" />
              Barragem • Rio do Sul
            </span>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#simulador"
            className="hidden sm:inline-flex items-center px-3.5 py-2 text-xs font-semibold text-gray-700 hover:text-[#065F46] rounded-lg hover:bg-gray-100/80 transition-colors"
          >
            Simular Financiamento
          </a>
          <a
            href={buildWhatsAppUrl(
              'Olá! Vi o site do Residencial Alêro no Bairro Barragem e gostaria de mais informações.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#065F46] hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span className="hidden xs:inline">Falar no</span> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
