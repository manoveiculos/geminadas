import React, { useState } from 'react';
import { Home, CheckCircle2, Ruler, LayoutGrid, Sparkles, Zap, Sun, ZoomIn, X, Smartphone, ArrowRight, Eye } from 'lucide-react';
import { PROJECT_DETAILS } from '../constants';

interface FloorPlanProps {
    floorPlanImage?: string;
}

const FloorPlan: React.FC<FloorPlanProps> = ({ floorPlanImage }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const defaultImage = "https://images.adsttc.com/media/images/5f2c/8630/b357/65db/c900/0178/large_jpg/FE_PLANTAS.jpg?1596753447";
    const bgImage = floorPlanImage || defaultImage;

    return (
        <section id="projeto" className="py-24 bg-[#0a0f1a]/80 backdrop-blur-md overflow-hidden relative">
            {/* Esfera de Brilho */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
            <div className="container mx-auto px-6 relative z-10">

                {/* Cabeçalho Otimizado para Conversão */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 border border-emerald-500/20 shadow-sm animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" /> O m² mais inteligente de Rio do Sul
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-white leading-tight px-2 uppercase">
                        Engenharia que <span className="text-emerald-500">Valoriza</span> seu Investimento.
                    </h2>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Hero Section do Projeto: Planta como Fundo Artístico */}
                    <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-[#0d121f] group min-h-[500px] md:min-h-[650px] flex items-center">

                        {/* Imagem da Planta como FUNDO (opaca/estilizada) */}
                        <div className="absolute inset-0 z-0">
                            <img
                                src={bgImage}
                                alt="Fundo Técnico"
                                className="w-full h-full object-cover opacity-10 grayscale scale-110 blur-[2px] group-hover:scale-100 group-hover:blur-0 group-hover:opacity-15 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/80 to-transparent"></div>
                        </div>

                        {/* Conteúdo de Conversão SOBRE a Planta */}
                        <div className="relative z-10 w-full grid lg:grid-cols-2 gap-8 p-8 md:p-20 items-center">

                            {/* Lado Esquerdo: Copy e Gatilhos */}
                            <div className="space-y-10">
                                <div className="inline-flex items-center gap-3 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20 backdrop-blur-md">
                                    <Zap className="w-5 h-5 fill-current" />
                                    <span className="text-xs font-black uppercase tracking-widest">Destaques Alêro</span>
                                </div>

                                <h3 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase">
                                    Conceito <span className="text-emerald-500 italic">Open Space</span><br />
                                    com +28m² Integrados.
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
                                    No <strong>Alêro</strong>, a área social foi unificada para criar um ambiente de convivência único, eliminando barreiras e maximizando a luz natural.
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                                        <span className="text-emerald-500 text-[10px] font-black uppercase block mb-2 tracking-widest">Suíte Master</span>
                                        <span className="text-2xl font-black text-white">12,03m²</span>
                                    </div>
                                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                                        <span className="text-emerald-500 text-[10px] font-black uppercase block mb-2 tracking-widest">Dormitório</span>
                                        <span className="text-2xl font-black text-white">9,52m²</span>
                                    </div>
                                </div>
                            </div>

                            {/* Lado Direito: Botão para VER PLANTA Real */}
                            <div className="flex flex-col items-center lg:items-end gap-6 text-center lg:text-right">
                                <div className="bg-[#111827]/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-3xl max-w-sm">
                                    <LayoutGrid className="w-12 h-12 text-emerald-500 mx-auto lg:ml-auto mb-8" />
                                    <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">Móveis que se <br />encaixam.</h4>
                                    <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
                                        Liberamos a visualização da planta técnica detalhada com todas as metragens reais do projeto finalizado.
                                    </p>

                                    <button
                                        onClick={() => setIsZoomed(true)}
                                        className="w-full inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-black px-10 py-5 rounded-3xl hover:bg-emerald-500 hover:text-white transition-all shadow-2xl group/btn active:scale-95 text-[13px] tracking-widest uppercase"
                                    >
                                        <Eye className="w-5 h-5" />
                                        VISUALIZAR PLANTA
                                    </button>
                                </div>

                                <div className="flex items-center gap-4 text-emerald-500 font-black text-[10px] uppercase tracking-[0.3em]">
                                    <Sparkles className="w-4 h-4" /> Qualidade Superior nos Acabamentos
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barra de Conversão Inferior */}
                    <div className="mt-10 grid md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-6 p-8 bg-[#111827]/40 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all hover:bg-[#111827]/60">
                            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                                <Sun className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="font-black text-white text-[11px] uppercase tracking-widest mb-1">Sol em todos os quartos</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Privacidade total garantida.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 p-8 bg-[#111827]/40 rounded-[2.5rem] border border-white/5 shadow-2xl transition-all hover:bg-[#111827]/60">
                            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                                <CheckCircle2 className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="font-black text-white text-[11px] uppercase tracking-widest mb-1">Pronta para Morar</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Aprovação imediata pela CAIXA.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => document.getElementById('simulacao')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-emerald-600 text-white p-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 group active:scale-95"
                        >
                            SIMULAR FINANCIAMENTO
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Visualização da Planta em Alta Qualidade */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-[10000] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10 animate-in fade-in zoom-in duration-500"
                    onClick={() => setIsZoomed(false)}
                >
                    {/* Botão Fechar Melhorado */}
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="fixed top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-[10001] active:scale-90 transition-all border border-emerald-400/30"
                    >
                        <X className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Fechar</span>
                    </button>

                    <div className="relative w-full max-w-6xl h-auto max-h-[90vh] bg-[#0d121f] rounded-[3rem] p-8 md:p-16 overflow-auto shadow-3xl border border-white/10 flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <div className="mb-12 text-center">
                            <h5 className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Visualização Técnica Detalhada</h5>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">Planta Baixa Residencial Alêro</h2>
                        </div>

                        <img
                            src={bgImage}
                            alt="Planta Detalhada"
                            className="w-full h-auto cursor-default shadow-sm rounded-2xl border border-white/5"
                        />

                        <div className="mt-12 p-8 bg-white/5 rounded-[2rem] border border-white/5 w-full max-w-3xl">
                            <p className="text-center text-slate-400 text-sm font-medium leading-relaxed">
                                <strong className="text-white">Nota do Engenheiro:</strong> O projeto prioriza a integração <i className="text-emerald-500 not-italic font-black">Open Concept</i>, eliminando corredores desnecessários para maximizar a circulação e o conforto térmico natural e definitivo.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FloorPlan;
