'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROPERTY, buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

export function StickyMobileBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Exibe após rolar a primeira dobra
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-8px_28px_rgba(17,24,39,0.09)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center justify-between gap-2.5 max-w-lg mx-auto">
            <div className="shrink-0">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 leading-none">
                2 unidades prontas
              </span>
              <span className="block font-display font-extrabold text-[15px] text-[#111827] mt-1 whitespace-nowrap">
                A partir de {PROPERTY.priceShort}
              </span>
            </div>

            <a
              href={buildWhatsAppUrl(
                'Olá! Vi o Residencial Alêro no celular e gostaria de mais informações / agendar uma visita.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('Contact', {
                  source: 'sticky_mobile_bar',
                  content_name: 'Barra Fixa Mobile WhatsApp',
                });
                trackEvent('Lead', {
                  source: 'sticky_mobile_bar',
                  content_name: 'Barra Fixa Mobile WhatsApp',
                });
              }}
              className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#065F46] active:bg-emerald-800 text-white text-[13px] font-bold shadow-md active:scale-[0.98] transition-transform whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
