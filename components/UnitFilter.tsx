import React, { useState } from 'react';
import { UNITS } from '../constants';
import { CheckCircle2, XCircle, Info, Home, Tag, ChevronDown, Filter } from 'lucide-react';

const UnitFilter: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<'todos' | 'disponivel'>('todos');

    const filteredUnits = selectedStatus === 'todos'
        ? UNITS
        : UNITS.filter(u => u.status === 'disponivel');

    return (
        <div className="max-w-4xl mx-auto mt-16 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
                <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm">Disponibilidade das Unidades</h3>
                </div>

                <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5">
                    <button
                        onClick={() => setSelectedStatus('todos')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedStatus === 'todos' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Ver Todas
                    </button>
                    <button
                        onClick={() => setSelectedStatus('disponivel')}
                        className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${selectedStatus === 'disponivel' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Só Disponíveis
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUnits.map(unit => (
                    <div
                        key={unit.id}
                        className={`p-6 md:p-8 rounded-[2.5rem] border transition-all duration-500 group ${unit.status === 'disponivel' ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' : 'bg-slate-900/40 border-white/5 opacity-60'}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-white/5 p-3 rounded-2xl">
                                <Home className={`w-6 h-6 ${unit.status === 'disponivel' ? 'text-emerald-500' : 'text-slate-600'}`} />
                            </div>
                            {unit.status === 'disponivel' ? (
                                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-emerald-500/20">Disponível</span>
                            ) : (
                                <span className="bg-slate-800 text-slate-500 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">Vendido</span>
                            )}
                        </div>

                        <h4 className="text-white font-black text-lg md:text-xl mb-2 uppercase tracking-tighter">{unit.name}</h4>
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
                            <Tag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            A partir de R$ {unit.price.toLocaleString('pt-BR')}
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Suíte + 1 Quarto
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Espaço nos Fundos
                            </div>
                        </div>

                        {unit.status === 'disponivel' && (
                            <button
                                onClick={() => document.getElementById('simulacao')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg active:scale-95"
                            >
                                Quero Reservar esta Unidade
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UnitFilter;
