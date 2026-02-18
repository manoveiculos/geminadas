import React from 'react';
import { Sparkles, Trees, Zap, ShieldCheck, Hexagon, Star } from 'lucide-react';

const Features: React.FC = () => {
    const features = [
        {
            title: "Piso Porcelanato Polido",
            description: "Amplitude e brilho superior em todos os ambientes internos.",
            icon: <Hexagon className="w-6 h-6" />,
            color: "bg-slate-100 text-slate-600"
        },
        {
            title: "Privacidade Total",
            description: "Localização estratégica em rua calma. Tranquilidade para sua família.",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "bg-emerald-100 text-emerald-600"
        },
        {
            title: "Infra para Ar-Split",
            description: "Pontos de ar-condicionado já instalados.",
            icon: <Zap className="w-6 h-6" />,
            color: "bg-amber-100 text-amber-600"
        },
        {
            title: "Livre de Enchentes",
            description: "Localização estratégica e segura. Tranquilidade total para sua família.",
            icon: <ShieldCheck className="w-6 h-6" />,
            color: "bg-emerald-100 text-emerald-600"
        },
        {
            title: "Espaço nos Fundos",
            description: "Terreno ideal para sua área de festas. Vista para a mata e sem vizinhos de janela.",
            icon: <Trees className="w-6 h-6" />,
            color: "bg-blue-100 text-blue-600"
        },
        {
            title: "Abertura Integrada",
            description: "Paredes com acabamento em massa corrida e visual premium.",
            icon: <Sparkles className="w-6 h-6" />,
            color: "bg-purple-100 text-purple-600"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-[#0a0f1a]/80 backdrop-blur-md">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block animate-pulse">Padrão de Construção</span>
                    <h2 className="text-3xl md:text-6xl font-black text-white leading-tight uppercase">
                        Diferenciais <br />
                        <span className="text-emerald-500">Premium</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group p-10 rounded-[3rem] bg-[#111827]/40 border border-white/5 shadow-2xl hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm">
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:scale-110 transition-transform bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
                                {React.cloneElement(feature.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6" })}
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4 uppercase tracking-tighter">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-xs md:text-sm font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
