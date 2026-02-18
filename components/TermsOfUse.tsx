import React from 'react';
import { X, FileText } from 'lucide-react';

interface TermsOfUseProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 drop-shadow-2xl">
            <div className="absolute inset-0 bg-[#0a0f1a]/95 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d121f] border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col animate-in zoom-in duration-300">

                {/* Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Termos de Uso</h2>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">Regras de Utilização do Site e Serviços</p>
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
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">1. Aceitação dos Termos</h3>
                        <p>
                            Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Caso não concorde com qualquer parte destes termos, você não deverá utilizar nosso site.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">2. Precisão das Informações</h3>
                        <p>
                            Embora façamos todos os esforços para garantir que as informações apresentadas (preços, disponibilidades, plantas e imagens) sejam precisas e atuais, elas estão sujeitas a alterações sem aviso prévio. As simulações de financiamento são estimativas e não constituem aprovação de crédito ou proposta vinculante.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">3. Uso de Materiais e Propriedade Intelectual</h3>
                        <p>
                            Todo o conteúdo deste site, incluindo logotipos, textos, gráficos, imagens e vídeos, é de propriedade exclusiva do Residencial Alêro ou de seus fornecedores de conteúdo, sendo protegido pelas leis de direito autoral brasileiras e internacionais. O uso não autorizado de qualquer material pode violar estas leis.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">4. Limitação de Responsabilidade</h3>
                        <p>
                            O Residencial Alêro não será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar este site ou as informações nele contidas. O site é fornecido "como está", sem garantias de qualquer tipo.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">5. Links para Terceiros</h3>
                        <p>
                            Nosso site pode conter links para sites de terceiros (como Google Maps ou WhatsApp). Estes links são fornecidos apenas para sua conveniência e não implicam endosso do conteúdo desses sites. Não somos responsáveis pelas práticas de privacidade ou pelo conteúdo dessas plataformas.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-white font-black uppercase tracking-widest text-sm">6. Modificações dos Termos</h3>
                        <p>
                            Reservamo-nos o direito de revisar estes termos de uso a qualquer momento, sem aviso prévio. Ao utilizar este site, você concorda em ficar vinculado à versão atual desses termos e condições.
                        </p>
                    </section>

                    <section className="space-y-4 pt-8 border-t border-white/5">
                        <p className="text-xs italic">
                            Última atualização: Fevereiro de 2024. Fica eleito o foro da comarca de Rio do Sul/SC para dirimir quaisquer dúvidas oriundas deste termo.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-900/50 border-t border-white/5 flex justify-center shrink-0">
                    <button
                        onClick={onClose}
                        className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                    >
                        Li e Concordo com os Termos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsOfUse;
