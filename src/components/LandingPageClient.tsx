'use client';

import React, { useState } from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { GallerySection } from './GallerySection';
import { UnitsComparison } from './UnitsComparison';
import { FinancingSimulator } from './FinancingSimulator';
import { HighlightsAndLocation } from './HighlightsAndLocation';
import { FaqSection } from './FaqSection';
import { StickyMobileBar } from './StickyMobileBar';
import { Footer } from './Footer';

export function LandingPageClient() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#111827]">
      <Header />
      <main className="flex-1">
        <HeroSection onOpenGallery={(idx) => setLightboxIndex(idx)} />
        <GallerySection
          lightboxIndex={lightboxIndex}
          onOpenLightbox={(idx) => setLightboxIndex(idx)}
          onCloseLightbox={() => setLightboxIndex(null)}
          onChangeLightboxIndex={(idx) => setLightboxIndex(idx)}
        />
        <UnitsComparison />
        <FinancingSimulator />
        <HighlightsAndLocation />
        <FaqSection />
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
}
