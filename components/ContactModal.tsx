import React, { useState } from 'react';
import { X, Send, User, Phone, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        mensagem: '',
        origem: 'Site Residencial Alêro - Aba Contato'
    });

    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    };

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Salvar no Supabase
            if (supabase) {
                await supabase.from('leads_geminadas').insert([
                    {
                        name: formData.nome,
                        phone: formData.telefone,
                        source: formData.origem,
                        message: formData.mensagem
                    }
                ]);
            }

            const response = await fetch('https://n8n.drivvoo.com/webhook/casawhats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    setFormData({ nome: '', telefone: '', mensagem: '', origem: 'Site Residencial Alêro - Aba Contato' });
                }, 3000);
            } else {
                alert("Ocorreu um erro ao enviar. Por favor, tente novamente ou use o WhatsApp.");
            }
        } catch (error) {
            console.error('Erro ao enviar webhook:', error);
            alert("Erro de conexão. Verifique sua internet.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

                {/* Header */}
                <div className="bg-slate-900 p-8 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-2xl font-black mb-2">Fale Conosco</h2>
                    <p className="text-slate-400 text-sm">Preencha os dados abaixo e entraremos em contato o mais breve possível.</p>
                </div>

                {/* Form Body */}
                <div className="p-8">
                    {success ? (
                        <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Mensagem Enviada!</h3>
                            <p className="text-slate-500">Obrigado pelo seu interesse. Nosso consultor entrará em contato em breve.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 ml-1">Seu Nome</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                        placeholder="Como podemos te chamar?"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 ml-1">Celular / WhatsApp</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        required
                                        type="tel"
                                        value={formData.telefone}
                                        onChange={(e) => setFormData({ ...formData, telefone: maskPhone(e.target.value) })}
                                        placeholder="(00) 00000-0000"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-slate-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-slate-500 ml-1">Mensagem (Opcional)</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                    <textarea
                                        value={formData.mensagem}
                                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                                        placeholder="Diga-nos seu interesse..."
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all text-slate-700 h-32 resize-none"
                                    ></textarea>
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                type="submit"
                                className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        ENVIAR MENSAGEM
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
