import React, { useState, useEffect } from 'react';
import { Camera, Video, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
  images?: { url: string; label: string }[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const DEFAULT_IMAGES = [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', label: 'Fachada Arquitetura Moderna' },
    { url: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200', label: 'Suíte Master com Acabamento Premium' },
    { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200', label: 'Área Social Integrada' },
    { url: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200', label: 'Cozinha com Bancadas em Granito' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', label: 'Piso Porcelanato Polido' },
    { url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200', label: 'Banheiro com Nichos' }
  ];

  const displayImagesRaw = (Array.isArray(images) && images.length > 0) ? images : DEFAULT_IMAGES;
  const displayImages = displayImagesRaw.map((img: any) => {
    if (typeof img === 'string') return { url: img, label: 'Imagem Real' };
    return { url: img.url || img.image_url || '', label: img.label || img.title || 'Residencial Alêro' };
  });

  const whatsappUrl = "https://wa.me/5547988452087?text=Olá! Gostaria de saber mais sobre o Residencial Alêro.";

  const openLightbox = (index: number) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const nextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % displayImages.length);
  };

  const prevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    e?.stopPropagation();
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + displayImages.length) % displayImages.length);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  // Secure scroll lock
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeIndex]);

  // Touch handlers for mobile swiping
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextImage();
    else if (isRightSwipe) prevImage();
  };

  return (
    <section id="galeria" className="py-24 bg-[#0a0f1a] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <SparkleIcon />
              Imóvel Pronto para Morar
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase">
              Acompanhe cada <span className="text-emerald-500">Detalhe</span>
            </h2>
            <p className="text-slate-400 mt-6 text-lg font-medium leading-relaxed">Confira as fotos reais da unidade finalizada. Acabamento premium e ambientes amplos esperando por você.</p>
          </div>
          <button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="group flex items-center gap-3 bg-emerald-600 text-white font-black px-8 py-5 rounded-[2rem] hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-600/20 active:scale-95 uppercase text-xs tracking-widest"
          >
            <Video className="w-5 h-5 group-hover:animate-pulse" />
            Solicitar Vídeo do Tour
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayImages.map((img, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-[3rem] shadow-3xl hover:shadow-emerald-500/10 transition-all duration-700 h-[500px] bg-slate-900 cursor-zoom-in border border-white/5"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img.url}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>

              <div className="absolute top-8 right-8 z-20">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                  <Camera className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <div className="absolute bottom-8 left-10 z-20 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] bg-emerald-600 px-6 py-3 rounded-full shadow-2xl">
                  {img.label || 'Ver Ambiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX - FULLSCREEN OVERLAY COM PRIORIDADE TOTAL */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[10000] bg-slate-950/98 backdrop-blur-3xl flex flex-col items-center justify-center animate-in fade-in duration-300"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Header Superior - Flutuante */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[10010]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                <Home className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em] mb-1">Visualização Real</span>
                <h3 className="text-white font-bold text-xl leading-none">{displayImages[activeIndex].label || 'Residencial Alêro'}</h3>
              </div>
            </div>
            <button
              className="bg-white/10 hover:bg-red-500/20 hover:text-red-400 backdrop-blur-md text-white p-4 rounded-full transition-all border border-white/10 active:scale-90"
              onClick={closeLightbox}
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {/* Área da Imagem Central - FOCO ABSOLUTO */}
          <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 lg:p-24 overflow-hidden">

            {/* Controles Laterais Desktop */}
            <button
              className="hidden md:flex absolute left-8 bg-white/5 hover:bg-emerald-600 backdrop-blur-md text-white p-6 rounded-full transition-all z-[10010] border border-white/10 shadow-2xl active:scale-90 group"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* IMAGEM CENTRALIZADA - CALCULADA PARA NÃO CORTAR */}
            <div
              className="w-full h-full flex items-center justify-center pointer-events-none select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={displayImages[activeIndex].url}
                alt={displayImages[activeIndex].label}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_120px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500 border border-white/10"
                style={{ imageRendering: 'high-quality' }}
              />
            </div>

            <button
              className="hidden md:flex absolute right-8 bg-white/5 hover:bg-emerald-600 backdrop-blur-md text-white p-6 rounded-full transition-all z-[10010] border border-white/10 shadow-2xl active:scale-90 group"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Footer de Navegação - Flutuante na Base */}
          <div className="absolute bottom-0 left-0 right-0 pb-12 pt-8 px-8 flex flex-col items-center gap-8 z-[10010]">
            <div className="flex gap-4 overflow-x-auto pb-4 max-w-full no-scrollbar snap-x px-8">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                  className={`relative shrink-0 w-20 h-14 md:w-32 md:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-center ${activeIndex === idx ? 'border-emerald-500 scale-110 shadow-[0_0_30px_rgba(16,185,129,0.4)] z-10' : 'border-white/10 opacity-30 hover:opacity-100'}`}
                >
                  <img src={img.url} className="w-full h-full object-cover" alt="thumbnail" />
                  {activeIndex === idx && <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="bg-emerald-600 px-10 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] text-white shadow-2xl">
                {activeIndex + 1} de {displayImages.length} Fotos
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const SparkleIcon = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
  </svg>
);

const Home = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path d="M9 22V12h6v10" />
  </svg>
);

export default Gallery;