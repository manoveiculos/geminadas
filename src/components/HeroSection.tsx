'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Maximize2,
  Landmark,
  Wallet,
  Car,
  Calculator,
  Camera,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { PROPERTY, PROPERTY_PHOTOS, buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroSectionProps {
  onOpenGallery: (index: number) => void;
}

export function HeroSection({ onOpenGallery }: HeroSectionProps) {
  const handleScheduleVisit = () => {
    trackEvent('Lead', {
      source: 'hero_agendar_visita',
      content_name: 'Agendar Visita Hero',
    });
    trackEvent('Contact', {
      source: 'hero_agendar_visita',
      content_name: 'Agendar Visita Hero',
    });
  };

  const handleOpenGallery = () => {
    trackEvent('ViewContent', {
      source: 'hero_ver_galeria',
      content_name: 'Galeria Tela Cheia Hero',
    });
    onOpenGallery(0);
  };

  return (
    <section
      id="topo"
      className="relative bg-[#FAFAFA] pt-5 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/90 text-[#065F46] text-[11px] sm:text-xs font-bold tracking-wide uppercase">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#065F46]" />
            </span>
            <span>PRONTAS PARA MORAR</span>
            <span className="text-emerald-300">•</span>
            <span>FORA DE ENCHENTE</span>
            <span className="text-emerald-300">•</span>
            <span>DOCUMENTAÇÃO OK</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-start">
          {/* Left Column: Copy, Price & High-Conversion CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="lg:col-span-6 flex flex-col"
          >
            <h1 className="font-display font-extrabold text-[1.95rem] sm:text-4xl lg:text-[2.75rem] text-[#111827] leading-[1.12] tracking-tight">
              Sua Casa Geminada Pronta no Bairro Barragem — Rio do Sul
            </h1>

            <p className="mt-3.5 sm:mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              2 unidades exclusivas de <strong className="font-semibold text-[#111827]">75,87m²</strong> com{' '}
              <strong className="font-semibold text-[#111827]">1 suíte + 1 dormitório</strong>, acabamento em
              porcelanato e fundos para área de preservação.
            </p>

            {/* Mobile-only Primary Photo Right Below Subheadline for Instant Visual Proof */}
            <div className="mt-5 lg:hidden">
              <HeroPhotoCard onOpenGallery={handleOpenGallery} />
            </div>

            {/* Price & Payment Conditions Card */}
            <div className="mt-5 sm:mt-6 bg-white rounded-2xl border border-gray-200/90 p-4 sm:p-5 shadow-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3.5 border-b border-gray-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    Valor de Venda (Unidades 01 e 02)
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-xs font-semibold text-gray-500">A partir de</span>
                    <span className="font-display font-extrabold text-3xl sm:text-[2.15rem] text-[#111827] tracking-tight">
                      {PROPERTY.priceFormatted}
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  Averbada p/ Financiamento
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-800">
                  <Landmark className="w-4 h-4 text-[#065F46] shrink-0" />
                  <span>Aceita Financiamento</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-800">
                  <Wallet className="w-4 h-4 text-[#065F46] shrink-0" />
                  <span>Use seu FGTS</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs font-bold text-[#065F46]">
                  <Car className="w-4 h-4 text-[#065F46] shrink-0" />
                  <span>Aceita Carro na Troca</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppUrl(
                  'Olá! Quero agendar uma visita nas casas prontas do Residencial Alêro no Bairro Barragem.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleScheduleVisit}
                className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#065F46] hover:bg-emerald-800 text-white font-bold text-base shadow-cta animate-subtle-pulse transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                Agendar Visita no WhatsApp
              </a>
              <a
                href="#simulador"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white hover:bg-gray-50 text-[#111827] font-bold text-sm sm:text-base border border-gray-300 shadow-sm transition-all active:scale-[0.98]"
              >
                <Calculator className="w-4 h-4 text-[#065F46] shrink-0" />
                Simular Entrada e Parcela
              </a>
            </div>

            {/* Micro Trust Line */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#065F46]" />
                Atendimento direto, sem burocracia
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#065F46]" />
                Rua Antônio Tonon, Barragem
              </span>
            </div>
          </motion.div>

          {/* Right Column (Desktop): Featured Real Facade Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden lg:block lg:col-span-6"
          >
            <HeroPhotoCard onOpenGallery={handleOpenGallery} />

            {/* Quick Architectural Spec Strip Below Photo */}
            <div className="mt-3.5 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-gray-200/80 px-3.5 py-3 text-center">
                <span className="block font-display font-extrabold text-lg text-[#111827]">
                  75,87m²
                </span>
                <span className="text-[11px] font-medium text-gray-500">Área privativa real</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200/80 px-3.5 py-3 text-center">
                <span className="block font-display font-extrabold text-lg text-[#111827]">
                  1 Suíte + 1
                </span>
                <span className="text-[11px] font-medium text-gray-500">Dormitório + BWC Social</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-200/80 px-3.5 py-3 text-center">
                <span className="block font-display font-extrabold text-lg text-[#065F46]">
                  2 Unidades
                </span>
                <span className="text-[11px] font-medium text-gray-500">Prontas p/ morar</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroPhotoCard({ onOpenGallery }: { onOpenGallery: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpenGallery}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenGallery();
        }
      }}
      className="group relative aspect-[4/3] sm:aspect-[16/12] lg:aspect-[5/4] w-full rounded-3xl overflow-hidden bg-gray-200 border border-gray-200/90 shadow-soft cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#065F46]"
      aria-label="Abrir galeria de fotos reais em tela cheia"
    >
      <Image
        src="/images/fachada-principal.webp"
        alt="Fachada real pronta do Residencial Alêro no Bairro Barragem, Rio do Sul"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

      {/* Top Left Authentic Photo Tag */}
      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#111827] text-xs font-bold shadow-sm">
        <Camera className="w-3.5 h-3.5 text-[#065F46]" />
        Foto Real • Obra Concluída
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between gap-3">
        <div className="text-white">
          <p className="text-xs font-medium text-white/85">Residencial Alêro</p>
          <p className="text-sm sm:text-base font-bold leading-snug">
            Fachada Moderna e Vaga Frontal
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 group-hover:bg-white text-[#111827] text-xs font-bold shadow-md transition-colors">
          <Maximize2 className="w-3.5 h-3.5 text-[#065F46]" />
          Ver {PROPERTY_PHOTOS.length} fotos
        </span>
      </div>
    </div>
  );
}
