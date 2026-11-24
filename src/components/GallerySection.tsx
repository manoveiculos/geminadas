'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  PlayCircle,
  X,
} from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  PROPERTY_PHOTOS,
  PhotoCategory,
  PropertyPhoto,
  buildWhatsAppUrl,
} from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

interface GallerySectionProps {
  lightboxIndex: number | null;
  onOpenLightbox: (globalIndex: number) => void;
  onCloseLightbox: () => void;
  onChangeLightboxIndex: (nextIndex: number) => void;
}

export function GallerySection({
  lightboxIndex,
  onOpenLightbox,
  onCloseLightbox,
  onChangeLightboxIndex,
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory>('todas');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredPhotos: PropertyPhoto[] =
    selectedCategory === 'todas'
      ? PROPERTY_PHOTOS
      : PROPERTY_PHOTOS.filter((p) => p.category === selectedCategory);

  const openGlobalLightbox = (photo: PropertyPhoto) => {
    const idx = PROPERTY_PHOTOS.findIndex((p) => p.id === photo.id);
    trackEvent('ViewContent', {
      source: 'gallery_photo_click',
      content_name: photo.caption,
      content_category: photo.category,
    });
    onOpenLightbox(idx >= 0 ? idx : 0);
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0, true);
    setSelectedSlide(0);
    const onSelect = () => setSelectedSlide(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, selectedCategory]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    onChangeLightboxIndex((lightboxIndex + 1) % PROPERTY_PHOTOS.length);
  }, [lightboxIndex, onChangeLightboxIndex]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    onChangeLightboxIndex(
      (lightboxIndex - 1 + PROPERTY_PHOTOS.length) % PROPERTY_PHOTOS.length
    );
  }, [lightboxIndex, onChangeLightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, onCloseLightbox, goNext, goPrev]);

  const activePhoto = lightboxIndex !== null ? PROPERTY_PHOTOS[lightboxIndex] : null;

  return (
    <section id="galeria" className="py-14 sm:py-20 bg-white border-y border-gray-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7 sm:mb-9">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#065F46]">
              <Camera className="w-3.5 h-3.5" />
              Fotos 100% Reais das Casas Prontas
            </span>
            <h2 className="mt-1.5 font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
              Conheça cada ambiente de perto
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Toque em qualquer imagem para ampliar em tela cheia. Nada de ilustrações — você vê
              exatamente o acabamento entregue.
            </p>
          </div>
          <div className="text-xs font-semibold text-gray-500">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'foto exibida' : 'fotos exibidas'}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-5 sm:mb-7">
          {GALLERY_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Mobile Fluid Carousel (Embla) */}
        <div className="md:hidden">
          <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
            <div className="flex gap-3">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex-[0_0_86%] min-w-0"
                >
                  <button
                    type="button"
                    onClick={() => openGlobalLightbox(photo)}
                    className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 text-left shadow-sm"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="88vw"
                      className={
                        photo.category === 'planta'
                          ? 'object-contain bg-white p-2'
                          : 'object-cover object-center'
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#111827] text-[11px] font-bold">
                      {photo.categoryLabel}
                    </span>
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center backdrop-blur-sm">
                      <Expand className="w-3.5 h-3.5" />
                    </span>
                    <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium line-clamp-2 leading-snug">
                      {photo.caption}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel Controls */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Deslize para o lado • {selectedSlide + 1} de {filteredPhotos.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Foto anterior"
                className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Próxima foto"
                className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-700 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Architectural Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPhotos.map((photo, idx) => {
            const isHeroTile = selectedCategory === 'todas' && idx === 0;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => openGlobalLightbox(photo)}
                className={`group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 text-left shadow-card hover:shadow-soft transition-all focus:outline-none focus:ring-2 focus:ring-[#065F46] ${
                  isHeroTile ? 'lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={isHeroTile ? '(max-width: 1200px) 66vw, 760px' : '(max-width: 1200px) 33vw, 380px'}
                  className={
                    photo.category === 'planta'
                      ? 'object-contain bg-white p-3 transition-transform duration-500 group-hover:scale-[1.03]'
                      : 'object-cover object-center transition-transform duration-500 group-hover:scale-105'
                  }
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/95 text-[#111827] text-[11px] font-bold shadow-sm">
                  {photo.categoryLabel}
                </span>
                <span className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 text-[#111827] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Expand className="w-4 h-4" />
                </span>
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <p className="text-xs sm:text-sm font-semibold leading-snug line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Video Tour Request Strip (Honest CTA since live site offers WhatsApp video tour) */}
        <div className="mt-8 sm:mt-10 rounded-2xl bg-[#FAFAFA] border border-gray-200/90 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-[#065F46] flex items-center justify-center shrink-0">
              <PlayCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#111827]">
                Quer receber o vídeo tour completo das casas?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Enviamos o vídeo real caminhando por todos os cômodos e pelos fundos direto no seu
                WhatsApp.
              </p>
            </div>
          </div>
          <a
            href={buildWhatsAppUrl(
              'Olá! Vi as fotos do Residencial Alêro e gostaria de receber o vídeo tour completo das casas.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('Contact', {
                source: 'gallery_video_tour',
                content_name: 'Solicitar Video Tour',
              })
            }
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#065F46] hover:bg-emerald-800 text-white text-sm font-bold transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Receber Vídeo no WhatsApp
          </a>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {activePhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
            onClick={onCloseLightbox}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null) return;
              const diff = touchStartX - e.changedTouches[0].clientX;
              if (diff > 50) goNext();
              else if (diff < -50) goPrev();
              setTouchStartX(null);
            }}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-4 text-white shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  {activePhoto.categoryLabel} • {lightboxIndex + 1} / {PROPERTY_PHOTOS.length}
                </span>
                <p className="text-sm sm:text-base font-semibold text-white mt-0.5 line-clamp-1">
                  {activePhoto.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={onCloseLightbox}
                aria-label="Fechar visualização em tela cheia"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 ml-3"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Area */}
            <div className="relative flex-1 flex items-center justify-center px-3 sm:px-16 pb-4 min-h-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Foto anterior"
                className="hidden sm:flex absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                className="relative w-full max-w-5xl h-[62vh] sm:h-[74vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={activePhoto.id}
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Próxima foto"
                className="hidden sm:flex absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div
              className="px-4 pb-5 pt-2 flex justify-center shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full py-1">
                {PROPERTY_PHOTOS.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    type="button"
                    onClick={() => onChangeLightboxIndex(idx)}
                    className={`relative shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === lightboxIndex
                        ? 'border-emerald-400 opacity-100 scale-105'
                        : 'border-transparent opacity-45 hover:opacity-85'
                    }`}
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
