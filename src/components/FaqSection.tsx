'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS, buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-14 sm:py-20 bg-white border-t border-gray-200/70">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#065F46]">
            <HelpCircle className="w-3.5 h-3.5" />
            Perguntas Frequentes
          </span>
          <h2 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
            Tire suas dúvidas antes da visita
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Respostas diretas sobre documentação, financiamento, FGTS, troca de carro e enchentes.
          </p>
        </div>

        <div className="divide-y divide-gray-200/90 rounded-3xl border border-gray-200/90 bg-[#FAFAFA] overflow-hidden shadow-card">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.question} className="bg-white first:rounded-t-3xl last:rounded-b-3xl">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-7 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50/70 transition-colors"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#111827] leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#065F46] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 text-sm sm:text-[15px] text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Final Conversion Banner Below FAQ */}
        <div className="mt-8 sm:mt-10 rounded-3xl bg-[#111827] text-white p-6 sm:p-8 text-center shadow-soft">
          <h3 className="font-display font-extrabold text-xl sm:text-2xl">
            Ficou com alguma dúvida ou quer conhecer as casas pessoalmente?
          </h3>
          <p className="mt-2 text-sm text-gray-300 max-w-xl mx-auto">
            Converse agora pelo WhatsApp e agende sua visita sem compromisso nas 2 unidades prontas
            do Bairro Barragem.
          </p>
          <div className="mt-6">
            <a
              href={buildWhatsAppUrl(
                'Olá! Li as informações no site do Residencial Alêro e gostaria de tirar uma dúvida / agendar uma visita.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('Lead', { source: 'faq_final_cta', content_name: 'CTA Final FAQ' });
                trackEvent('Contact', { source: 'faq_final_cta', content_name: 'CTA Final FAQ' });
              }}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#052e16] font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Falar no WhatsApp Agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
