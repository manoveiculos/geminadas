import React, { useState, useEffect } from 'react';
import {
    Calculator,
    CheckCircle2,
    AlertCircle,
    Smartphone,
    ShieldCheck,
    TrendingDown,
    DollarSign,
    Calendar,
    ArrowRight,
    Loader2,
    Send,
    Car,
    Wallet,
    Clock,
    User,
    ChevronLeft,
    Gavel,
    FileCheck,
    Info,
    Check
} from 'lucide-react';
import { supabase } from '../services/supabaseClient';

const FinancingSection: React.FC = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isHelpMode, setIsHelpMode] = useState(false);

    // Auto-scroll logic when step changes
    useEffect(() => {
        if (step > 1 || success) {
            document.getElementById('simulacao')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [step, success]);

    // Internal Simulation Logic
    const [entryValue, setEntryValue] = useState<number>(79000);
    const [months, setMonths] = useState<number>(420);
    const [estimatedParcel, setEstimatedParcel] = useState<number>(0);

    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        valorEntrada: 'R$ 79.000,00',
        prazoMeses: '420 meses',
        temVeiculo: 'Não',
        veiculoModelo: '',
        veiculoAno: '',
        origem: 'Simulador Premium - Residencial Alêro'
    });

    const monthlyRate = 0.00888;

    useEffect(() => {
        const financedAmount = 395000 - entryValue;
        if (financedAmount <= 0) {
            setEstimatedParcel(0);
            return;
        }
        // Formula Price for internal estimation
        const pmt = financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        setEstimatedParcel(Math.round(pmt));
    }, [entryValue, months]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
    };

    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})(\d+?)$/, "$1");
    };

    const handleEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value.replace(/\D/g, '')) || 0;
        setEntryValue(val);
    };

    const resetSimulation = () => {
        setStep(1);
        setSuccess(false);
        setIsHelpMode(false);
        setEntryValue(79000);
        setMonths(420);
        setFormData({
            nome: '',
            telefone: '',
            valorEntrada: 'R$ 79.000,00',
            prazoMeses: '420 meses',
            temVeiculo: 'Não',
            veiculoModelo: '',
            veiculoAno: '',
            origem: 'Simulador Premium - Residencial Alêro'
        });
    };

    const handleHelpRequest = () => {
        setIsHelpMode(true);
        setFormData(prev => ({
            ...prev,
            origem: 'Ajuda Financiamento - Residencial Alêro'
        }));
        setStep(5);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = {
            ...formData,
            valorEntrada: formatCurrency(entryValue),
            prazoMeses: `${months} meses`,
            parcelaEstimada: formatCurrency(estimatedParcel),
            possuiVeiculo: formData.temVeiculo,
            modeloVeiculo: formData.veiculoModelo,
            anoVeiculo: formData.veiculoAno
        };

        // Enviar para o Banco de Dados (Supabase)
        if (supabase) {
            try {
                await supabase.from('leads_geminadas').insert([
                    {
                        name: formData.nome,
                        phone: formData.telefone,
                        income: 0,
                        deposit: entryValue,
                        months: months,
                        parcel: estimatedParcel,
                        has_vehicle: formData.temVeiculo === 'Sim',
                        car_model: formData.veiculoModelo,
                        car_year: formData.veiculoAno,
                        source: formData.origem
                    }
                ]);
            } catch (err) {
                console.error('Erro ao salvar no Supabase:', err);
            }
        }

        const webhookUrl = isHelpMode
            ? 'https://n8n.drivvoo.com/webhook/casaajuda'
            : 'https://n8n.drivvoo.com/webhook/casasi';

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                setSuccess(true);
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="simulacao" className="py-24 bg-[#0a0f1a]/80 backdrop-blur-md relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <Check className="w-3 h-3" />
                        Análise de Perfil
                    </div>
                    <h2 className="text-3xl md:text-6xl font-black text-white mb-6 leading-tight uppercase">
                        Condições de <span className="text-emerald-500">Pagamento</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed">
                        Entenda como conquistar sua casa: você utiliza seus recursos (entrada) e o banco financia o restante em parcelas que cabem no seu bolso.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">

                    {/* Painel Lateral de Confiança */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#111827] p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-2xl h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors"></div>

                            <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 flex items-center gap-3 uppercase tracking-tighter">
                                <ShieldCheck className="text-emerald-500 w-5 h-5 md:w-6 md:h-6" />
                                Segurança Jurídica
                            </h4>

                            <div className="space-y-6 md:space-y-8">
                                <div className="space-y-1 group/item">
                                    <div className="flex items-center gap-3 text-white font-bold text-xs md:text-sm uppercase tracking-tighter">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <Gavel className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        Obra 100% Legalizada
                                    </div>
                                    <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold tracking-wider ml-11">Documentação em dia.</p>
                                </div>

                                <div className="space-y-1 group/item">
                                    <div className="flex items-center gap-3 text-white font-bold text-xs md:text-sm uppercase tracking-tighter">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <FileCheck className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        Pronta para Morar
                                    </div>
                                    <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold tracking-wider ml-11">Aprovação agilizada.</p>
                                </div>

                                <div className="space-y-4 pt-8 border-t border-white/5">
                                    <div className="group/tip relative">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Check className="w-3 h-3 text-emerald-500" /> IMÓVEL AVERBADO
                                        </div>
                                        <p className="text-[9px] text-slate-500 mt-1 ml-5 uppercase font-bold tracking-tighter">O registro oficial que permite seu financiamento bancário.</p>
                                    </div>

                                    <div className="group/tip relative">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Check className="w-3 h-3 text-emerald-500" /> MATRÍCULA INDIVIDUALIZADA
                                        </div>
                                        <p className="text-[9px] text-slate-500 mt-1 ml-5 uppercase font-bold tracking-tighter">O "RG" único da sua casa, garantindo propriedade exclusiva.</p>
                                    </div>

                                    <div className="group/tip relative">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <Check className="w-3 h-3 text-emerald-500" /> HABITE-SE CONCEDIDO
                                        </div>
                                        <p className="text-[9px] text-slate-500 mt-1 ml-5 uppercase font-bold tracking-tighter">Certificado de segurança e prontidão para você morar.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Área do Fluxo / Simulador */}
                    <div className="lg:col-span-8">
                        <div className="bg-[#111827] p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-3xl min-h-[550px] flex flex-col justify-center relative">

                            {step > 1 && !success && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors font-bold text-[10px] uppercase tracking-widest group"
                                >
                                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Voltar
                                </button>
                            )}

                            {success ? (
                                <div className="animate-in zoom-in duration-500 text-center space-y-8">
                                    <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                        <CheckCircle2 className="w-12 h-12" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-black text-white">Pronto!</h3>
                                        <p className="text-slate-400 text-lg max-w-sm mx-auto">Recebemos seus dados. Um especialista entrará em contato para apresentar sua aprovação.</p>
                                    </div>
                                    <button onClick={resetSimulation} className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-slate-300 font-bold hover:bg-white/10 transition-all uppercase text-xs tracking-widest">Nova Análise</button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between mb-16">
                                        <div className="flex flex-col">
                                            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">ETAPA {step} DE 5</span>
                                            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                                                {step === 1 && "Entrada"}
                                                {step === 2 && "Crédito"}
                                                {step === 3 && "Seu Plano"}
                                                {step === 4 && "Veículo"}
                                                {step === 5 && "Finalizar"}
                                            </h3>
                                        </div>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`w-12 h-2 rounded-full transition-all duration-700 ${step >= i ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-white/5'}`}></div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        {/* Step 1: Entry Check */}
                                        {step === 1 && (
                                            <div className="animate-in fade-in slide-in-from-right duration-500 space-y-8">
                                                <div className="text-center space-y-4">
                                                    <h4 className="text-2xl font-bold text-white">Para este perfil de imóvel, o banco solicita uma <br className="hidden md:block" /> <span className="text-emerald-500">entrada mínima de R$ 79 mil.</span></h4>
                                                    <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                                                        Sabemos que é um valor importante. A boa notícia é que você pode somar seus recursos para chegar lá:
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap justify-center gap-8 py-8 border-y border-white/5">
                                                    <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] tracking-widest uppercase"><DollarSign className="w-4 h-4 text-emerald-500" /> DINHEIRO</div>
                                                    <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] tracking-widest uppercase"><Wallet className="w-4 h-4 text-emerald-500" /> SEU FGTS</div>
                                                    <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] tracking-widest uppercase"><Car className="w-4 h-4 text-emerald-500" /> SEU CARRO</div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    <button onClick={() => setStep(2)} className="py-8 rounded-[2rem] bg-emerald-500 text-slate-950 hover:bg-emerald-400 transform hover:-translate-y-1 transition-all font-black text-sm shadow-xl shadow-emerald-500/20 active:scale-95 leading-tight uppercase px-4">
                                                        SIM, EU <br /> CONSIGO!
                                                    </button>
                                                    <button onClick={() => setStep(3)} className="py-8 rounded-[2rem] bg-slate-800 text-white hover:bg-slate-700 transform hover:-translate-y-1 transition-all font-black text-sm active:scale-95 leading-tight uppercase px-4">
                                                        SIMULAÇÃO <br /> EXPRESSA
                                                    </button>
                                                    <button onClick={handleHelpRequest} className="py-8 rounded-[2rem] border-2 border-white/10 text-white hover:bg-white/5 transition-all font-black text-sm active:scale-95 leading-tight uppercase px-4">
                                                        PRECISO <br /> DE AJUDA
                                                    </button>
                                                </div>
                                                <p className="text-center text-slate-500 text-[9px] font-black uppercase tracking-[0.2em]">Pule o quiz se desejar apenas ver a calculadora.</p>
                                            </div>
                                        )}

                                        {/* Step 2: Clean Name */}
                                        {step === 2 && (
                                            <div className="animate-in fade-in slide-in-from-right duration-500 space-y-10">
                                                <div className="text-center space-y-4">
                                                    <h4 className="text-2xl font-bold text-white">Seu nome está limpo?</h4>
                                                    <p className="text-slate-400 text-base">O banco pede CPF regular para aprovar o financiamento.</p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <button onClick={() => setStep(3)} className="py-8 rounded-[2rem] bg-emerald-500 text-slate-950 hover:bg-emerald-400 transform hover:-translate-y-1 transition-all font-black text-lg active:scale-95">
                                                        TUDO CERTO!
                                                    </button>
                                                    <button onClick={() => setStep(6)} className="py-8 rounded-[2rem] border-2 border-white/10 text-white hover:bg-white/5 transition-all font-black text-lg active:scale-95">
                                                        TENHO RESTRIÇÃO
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Step 3: Your Plan */}
                                        {step === 3 && (
                                            <div className="animate-in fade-in slide-in-from-right duration-500 space-y-8">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Sua Entrada Hoje</label>
                                                        <div className="relative group">
                                                            <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none text-slate-500 font-bold">R$</div>
                                                            <input
                                                                type="text"
                                                                value={entryValue.toLocaleString('pt-BR')}
                                                                onChange={handleEntryChange}
                                                                className="w-full bg-slate-950/50 border-2 border-white/5 rounded-3xl py-8 pl-16 pr-8 text-3xl font-black text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-slate-800"
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-widest pl-2">Use Dinheiro + FGTS + Carro</p>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <label className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] block">Tempo para Pagar</label>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            {[420, 360, 300, 240].map(m => (
                                                                <button
                                                                    key={m}
                                                                    onClick={() => setMonths(m)}
                                                                    className={`py-5 rounded-2xl font-black text-sm transition-all border-2 ${months === m ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-slate-950/30 text-slate-500 border-white/5 hover:border-white/10'}`}
                                                                >
                                                                    {m / 12} Anos
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="mt-8 bg-emerald-500/10 rounded-3xl p-8 border border-emerald-500/20 relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                                            <Calculator className="w-16 h-16 text-emerald-500" />
                                                        </div>
                                                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Parcela Mensal Estimada</span>
                                                        <div className="flex items-baseline gap-2">
                                                            <span className="text-emerald-500 font-bold text-lg">R$</span>
                                                            <span className="text-5xl font-black text-white leading-none">{estimatedParcel.toLocaleString('pt-BR')}</span>
                                                        </div>

                                                        <div className="mt-6 flex gap-3 items-start">
                                                            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
                                                                * Valores baseados em simulação. Esta estimativa não garante aprovação de crédito nem o valor final das parcelas, que podem variar de acordo com o perfil do cliente e política do banco.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button onClick={() => setStep(4)} className="w-full bg-emerald-500 py-6 rounded-3xl text-slate-950 font-black text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3">
                                                    AVANÇAR PARA ANÁLISE
                                                    <ArrowRight className="w-6 h-6" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Step 4: Vehicle Question */}
                                        {step === 4 && (
                                            <div className="animate-in fade-in slide-in-from-right duration-500 space-y-8">
                                                <div className="text-center space-y-4">
                                                    <h4 className="text-2xl font-bold text-white">Possui veículo para dar na entrada?</h4>
                                                    <p className="text-slate-400 text-sm">Aceitamos seu carro como parte do pagamento para facilitar sua conquista.</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <button
                                                        onClick={() => setFormData({ ...formData, temVeiculo: 'Sim' })}
                                                        className={`py-6 rounded-2xl font-black text-lg transition-all border-2 ${formData.temVeiculo === 'Sim' ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-lg shadow-emerald-500/10' : 'bg-slate-950/30 text-slate-400 border-white/5 hover:border-white/10'}`}
                                                    >
                                                        SIM
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setFormData({ ...formData, temVeiculo: 'Não', veiculoModelo: '', veiculoAno: '' });
                                                            setStep(5);
                                                        }}
                                                        className={`py-6 rounded-2xl font-black text-lg transition-all border-2 ${formData.temVeiculo === 'Não' ? 'bg-white/10 text-white border-white/20' : 'bg-slate-950/30 text-slate-400 border-white/5'}`}
                                                    >
                                                        NÃO
                                                    </button>
                                                </div>

                                                {formData.temVeiculo === 'Sim' && (
                                                    <div className="animate-in zoom-in duration-300 space-y-4">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            <div className="relative">
                                                                <Car className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Modelo do Carro"
                                                                    value={formData.veiculoModelo}
                                                                    onChange={(e) => setFormData({ ...formData, veiculoModelo: e.target.value })}
                                                                    className="w-full pl-16 pr-8 py-6 bg-slate-950/50 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                                                                />
                                                            </div>
                                                            <div className="relative">
                                                                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Ano"
                                                                    value={formData.veiculoAno}
                                                                    onChange={(e) => setFormData({ ...formData, veiculoAno: e.target.value })}
                                                                    className="w-full pl-16 pr-8 py-6 bg-slate-950/50 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                                                                />
                                                            </div>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest text-center italic">Isso nos ajuda a agilizar sua avaliação.</p>

                                                        <button onClick={() => setStep(5)} className="w-full bg-emerald-500 py-6 rounded-3xl text-slate-950 font-black text-lg hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-3">
                                                            CONTINUAR
                                                            <ArrowRight className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Step 5: Final (Contact) */}
                                        {step === 5 && (
                                            <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right duration-500 space-y-8">
                                                <div className="text-center space-y-3">
                                                    <h4 className="text-2xl font-bold text-white">Onde enviamos sua resposta?</h4>
                                                    <p className="text-slate-400 text-sm">Um consultor vai te ligar para explicar cada detalhe.</p>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="relative">
                                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="Seu Nome"
                                                            value={formData.nome}
                                                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                                            className="w-full pl-16 pr-8 py-6 bg-slate-950 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-lg"
                                                        />
                                                    </div>
                                                    <div className="relative">
                                                        <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                                                        <input
                                                            required
                                                            type="tel"
                                                            placeholder="Seu WhatsApp"
                                                            value={formData.telefone}
                                                            onChange={(e) => setFormData({ ...formData, telefone: maskPhone(e.target.value) })}
                                                            className="w-full pl-16 pr-8 py-6 bg-slate-950 border border-white/10 rounded-2xl text-white placeholder-slate-600 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-lg"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex items-center gap-4">
                                                    <Info className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                                                        Plano: {formatCurrency(entryValue)} de entrada em {(months / 12)} anos.
                                                    </p>
                                                </div>

                                                <button
                                                    disabled={loading}
                                                    type="submit"
                                                    className="w-full py-8 bg-emerald-500 text-slate-950 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-95 group"
                                                >
                                                    {loading ? <Loader2 className="animate-spin" /> : (
                                                        <>
                                                            ENVIAR AGORA
                                                            <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        )}

                                        {/* Step 6: Failed Step */}
                                        {step === 6 && (
                                            <div className="animate-in zoom-in duration-500 space-y-10 flex flex-col items-center text-center">
                                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                                                    <Calendar className="w-10 h-10 text-slate-500" />
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-2xl font-bold text-white">O sonho da casa própria está perto!</h4>
                                                    <p className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">
                                                        Entendemos que os critérios bancários são rigorosos. <span className="text-emerald-500 font-bold text-white">Não desista!</span> Queremos te ajudar a encontrar o melhor caminho ou plano de planejamento para você conquistar sua chave.
                                                    </p>
                                                </div>
                                                <div className="flex flex-col gap-4 w-full">
                                                    <button onClick={() => setStep(5)} className="py-6 rounded-3xl bg-emerald-600 text-slate-950 font-black text-lg hover:bg-emerald-500 transition-all active:scale-95 shadow-xl shadow-emerald-600/20">
                                                        FALAR COM UM CONSULTOR
                                                    </button>
                                                    <button onClick={resetSimulation} className="text-slate-500 font-black text-xs uppercase tracking-[0.2em] hover:text-emerald-500 transition-colors">Voltar e Tentar Novamente</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-center gap-3 opacity-30">
                                <ShieldCheck className="w-4 h-4 text-slate-500" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Dados 100% Protegidos e Criptografados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinancingSection;
