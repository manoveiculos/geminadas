import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyPolicyProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 drop-shadow-2xl">
            <div className="absolute inset-0 bg-[#0a0f1a]/95 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d121f] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col animate-in zoom-in duration-300">

                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Política de Privacidade</h2>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Conformidade Google Ads & Proteção de Dados</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-slate-400 hover:text-white"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 text-slate-400 text-sm md:text-base leading-relaxed scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">1. Coleta de Informações</h3>
                        <p>
                            Coletamos informações que você nos fornece diretamente através de nossos formulários de simulação e contato, incluindo nome, telefone e dados financeiros básicos necessários para a pré-análise de crédito. Também coletamos dados técnicos automaticamente, como endereço IP, tipo de dispositivo e comportamento de navegação no site (Google Analytics).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">2. Uso de Cookies e Tags de Terceiros</h3>
                        <p>
                            Este site utiliza cookies e tecnologias similares para melhorar sua experiência e para fins de publicidade. Utilizamos o Google Ads para exibir anúncios em sites de terceiros para visitantes anteriores do nosso site. Terceiros, incluindo o Google, utilizam cookies para exibir anúncios baseados em visitas anteriores de alguém ao site do Residencial Alêro.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">3. Finalidade do Tratamento de Dados</h3>
                        <p>
                            Seus dados são utilizados exclusivamente para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Realizar simulações de financiamento habitacional conforme sua solicitação;</li>
                            <li>Entrar em contato para fornecer informações sobre o Residencial Alêro;</li>
                            <li>Personalizar sua experiência de navegação e otimizar nossas campanhas de marketing;</li>
                            <li>Cumprir obrigações legais e normativas.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">4. Seus Direitos (LGPD)</h3>
                        <p>
                            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de acessar, corrigir, portar ou solicitar a exclusão de seus dados pessoais a qualquer momento. Para exercer esses direitos, entre em contato através de nossos canais oficiais de atendimento.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">5. Segurança dos Dados</h3>
                        <p>
                            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou alteração indesejada. No entanto, nenhum sistema de transmissão de dados pela internet é 100% seguro.
                        </p>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-white/5">
                        <p className="text-xs italic">
                            Última atualização: Fevereiro de 2024. O Residencial Alêro reserva-se o direito de atualizar esta política conforme necessário.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-900/50 border-t border-white/5 flex justify-center shrink-0">
                    <button
                        onClick={onClose}
                        className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                    >
                        Entendido e Aceito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
