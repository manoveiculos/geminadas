'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Trees,
  Sparkles,
  FileCheck2,
  MapPin,
  Navigation,
  Clock,
} from 'lucide-react';
import { DISTANCES, PROPERTY } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';

export function HighlightsAndLocation() {
  return (
    <section id="diferenciais" className="py-14 sm:py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#065F46]">
            Por que escolher o Residencial Alêro
          </span>
          <h2 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
            Segurança, acabamento e localização estratégica em Rio do Sul
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Projetado para resolver os principais cuidados de quem compra casa na nossa região.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Primary Highlight: 100% Fora de Enchente */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-2 bg-gradient-to-br from-[#065F46] to-[#064E3B] text-white rounded-3xl p-6 sm:p-7 shadow-soft relative overflow-hidden"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-[11px] font-bold uppercase tracking-wider mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              Tranquilidade Garantida
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-snug">
              100% Fora de Enchente e Área de Risco
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-xl">
              Localizado na Rua Antônio Tonon, no Bairro Barragem — ponto seguro e valorizado de
              Rio do Sul, sem histórico de alagamentos. Proteção real para sua família e seu
              patrimônio.
            </p>
          </motion.div>

          {/* Fundos com Área de Preservação */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.06 }}
            className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-card"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-[#065F46] flex items-center justify-center mb-4">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#111827]">
              Fundos com Área de Preservação
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Privacidade total sem vizinhos de janela nos fundos, com vista verde permanente para a
              mata nativa e espaço ideal para sua área de lazer.
            </p>
          </motion.div>

          {/* Acabamento Refinado */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-card"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#111827]">
              Acabamento Refinado
            </h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              Piso porcelanato polido e retificado, massa corrida, banheiros com nicho embutido e
              infraestrutura pronta para ar-condicionado split.
            </p>
          </motion.div>
        </div>

        {/* Location + Strategic Distances + Interactive Map */}
        <div
          id="localizacao"
          className="mt-6 sm:mt-8 bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-card isolate"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Info */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between relative z-10 bg-white">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#065F46]">
                  <MapPin className="w-3.5 h-3.5" />
                  Bairro Barragem — Localização Estratégica
                </div>
                <h3 className="mt-2 font-display font-extrabold text-xl sm:text-2xl text-[#111827]">
                  Perto de tudo, em rua calma e residencial
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {PROPERTY.address} — CEP {PROPERTY.cep}. Acesso rápido aos principais pontos da
                  cidade sem abrir mão do silêncio.
                </p>

                {/* Distance Cards */}
                <div className="mt-6 space-y-2.5">
                  {DISTANCES.map((item) => (
                    <div
                      key={item.place}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-gray-100"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#065F46] shrink-0" />
                        <span className="text-sm font-semibold text-[#111827]">{item.place}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-extrabold text-[#065F46]">
                          {item.distance}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-white px-2 py-0.5 rounded-md border border-gray-200/70">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legal Proof Mini Strip */}
                <div className="mt-5 flex items-center gap-2.5 text-xs font-semibold text-gray-700 bg-emerald-50/70 border border-emerald-100 rounded-xl px-3.5 py-2.5">
                  <FileCheck2 className="w-4 h-4 text-[#065F46] shrink-0" />
                  <span>Imóveis averbados, com Habite-se e matrícula individualizada.</span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={PROPERTY.googleMapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent('ViewContent', {
                      source: 'open_google_maps_route',
                      content_name: 'Abrir Rota Google Maps',
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#111827] hover:bg-gray-800 text-white text-sm font-bold transition-all active:scale-[0.98]"
                >
                  <Navigation className="w-4 h-4" />
                  Abrir Rota no Google Maps
                </a>
              </div>
            </div>

            {/* Right Interactive Map */}
            <div className="lg:col-span-7 min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-gray-100 relative border-t lg:border-t-0 lg:border-l border-gray-200/80">
              <iframe
                title="Localização do Residencial Alêro — Rua Antônio Tonon, Bairro Barragem, Rio do Sul"
                src={PROPERTY.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
