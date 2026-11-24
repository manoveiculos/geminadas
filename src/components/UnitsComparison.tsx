'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Home, Ruler, Trees } from 'lucide-react';
import { UNITS, buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

export function UnitsComparison() {
  const handleUnitInterest = (unitName: string, position: string) => {
    trackEvent('Lead', {
      source: `unit_card_${unitName.toLowerCase().replace(/\s+/g, '_')}`,
      unit: `${unitName} (${position})`,
      content_name: `Interesse ${unitName}`,
    });
    trackEvent('Contact', {
      source: `unit_card_${unitName.toLowerCase().replace(/\s+/g, '_')}`,
      unit: `${unitName} (${position})`,
    });
  };

  return (
    <section id="unidades" className="py-14 sm:py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full">
            Escassez Real • Apenas 2 Casas no Empreendimento
          </span>
          <h2 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
            Unidade 01 vs. Unidade 02
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Compare lado a lado as duas casas geminadas disponíveis e escolha qual lado prefere
            visitar primeiro.
          </p>
        </div>

        {/* 2 Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {UNITS.map((unit, idx) => (
            <motion.article
              key={unit.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-card hover:shadow-soft transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Card Top Header */}
                <div className="flex items-start justify-between gap-3 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#065F46] flex items-center justify-center shrink-0">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-[#111827]">
                        {unit.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        {unit.position}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#065F46] text-[11px] font-extrabold uppercase tracking-wider shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    {unit.status}
                  </span>
                </div>

                {/* Price & Area Strip */}
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3 bg-[#FAFAFA] rounded-2xl p-4 border border-gray-100">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      Valor da Unidade
                    </span>
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#111827]">
                      R$ {unit.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200/80">
                      <Ruler className="w-3.5 h-3.5 text-[#065F46]" />
                      {unit.area}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-gray-200/80">
                      <Trees className="w-3.5 h-3.5 text-[#065F46]" />
                      Fundos p/ Mata
                    </span>
                  </div>
                </div>

                {/* Highlight */}
                <p className="mt-4 text-xs sm:text-sm font-medium text-[#065F46] bg-emerald-50/60 border border-emerald-100 rounded-xl px-3.5 py-2.5">
                  {unit.highlight}
                </p>

                {/* Specs Checklist */}
                <ul className="mt-5 space-y-2.5">
                  {unit.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2.5 text-sm text-gray-700 leading-snug"
                    >
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 text-[#065F46] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct Unit CTA */}
              <div className="mt-7 pt-5 border-t border-gray-100">
                <a
                  href={buildWhatsAppUrl(
                    `Olá! Tenho interesse na ${unit.name} (${unit.position}) do Residencial Alêro no Bairro Barragem. Pode me passar mais detalhes e horários para visita?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleUnitInterest(unit.name, unit.position)}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl bg-[#065F46] hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-sm transition-all active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Tenho interesse na {unit.name}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
