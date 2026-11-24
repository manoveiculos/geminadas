'use client';

import React, { useState } from 'react';
import { Home, MapPin, Phone, X } from 'lucide-react';
import { PROPERTY, buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';

export function Footer() {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-[#FAFAFA] border-t border-gray-200/90 pt-10 pb-24 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-gray-200/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#065F46] text-white flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
                <span className="font-display font-extrabold text-base text-[#111827]">
                  {PROPERTY.name}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#065F46] shrink-0" />
                {PROPERTY.address} • CEP {PROPERTY.cep}
              </p>
            </div>

            <a
              href={buildWhatsAppUrl('Olá! Gostaria de falar sobre o Residencial Alêro.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('Contact', { source: 'footer_whatsapp' })}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#065F46] hover:text-emerald-800 transition-colors"
            >
              <Phone className="w-4 h-4" />
              WhatsApp: {PROPERTY.whatsappDisplay}
            </a>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {PROPERTY.name}. Todos os direitos reservados.</p>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                Política de Privacidade
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#111827] underline-offset-4 hover:underline transition-colors"
              >
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </footer>

      {legalModal && (
        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-[#111827]">
                {legalModal === 'privacy' ? 'Política de Privacidade' : 'Termos de Uso'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label="Fechar"
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm text-gray-600 space-y-4 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    O <strong>Residencial Alêro</strong> respeita a sua privacidade e atua em
                    conformidade com a Lei Geral de Proteção de Dados (LGPD).
                  </p>
                  <p>
                    Não coletamos CPF ou dados bancários neste site. As informações inseridas no
                    simulador servem exclusivamente para compor sua mensagem voluntária no WhatsApp.
                  </p>
                  <p>
                    Utilizamos cookies de mensuração (Google Analytics e Meta Pixel) apenas para
                    compreender o desempenho das campanhas e melhorar a experiência de navegação.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    As informações, valores e disponibilidades das Unidades 01 e 02 do{' '}
                    <strong>Residencial Alêro</strong> estão sujeitas a atualização sem aviso prévio
                    conforme negociação das unidades.
                  </p>
                  <p>
                    Os cálculos exibidos no simulador representam estimativas referenciais e não
                    constituem aprovação bancária ou proposta financeira vinculante.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
