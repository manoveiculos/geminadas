import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Instagram, Facebook, MapPin, Info, Home } from 'lucide-react';

// Lazy imports com fallback
const Hero = React.lazy(() => import('./components/Hero').catch(() => ({ default: () => <div>Hero Error</div> })));
const FloorPlan = React.lazy(() => import('./components/FloorPlan').catch(() => ({ default: () => <div>FloorPlan Error</div> })));
const Gallery = React.lazy(() => import('./components/Gallery').catch(() => ({ default: () => <div>Gallery Error</div> })));
const AdminPanel = React.lazy(() => import('./components/AdminPanel').catch(() => ({ default: () => <div>Admin Error</div> })));
const Features = React.lazy(() => import('./components/Features').catch(() => ({ default: () => <div>Features Error</div> })));
const FinancingSection = React.lazy(() => import('./components/FinancingSection').catch(() => ({ default: () => <div>Financing Error</div> })));
const ContactModal = React.lazy(() => import('./components/ContactModal').catch(() => ({ default: () => <div>Contact Error</div> })));
const FAQSection = React.lazy(() => import('./components/FAQSection').catch(() => ({ default: () => <div>FAQ Error</div> })));
const UnitFilter = React.lazy(() => import('./components/UnitFilter').catch(() => ({ default: () => <div>Filter Error</div> })));

import { supabase, trackEvent } from './services/supabaseClient';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [heroImage, setHeroImage] = useState<string | undefined>(undefined);
  const [floorPlanImage, setFloorPlanImage] = useState<string | undefined>(undefined);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);

  useEffect(() => {
    if (trackEvent) {
      trackEvent('page_view').catch((err: any) => console.log('Analytics error:', err));
    }

    if (supabase) {
      fetchSiteConfig().catch((err: any) => console.log('Config error:', err));

      const channel = supabase
        .channel('site_config_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'site_config_geminadas' },
          () => {
            fetchSiteConfig();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const fetchSiteConfig = async () => {
    if (!supabase) return;

    try {
      const { data, error } = await supabase.from('site_config_geminadas').select('*');
      if (error) throw error;

      if (data && Array.isArray(data)) {
        const heroConfig = data.find((c: any) => c.key === 'hero_image');
        const galleryConfig = data.find((c: any) => c.key === 'gallery_images');
        const floorPlanConfig = data.find((c: any) => c.key === 'floor_plan_image');

        if (heroConfig && typeof heroConfig.value === 'string') setHeroImage(heroConfig.value);
        if (floorPlanConfig && typeof floorPlanConfig.value === 'string') setFloorPlanImage(floorPlanConfig.value);
        if (galleryConfig) setGalleryImages(Array.isArray(galleryConfig.value) ? galleryConfig.value : []);
      }
    } catch (error) {
      console.error("Erro ao carregar configurações do site:", error);
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setIsAdminOpen(true);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans selection:bg-emerald-500/30 bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: heroImage ? `url(${heroImage})` : 'none',
        backgroundAttachment: 'fixed',
        backgroundColor: '#0a0f1a',
        scrollPaddingTop: '96px' // Header height
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        html {
          scroll-padding-top: 96px;
          scroll-behavior: smooth;
        }
      `}} />
      <React.Suspense fallback={null}>
        {isAdminOpen && (
          <AdminPanel
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            onUpdateConfig={fetchSiteConfig}
          />
        )}
      </React.Suspense>

      {/* Header Dark & Glassmorphism */}
      <header className="fixed w-full bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <div className="bg-emerald-600 p-2.5 rounded-xl shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white leading-none">Residencial</span>
              <span className="text-[10px] text-emerald-500 font-black leading-none tracking-[0.3em] mt-1">ALÊRO</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-emerald-500 transition-colors">Início</a>
            <a href="#projeto" className="hover:text-emerald-500 transition-colors">O Projeto</a>
            <a href="#simulacao" className="hover:text-emerald-500 transition-colors">Financiamento</a>
            <a href="#localizacao" className="hover:text-emerald-500 transition-colors">Localização</a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center gap-2 group active:scale-95"
            >
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Fale Conosco
            </button>
          </nav>

          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0d121f] border-t border-white/5 p-8 space-y-6 shadow-2xl absolute w-full animate-in slide-in-from-top duration-300">
            <a href="#" className="block text-2xl font-black text-white" onClick={() => setIsMenuOpen(false)}>Início</a>
            <a href="#projeto" className="block text-2xl font-black text-white" onClick={() => setIsMenuOpen(false)}>O Projeto</a>
            <a href="#simulacao" className="block text-2xl font-black text-white" onClick={() => setIsMenuOpen(false)}>Financiamento</a>
            <a href="#localizacao" className="block text-2xl font-black text-white" onClick={() => setIsMenuOpen(false)}>Localização</a>
            <button
              onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }}
              className="w-full py-5 text-center bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl"
            >
              Falar com Consultor
            </button>
          </div>
        )}
      </header >

      <main className="flex-grow">
        <React.Suspense fallback={<div className="h-screen bg-[#0a0f1a] flex items-center justify-center animate-pulse"><div className="w-12 h-12 bg-emerald-500 rounded-full"></div></div>}>
          <Hero heroImage={heroImage} />
        </React.Suspense>

        <div className="bg-[#0d121f]/90 text-slate-400 py-4 text-[10px] font-bold uppercase tracking-[0.2em] border-y border-white/5 backdrop-blur-sm">
          <p className="flex items-center justify-center gap-3">
            <MapPin className="w-4 h-4 text-emerald-500" />
            Rua Antônio Tonon - Bairro Barragem, Rio do Sul/SC.
          </p>
        </div>

        <React.Suspense fallback={null}>
          <Features />
          <div id="projeto" className="bg-[#0a0f1a]">
            <FloorPlan floorPlanImage={floorPlanImage} />
            <UnitFilter />
          </div>
          <FinancingSection />
          <Gallery images={galleryImages} />
          <FAQSection />
        </React.Suspense>

        {/* Maps Section Premium */}
        <section id="localizacao" className="h-[500px] relative border-t border-white/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.662447470691!2d-49.6760014!3d-27.2404991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dfb88d061d4a59%3A0xac8c29ec1e221543!2sR.%20Antonio%20Tonon%20-%20Barragem%2C%20Rio%20do%20Sul%20-%20SC%2C%2089165-184!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="absolute inset-0"
          ></iframe>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-20 md:translate-x-0 bg-[#0d121f] p-6 md:p-8 rounded-[2rem] border border-white/10 shadow-3xl max-w-[85%] md:max-w-sm">
            <span className="text-emerald-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3 block text-center md:text-left">Endereço Privilegiado</span>
            <h3 className="font-black text-xl md:text-2xl mb-3 md:mb-4 text-white text-center md:text-left">Localização Livre de Enchentes</h3>
            <p className="text-slate-500 text-xs md:text-sm flex items-start gap-3 leading-relaxed">
              <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
              Bairro Barragem - Rio do Sul. Próximo a tudo o que você precisa com a segurança que você merece.
            </p>
          </div>
        </section>
      </main>

      <footer id="contato" className="bg-[#050810]/90 backdrop-blur-xl text-white pt-24 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="bg-emerald-600 p-2 rounded-lg">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-black">Residencial Alêro</h2>
              </div>
              <p className="text-slate-500 max-w-xs uppercase text-[10px] font-black tracking-widest">Sua nova vida começa aqui em Rio do Sul.</p>
            </div>

            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all border border-white/5 group">
                <Instagram className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-emerald-600 transition-all border border-white/5 group">
                <Facebook className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            <p>&copy; 2024 Residencial Alêro. Todos os direitos reservados.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-emerald-500 transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-emerald-500 transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Action */}
      <a
        href="https://wa.me/5547988452087?text=Olá! Tenho interesse no Residencial Alêro."
        target="_blank"
        className="fixed bottom-8 right-8 z-[100] bg-emerald-500 text-white p-5 rounded-3xl shadow-[0_10px_40px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-all hover:scale-110 active:scale-95 group"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <React.Suspense fallback={null}>
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </React.Suspense>
    </div >
  );
}

export default App;