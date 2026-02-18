import React, { useState, useEffect } from 'react';
import { Car, DollarSign, Upload, CheckCircle, Calculator, Send, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { UNITS } from '../constants';
import { supabase, trackEvent } from '../services/supabaseClient';

const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    income: 5000,
    deposit: 50000,
    hasVehicle: false,
    carModel: '',
    carYear: '',
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // Armazena URLs de preview para evitar recriá-las a cada render
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Limpa URLs de objeto quando os arquivos mudam ou componente desmonta
  useEffect(() => {
    const urls = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (selectedFiles.length + newFiles.length > 5) {
        alert("Você pode enviar no máximo 5 fotos.");
        return;
      }
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToStorage = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    const uploadedUrls: string[] = [];
    const totalFiles = selectedFiles.length;

    try {
      for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split('.').pop();
        const cleanPhone = formData.phone.replace(/\D/g, '');
        const fileName = `${Date.now()}_${cleanPhone}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `leads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('vehicle_photos')
          .upload(filePath, file);

        if (uploadError) {
          console.error(`Erro ao enviar ${file.name}:`, uploadError);
          continue;
        }

        const { data } = supabase.storage
          .from('vehicle_photos')
          .getPublicUrl(filePath);

        if (data.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        }

        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100));
      }
    } catch (error) {
      console.error("Erro no processo de upload:", error);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setUploadProgress(0);

    try {
      let photoUrls: string[] = [];
      if (formData.hasVehicle && selectedFiles.length > 0) {
        photoUrls = await uploadImagesToStorage();
      }

      const { error } = await supabase.from('leads_geminadas').insert({
        name: formData.name,
        phone: formData.phone,
        income: formData.income,
        deposit: formData.deposit,
        has_vehicle: formData.hasVehicle,
        car_model: formData.carModel,
        car_year: formData.carYear,
        car_photos: photoUrls,
        status: 'novo'
      });

      if (error) console.error("Erro ao salvar lead:", error);
      trackEvent('lead_submission');

      let message = `Olá! Tenho interesse no Residencial AleRo (Rio do Sul).
      
*Meus Dados:*
Nome: ${formData.name}
Renda Mensal: R$ ${formData.income}
Entrada Disponível: R$ ${formData.deposit}
      
*Avaliação de Veículo:*
${formData.hasVehicle ? `Tenho um ${formData.carModel} (${formData.carYear}) para dar na troca.` : 'Não tenho veículo para troca.'}`;

      if (photoUrls.length > 0) {
        message += `\n\n(Enviei ${photoUrls.length} fotos do veículo pelo cadastro do site)`;
      }

      message += `\n\nGostaria de uma simulação e agendar visita.`;

      window.open(`https://wa.me/5547988452087?text=${encodeURIComponent(message)}`, '_blank');

      alert("Dados enviados com sucesso! Redirecionando para um consultor para sua simulação...");
      setFormData({
        name: '', phone: '', income: 5000, deposit: 50000,
        hasVehicle: false, carModel: '', carYear: ''
      });
      setSelectedFiles([]);

    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro ao processar. Tente novamente.");
    } finally {
      setIsSending(false);
      setUploadProgress(0);
    }
  };

  return (
    <section id="simulacao" className="py-20 bg-slate-900/60 backdrop-blur-lg text-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          <div className="md:w-5/12 bg-emerald-700 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Financiamento Inteligente</h3>
              <p className="text-emerald-100 text-sm mb-6">
                Não perca tempo com burocracia. Nossa equipe é especialista em aprovação de crédito na Caixa e bancos privados.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-600 p-2 rounded-lg"><Car className="w-5 h-5" /></div>
                  <span className="text-sm font-medium">Seu carro vale dinheiro na entrada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-600 p-2 rounded-lg"><CheckCircle className="w-5 h-5" /></div>
                  <span className="text-sm font-medium">Use seu FGTS</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-600 p-2 rounded-lg"><Calculator className="w-5 h-5" /></div>
                  <span className="text-sm font-medium">Parcelas menores que o aluguel</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-600 relative z-10">
              <p className="text-xs text-emerald-200">Unidades a partir de</p>
              <p className="text-3xl font-bold">R$ {UNITS[0].price.toLocaleString('pt-BR')}</p>
            </div>
          </div>

          <div className="md:w-7/12 p-8 text-gray-800">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Pré-Análise de Crédito</h2>
              <p className="text-gray-500 text-sm">Preencha para receber uma simulação oficial.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp</label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="(47) 99999-9999"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Renda Bruta Familiar</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400 text-sm">R$</span>
                    <input
                      type="number"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.income}
                      onChange={e => setFormData({ ...formData, income: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Valor de Entrada (Dinheiro + FGTS)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400 text-sm">R$</span>
                    <input
                      type="number"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={formData.deposit}
                      onChange={e => setFormData({ ...formData, deposit: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    id="hasVehicle"
                    checked={formData.hasVehicle}
                    onChange={e => setFormData({ ...formData, hasVehicle: e.target.checked })}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="hasVehicle" className="text-sm font-medium text-gray-700 select-none cursor-pointer">
                    Tenho um veículo para dar de entrada
                  </label>
                </div>

                {formData.hasVehicle && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 animate-in fade-in slide-in-from-top-2 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Modelo (ex: Gol 1.6)"
                        className="bg-white border border-gray-200 rounded px-3 py-2 text-sm"
                        value={formData.carModel}
                        onChange={e => setFormData({ ...formData, carModel: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Ano"
                        className="bg-white border border-gray-200 rounded px-3 py-2 text-sm"
                        value={formData.carYear}
                        onChange={e => setFormData({ ...formData, carYear: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Fotos do Veículo (Opcional)</label>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {previewUrls.map((url, idx) => (
                          <div key={idx} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={url}
                              className="w-full h-full object-cover"
                              alt="preview"
                            />
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {selectedFiles.length < 5 && (
                          <label className="w-16 h-16 flex flex-col items-center justify-center border-2 border-dashed border-emerald-300 rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors">
                            <Upload className="w-5 h-5 text-emerald-500" />
                            <span className="text-[9px] text-emerald-600 font-bold mt-1">Adicionar</span>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={handleFileSelect}
                            />
                          </label>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400">Máximo 5 fotos. Formatos: JPG, PNG.</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transform active:scale-95 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {uploadProgress > 0 ? `Enviando Fotos ${uploadProgress}%` : 'Processando...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Solicitar Avaliação e Simulação
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-400">
                Seus dados estão seguros. Entraremos em contato em até 1 hora comercial.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;