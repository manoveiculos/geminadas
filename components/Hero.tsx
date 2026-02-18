import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { PROJECT_DETAILS } from '../constants';

interface HeroProps {
  heroImage?: string;
}

const Hero: React.FC<HeroProps> = ({ heroImage }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden pt-24">

      {/* Overlays de Profundidade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/40 md:via-[#0a0f1a]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent"></div>
      </div>

      {/* Esfera de Brilho */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 text-white space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
            Obra Concluída - Pronto para Morar
          </div>

          <h1 className="text-4xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase">
            Residencial <br />
            <span className="text-emerald-500">Alêro</span>
          </h1>

          <div className="flex flex-col gap-2 md:gap-4">
            <span className="text-xl md:text-3xl font-bold text-slate-300">Bairro Barragem - Rio do Sul</span>
            <div className="h-1 w-16 md:w-24 bg-emerald-500 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-slate-200 font-bold uppercase text-[11px] tracking-widest">{PROJECT_DETAILS.area}m² Privativos</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-slate-200 font-bold uppercase text-[11px] tracking-widest">1 Suíte + 1 Quarto</span>
            </div>
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-slate-200 font-bold uppercase text-[11px] tracking-widest">Fachada Moderna</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-6 md:pt-10">
            <a
              href="#simulacao"
              className="px-6 md:px-10 py-4 md:py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black transition-all shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95 group uppercase tracking-widest text-[11px] md:text-[13px]"
            >
              Condições de Pagamento
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <a
              href="#galeria"
              className="px-6 md:px-10 py-4 md:py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black transition-all backdrop-blur-md flex items-center justify-center border border-white/10 active:scale-95 uppercase tracking-widest text-[11px] md:text-[13px]"
            >
              Ver Fotos Reais
            </a>
          </div>
        </div>

        {/* Right Side: Quick Availability Card Premium */}
        <div className="lg:col-span-4 hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="bg-[#111827]/40 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] shadow-3xl space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

            <div className="space-y-1">
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em]">Oportunidade</span>
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Últimas Unidades</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-500/10 p-6 rounded-[2rem] border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                <span className="block text-emerald-400 font-black text-[10px] uppercase tracking-widest mb-1">Valor de Venda</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-slate-400 text-sm font-bold">R$</span>
                  <span className="text-4xl font-black text-white">395.000</span>
                </div>
                <span className="text-[10px] text-emerald-500/60 font-black uppercase tracking-widest mt-2 block">Entrada Facilitada</span>
              </div>

              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/5 space-y-3">
                <p className="font-black text-emerald-500 uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" /> Aceitamos seu carro!
                </p>
                <p className="text-slate-400 text-xs font-bold leading-relaxed uppercase">Traga seu veículo para avaliação e use como parte do pagamento da entrada.</p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <div className="w-12 h-1 bg-emerald-500/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;