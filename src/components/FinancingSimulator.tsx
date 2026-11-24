'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Car, CheckCircle2, Info, ShieldCheck, Wallet } from 'lucide-react';
import { PROPERTY, buildWhatsAppUrl } from '@/lib/property-data';
import { trackEvent } from '@/lib/tracking';
import { WhatsAppIcon } from './WhatsAppIcon';

const MIN_ENTRY = 40000;
const MAX_ENTRY = 200000;
const QUICK_PRESETS = [45000, 80000, 120000, 160000];

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
}

export function FinancingSimulator() {
  const [entryAmount, setEntryAmount] = useState<number>(80000);
  const [hasVehicle, setHasVehicle] = useState<boolean>(false);
  const [vehicleInfo, setVehicleInfo] = useState<string>('');

  const simulation = useMemo(() => {
    const financed = Math.max(PROPERTY.price - entryAmount, 0);
    // Estimativa realista de parcela mensal (360 a 420 meses, taxas bancárias típicas 9,5% a 10,8% a.a.)
    const rateLow = 0.095 / 12;
    const rateHigh = 0.108 / 12;
    const monthsLong = 420;
    const monthsStandard = 360;

    const calcPmt = (principal: number, r: number, n: number) => {
      if (principal <= 0) return 0;
      const factor = Math.pow(1 + r, n);
      return (principal * (r * factor)) / (factor - 1);
    };

    const parcelLow = Math.round(calcPmt(financed, rateLow, monthsLong) / 10) * 10;
    const parcelHigh = Math.round(calcPmt(financed, rateHigh, monthsStandard) / 10) * 10;

    return {
      financed,
      parcelLow,
      parcelHigh,
    };
  }, [entryAmount]);

  const whatsAppMessage = useMemo(() => {
    const entryFormatted = formatBRL(entryAmount);
    const vehicleTrimmed = vehicleInfo.trim();
    const vehicleClause = hasVehicle
      ? vehicleTrimmed
        ? `tenho um carro na troca (${vehicleTrimmed})`
        : 'tenho um carro para avaliar na troca'
      : 'não pretendo dar carro na troca';

    return `Olá! Fiz uma simulação no site do Residencial Alêro. Tenho ${entryFormatted} de entrada (+ FGTS), ${vehicleClause} e quero receber os detalhes exatos das parcelas.`;
  }, [entryAmount, hasVehicle, vehicleInfo]);

  const handleSendSimulation = () => {
    trackEvent('InitiateCheckout', {
      source: 'financing_simulator',
      content_name: 'Simulacao Financiamento Residencial Alero',
      entry_value: entryAmount,
      has_vehicle: hasVehicle,
      value: PROPERTY.price,
    });
    trackEvent('Lead', {
      source: 'financing_simulator',
      entry_value: entryAmount,
      has_vehicle: hasVehicle,
      value: PROPERTY.price,
    });
  };

  return (
    <section
      id="simulador"
      className="py-14 sm:py-20 bg-white border-y border-gray-200/70 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#065F46] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            Simulação Rápida • Sem Pedir CPF ou E-mail
          </span>
          <h2 className="mt-3 font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight">
            Simule sua Entrada, FGTS e Troca de Carro
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-gray-600">
            Arraste a barra abaixo para ver a estimativa na hora e envie sua simulação pronta no
            WhatsApp.
          </p>
        </div>

        {/* Interactive Card */}
        <div className="bg-[#FAFAFA] rounded-3xl border border-gray-200/90 p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-start">
            {/* Left: Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Input 1: Entrada + FGTS */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <label
                      htmlFor="entry-slider"
                      className="flex items-center gap-2 text-sm font-bold text-[#111827]"
                    >
                      <Wallet className="w-4 h-4 text-[#065F46]" />
                      Quanto você tem de Entrada + FGTS?
                    </label>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Some recursos próprios, saldo de FGTS ou valor aproximado do seu carro.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#065F46] tracking-tight">
                    {formatBRL(entryAmount)}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {Math.round((entryAmount / PROPERTY.price) * 100)}% do imóvel
                  </span>
                </div>

                <div className="mt-4">
                  <input
                    id="entry-slider"
                    type="range"
                    min={MIN_ENTRY}
                    max={MAX_ENTRY}
                    step={5000}
                    value={entryAmount}
                    onChange={(e) => setEntryAmount(Number(e.target.value))}
                    className="alero-slider"
                    aria-label="Valor da Entrada mais FGTS"
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-gray-400 mt-2">
                    <span>R$ 40 mil</span>
                    <span>R$ 120 mil</span>
                    <span>R$ 200 mil</span>
                  </div>
                </div>

                {/* Quick Presets for One-Hand Mobile Tap */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {QUICK_PRESETS.map((preset) => {
                    const selected = entryAmount === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setEntryAmount(preset)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selected
                            ? 'bg-[#065F46] text-white border-[#065F46]'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        R$ {preset / 1000} mil
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input 2: Carro na Troca */}
              <div className="bg-white rounded-2xl border border-gray-200/90 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[#111827]">
                  <Car className="w-4 h-4 text-[#065F46]" />
                  <span>Pretende dar um carro na troca?</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Avaliamos seu veículo de forma justa para abater na entrada.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setHasVehicle(true)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                      hasVehicle
                        ? 'bg-emerald-50 border-[#065F46] text-[#065F46]'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    Sim, tenho carro
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setHasVehicle(false);
                      setVehicleInfo('');
                    }}
                    className={`py-3 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                      !hasVehicle
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    Não vou usar carro
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {hasVehicle && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4">
                        <label
                          htmlFor="vehicle-model"
                          className="block text-xs font-bold text-gray-700 mb-1.5"
                        >
                          Modelo e ano do carro (opcional)
                        </label>
                        <input
                          id="vehicle-model"
                          type="text"
                          value={vehicleInfo}
                          onChange={(e) => setVehicleInfo(e.target.value)}
                          placeholder="Ex: Onix 2021, HB20 2020, Tracker 2022..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-[#FAFAFA] focus:bg-white focus:border-[#065F46] focus:ring-2 focus:ring-emerald-600/20 outline-none text-sm font-medium text-[#111827] transition-all"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Live Result & WhatsApp Conversion Box */}
            <div className="lg:col-span-5 bg-[#111827] text-white rounded-2xl p-6 sm:p-7 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Resumo da Simulação
                  </span>
                  <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">
                    Imóvel {PROPERTY.priceFormatted}
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Entrada + FGTS</span>
                    <span className="font-bold text-emerald-400">
                      {formatBRL(entryAmount)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Valor a financiar</span>
                    <span className="font-bold text-white">
                      {formatBRL(simulation.financed)}
                    </span>
                  </div>

                  {hasVehicle && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Carro na troca</span>
                      <span className="font-semibold text-amber-300 text-right max-w-[60%] truncate">
                        {vehicleInfo.trim() || 'Sim (a avaliar)'}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs font-semibold text-gray-400 block">
                      Faixa de parcela mensal aproximada
                    </span>
                    <div className="mt-1.5 font-display font-extrabold text-2xl sm:text-[1.7rem] text-white leading-tight">
                      {formatBRL(simulation.parcelLow)}{' '}
                      <span className="text-base font-semibold text-gray-400">a</span>{' '}
                      {formatBRL(simulation.parcelHigh)}
                      <span className="text-xs font-medium text-gray-400"> /mês</span>
                    </div>
                  </div>
                </div>

                {/* Honest Disclaimer */}
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/5 border border-white/10 p-3 text-[11px] text-gray-300 leading-relaxed">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Estimativa simulada — sujeita à aprovação bancária, perfil de renda e prazo
                    escolhido (até 35 anos).
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={buildWhatsAppUrl(whatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleSendSimulation}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-[#052e16] font-extrabold text-[13.5px] sm:text-base shadow-lg transition-all active:scale-[0.98] text-center leading-snug"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Enviar minha simulação no WhatsApp
                </a>

                <div className="flex items-center justify-center gap-3 text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Sem compromisso
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Resposta rápida
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
