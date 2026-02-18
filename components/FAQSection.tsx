import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Info, ShieldCheck, Wallet, Gavel } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    icon: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                        {icon}
                    </div>
                    <span className="text-white font-bold text-lg md:text-xl uppercase tracking-tighter">{question}</span>
                </div>
                {isOpen ? <ChevronUp className="text-emerald-500 w-6 h-6" /> : <ChevronDown className="text-slate-600 w-6 h-6" />}
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed pl-14">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    return (
        <section id="faq" className="py-24 bg-[#050810] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/5 rounded-full blur-[150px] translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Info className="w-3 h-3" />
                        Guia Completo para o Comprador
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase">
                        Tiramos suas <span className="text-emerald-500">Dúvidas</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium">
                        Tudo o que você precisa saber para comprar sua casa própria com total segurança.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-[#0d121f]/50 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/5 shadow-3xl">
                    <FAQItem
                        icon={<ShieldCheck className="w-5 h-5" />}
                        question="O que significa Imóvel Averbado?"
                        answer="Significa que a construção da casa já foi oficializada no Cartório de Registro de Imóveis. Sem a averbação, o banco não libera o financiamento. No Residencial Alêro, todas as unidades estão 100% averbadas e prontas para financiar."
                    />
                    <FAQItem
                        icon={<Gavel className="w-5 h-5" />}
                        question="O que é o Habite-se?"
                        answer="É um certificado emitido pela prefeitura que garante que a casa foi construída seguindo todas as normas de segurança e está pronta para ser habitada. É o documento final que autoriza você a morar no imóvel."
                    />
                    <FAQItem
                        icon={<Wallet className="w-5 h-5" />}
                        question="Posso usar meu FGTS na entrada?"
                        answer="Sim! O FGTS pode ser usado como parte do valor da entrada. Nós fazemos todo o processo de liberação junto à Caixa para você, facilitando sua conquista sem burocracia."
                    />
                    <FAQItem
                        icon={<HelpCircle className="w-5 h-5" />}
                        question="Como funciona o financiamento bancário?"
                        answer="O banco paga cerca de 80% do valor da casa para o vendedor e você paga esse valor ao banco em parcelas mensais ao longo de até 35 anos. Os outros 20% são a entrada, que você pode pagar com dinheiro, FGTS ou até o seu carro."
                    />
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-8">Ainda tem alguma pergunta técnica?</p>
                    <a
                        href="https://wa.me/5547988452087?text=Olá! Tenho uma dúvida técnica sobre o Residencial Alêro."
                        target="_blank"
                        className="inline-flex items-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-xs hover:bg-emerald-500 hover:text-white transition-all shadow-2xl active:scale-95 uppercase tracking-widest"
                    >
                        Conversar com Especialista
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
