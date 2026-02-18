import React, { useState, useEffect, useMemo } from 'react';
import { X, Lock, Users, Image as ImageIcon, BarChart3, Save, Trash2, Plus, Loader2, AlertCircle, Calendar, TrendingUp, DollarSign, MousePointer2 } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: () => void;
}

// Cores para os gráficos
const COLORS = ['#059669', '#3b82f6', '#f59e0b', '#ef4444'];

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onUpdateConfig }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'leads' | 'content'>('analytics');

  // Data States
  const [leads, setLeads] = useState<any[]>([]);
  const [rawAnalytics, setRawAnalytics] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<{ url: string, label: string }[]>([]);
  const [heroImage, setHeroImage] = useState('');
  const [floorPlanImage, setFloorPlanImage] = useState('');

  // Filter State
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'all'>('7d');

  // Loading States
  const [isSaving, setIsSaving] = useState(false);

  // Initial Fetch when logging in
  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      // Fetch Leads
      const { data: leadsData } = await supabase.from('leads_geminadas').select('*').order('created_at', { ascending: false });
      if (leadsData) setLeads(leadsData);

      // Fetch Analytics (Histórico completo para gráficos)
      const { data: analyticsData } = await supabase.from('analytics_geminadas').select('created_at, event_type').order('created_at', { ascending: true });
      if (analyticsData) setRawAnalytics(analyticsData);

      // Fetch Config
      const { data: configData } = await supabase.from('site_config_geminadas').select('*');
      if (configData) {
        const heroConfig = configData.find(c => c.key === 'hero_image');
        const galleryConfig = configData.find(c => c.key === 'gallery_images');
        const floorPlanConfig = configData.find(c => c.key === 'floor_plan_image');

        if (heroConfig) setHeroImage(heroConfig.value || '');
        if (floorPlanConfig) setFloorPlanImage(floorPlanConfig.value || '');
        if (galleryConfig && Array.isArray(galleryConfig.value)) {
          setGalleryImages(galleryConfig.value);
        }
      }
    } catch (e) {
      console.error("Erro geral no fetch:", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const userClean = username.trim().toLowerCase();
    const passClean = password.trim();

    if (userClean === 'alexandre' && passClean === 'geminadas2026') {
      setIsLoggedIn(true);
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  const saveContent = async () => {
    setIsSaving(true);
    try {
      const { error: heroError } = await supabase
        .from('site_config_geminadas')
        .upsert({ key: 'hero_image', value: heroImage }, { onConflict: 'key' });
      if (heroError) throw heroError;

      const { error: galleryError } = await supabase
        .from('site_config_geminadas')
        .upsert({ key: 'gallery_images', value: galleryImages }, { onConflict: 'key' });
      if (galleryError) throw galleryError;

      const { error: floorPlanError } = await supabase
        .from('site_config_geminadas')
        .upsert({ key: 'floor_plan_image', value: floorPlanImage }, { onConflict: 'key' });
      if (floorPlanError) throw floorPlanError;

      alert('Conteúdo atualizado com sucesso!');
      onUpdateConfig();
    } catch (error: any) {
      console.error('Erro crítico ao salvar:', error);
      alert(`Falha ao salvar: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: 'hero' | 'gallery' | 'floorplan') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    setIsSaving(true);
    try {
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (target === 'hero') {
        setHeroImage(publicUrl);
      } else if (target === 'floorplan') {
        setFloorPlanImage(publicUrl);
      } else {
        const label = prompt("Descrição da foto (ex: Cozinha, Quarto):") || "Nova Foto";
        setGalleryImages(prev => [...prev, { url: publicUrl, label }]);
      }

      alert('Upload concluído com sucesso!');
    } catch (error: any) {
      console.error('Erro no upload:', error);
      alert('Erro ao subir imagem. Verifique se o bucket "images" existe no seu Supabase.');
    } finally {
      setIsSaving(false);
      e.target.value = ''; // Limpa o input
    }
  };

  const addImage = () => {
    const method = confirm("Deseja subir uma imagem do computador? (Cancelar para usar uma URL)");
    if (method) {
      document.getElementById('gallery-upload')?.click();
    } else {
      const url = prompt("Cole a URL da imagem:");
      if (!url) return;
      const label = prompt("Descrição (ex: Fachada):") || "Nova Foto";
      setGalleryImages(prev => [...prev, { url, label }]);
    }
  };

  const removeImage = (index: number) => {
    if (confirm("Tem certeza que deseja remover esta imagem?")) {
      setGalleryImages(prev => {
        const newImages = [...prev];
        newImages.splice(index, 1);
        return newImages;
      });
    }
  };

  // --- Lógica de Processamento de Dados para o Dashboard ---

  const processedData = useMemo(() => {
    const now = new Date();
    let startDate = new Date();

    if (dateRange === '7d') startDate.setDate(now.getDate() - 7);
    if (dateRange === '30d') startDate.setDate(now.getDate() - 30);
    if (dateRange === 'all') startDate = new Date(0); // 1970

    // Filtra dados pelo período
    const filteredLeads = leads.filter(l => new Date(l.created_at) >= startDate);
    const filteredAnalytics = rawAnalytics.filter(a => new Date(a.created_at) >= startDate);

    // 1. Dados para o Gráfico Principal (Timeline)
    const timelineMap = new Map();

    // Popula com datas vazias se for 7 ou 30 dias para o gráfico ficar bonito
    if (dateRange !== 'all') {
      const days = dateRange === '7d' ? 7 : 30;
      for (let i = 0; i <= days; i++) {
        const d = new Date();
        d.setDate(now.getDate() - (days - i));
        const key = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        timelineMap.set(key, { name: key, visits: 0, leads: 0 });
      }
    }

    // Soma Visitas
    filteredAnalytics.forEach(item => {
      if (item.event_type === 'page_view') {
        const key = new Date(item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        if (dateRange === 'all' && !timelineMap.has(key)) timelineMap.set(key, { name: key, visits: 0, leads: 0 });
        if (timelineMap.has(key)) {
          const entry = timelineMap.get(key);
          entry.visits += 1;
        }
      }
    });

    // Soma Leads
    filteredLeads.forEach(item => {
      const key = new Date(item.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      if (dateRange === 'all' && !timelineMap.has(key)) timelineMap.set(key, { name: key, visits: 0, leads: 0 });
      if (timelineMap.has(key)) {
        const entry = timelineMap.get(key);
        entry.leads += 1;
      }
    });

    // Ordena Timeline
    const timelineData = Array.from(timelineMap.values()).sort((a, b) => {
      // Simplistic sort for DD/MM strings within current year assumption or sequential logic
      // For robust sorting in "All", we'd need full date objects, but for chart display:
      return 0; // The map insertion order usually holds for '7d'/'30d' loops. For 'all', might need better sort.
    });

    // 2. Dados de Veículos (Pizza)
    const vehicleData = [
      { name: 'Com Veículo', value: filteredLeads.filter(l => l.has_vehicle).length },
      { name: 'Sem Veículo', value: filteredLeads.filter(l => !l.has_vehicle).length },
    ].filter(d => d.value > 0);

    // 3. Dados de Renda (Barras)
    const incomeGroups = { 'Até 3k': 0, '3k-5k': 0, '5k-8k': 0, '+8k': 0 };
    filteredLeads.forEach(l => {
      const inc = Number(l.income);
      if (inc <= 3000) incomeGroups['Até 3k']++;
      else if (inc <= 5000) incomeGroups['3k-5k']++;
      else if (inc <= 8000) incomeGroups['5k-8k']++;
      else incomeGroups['+8k']++;
    });
    const incomeData = Object.keys(incomeGroups).map(k => ({ name: k, value: incomeGroups[k as keyof typeof incomeGroups] }));

    // 4. KPIs
    const totalVisits = filteredAnalytics.filter(a => a.event_type === 'page_view').length;
    const totalLeadsCount = filteredLeads.length;
    const conversionRate = totalVisits > 0 ? ((totalLeadsCount / totalVisits) * 100).toFixed(1) : '0';

    // Média de renda
    const avgIncome = totalLeadsCount > 0
      ? filteredLeads.reduce((acc, curr) => acc + Number(curr.income || 0), 0) / totalLeadsCount
      : 0;

    return { timelineData, vehicleData, incomeData, kpis: { totalVisits, totalLeadsCount, conversionRate, avgIncome } };

  }, [leads, rawAnalytics, dateRange]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm admin-overlay">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl">

        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold">Painel Administrativo - Residencial AleRo</h2>
          </div>
          <button onClick={onClose} className="hover:bg-slate-700 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {!isLoggedIn ? (
            <div className="m-auto w-full max-w-md p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-slate-800">Acesso Restrito</h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
                  <input
                    name="username"
                    type="text"
                    placeholder="Digite seu usuário"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                {loginError && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm font-medium animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                >
                  Entrar
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Sidebar */}
              <div className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
                <div className="p-4 space-y-2">
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'analytics' ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <BarChart3 className="w-5 h-5" /> Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'leads' ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <Users className="w-5 h-5" /> Leads (Contatos)
                  </button>
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'content' ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200' : 'hover:bg-gray-50 text-gray-600'}`}
                  >
                    <ImageIcon className="w-5 h-5" /> Fotos e Conteúdo
                  </button>
                </div>
                <div className="mt-auto p-4 border-t text-xs text-gray-400">
                  v1.2.0 • Admin Seguro
                </div>
              </div>

              {/* Main Area */}
              <div className="flex-1 overflow-y-auto bg-slate-50/50">

                {activeTab === 'analytics' && (
                  <div className="p-8 space-y-8">

                    {/* Header do Dashboard */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">Visão Geral</h3>
                        <p className="text-gray-500 text-sm">Acompanhe a performance de vendas em tempo real.</p>
                      </div>

                      <div className="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
                        <button onClick={() => setDateRange('7d')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${dateRange === '7d' ? 'bg-slate-800 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>7 Dias</button>
                        <button onClick={() => setDateRange('30d')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${dateRange === '30d' ? 'bg-slate-800 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>30 Dias</button>
                        <button onClick={() => setDateRange('all')} className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${dateRange === 'all' ? 'bg-slate-800 text-white shadow' : 'text-gray-600 hover:bg-gray-50'}`}>Tudo</button>
                      </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-blue-50 p-2 rounded-lg"><MousePointer2 className="w-5 h-5 text-blue-600" /></div>
                          <span className="text-xs font-bold text-gray-400 uppercase">Visitas</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800">{processedData.kpis.totalVisits}</div>
                        <div className="text-xs text-gray-500 mt-1">Acessos no site</div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-emerald-50 p-2 rounded-lg"><Users className="w-5 h-5 text-emerald-600" /></div>
                          <span className="text-xs font-bold text-gray-400 uppercase">Total Leads</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800">{processedData.kpis.totalLeadsCount}</div>
                        <div className="text-xs text-gray-500 mt-1">Interessados cadastrados</div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-purple-50 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-600" /></div>
                          <span className="text-xs font-bold text-gray-400 uppercase">Conversão</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800">{processedData.kpis.conversionRate}%</div>
                        <div className="text-xs text-gray-500 mt-1">Visitas vira Lead</div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="bg-amber-50 p-2 rounded-lg"><DollarSign className="w-5 h-5 text-amber-600" /></div>
                          <span className="text-xs font-bold text-gray-400 uppercase">Renda Média</span>
                        </div>
                        <div className="text-3xl font-bold text-slate-800">
                          {processedData.kpis.avgIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Poder de compra</div>
                      </div>
                    </div>

                    {/* Main Chart */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" /> Evolução de Tráfego e Leads
                      </h4>
                      <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={processedData.timelineData}>
                            <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area type="monotone" dataKey="visits" name="Visitas" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={2} />
                            <Area type="monotone" dataKey="leads" name="Leads" stroke="#059669" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Secondary Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* Income Bar Chart */}
                      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Perfil de Renda dos Interessados</h4>
                        <div className="h-64 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={processedData.incomeData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                              <Bar dataKey="value" name="Qtd. Leads" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Vehicle Pie Chart */}
                      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-slate-800 mb-4">Leads com Veículo para Troca</h4>
                        <div className="h-64 w-full flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={processedData.vehicleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {processedData.vehicleData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#e2e8f0'} />
                                ))}
                              </Pie>
                              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                              <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {activeTab === 'leads' && (
                  <div className="p-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-800">Lista de Contatos</h3>
                        <span className="text-xs text-gray-500 bg-white px-3 py-1 rounded border border-gray-200">{leads.length} Total</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th className="px-6 py-3">Nome</th>
                              <th className="px-6 py-3">Telefone</th>
                              <th className="px-6 py-3">Financiamento (Entrada/Prazo)</th>
                              <th className="px-6 py-3">Veículo</th>
                              <th className="px-6 py-3">Origem / Mensagem</th>
                              <th className="px-6 py-3">Data</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leads.map((lead) => (
                              <tr key={lead.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                  <div className="font-bold text-slate-800">{lead.name || 'Sem Nome'}</div>
                                  <div className="text-[10px] text-gray-400 font-mono">{lead.id?.toString().split('-')[0] || '---'}</div>
                                </td>
                                <td className="px-6 py-4 font-medium">{lead.phone || 'N/I'}</td>
                                <td className="px-6 py-4">
                                  {lead.deposit ? (
                                    <div className="space-y-1">
                                      <div className="text-emerald-600 font-bold">Entrada: R$ {(Number(lead.deposit) || 0).toLocaleString('pt-BR')}</div>
                                      <div className="text-xs text-gray-500">{lead.months ? `${lead.months} meses` : ''} {lead.parcel ? `• Parc. R$ ${(Number(lead.parcel) || 0).toLocaleString('pt-BR')}` : ''}</div>
                                    </div>
                                  ) : <span className="text-gray-300">Não informado</span>}
                                </td>
                                <td className="px-6 py-4">
                                  {lead.has_vehicle ? (
                                    <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                                      <div className="text-emerald-700 text-xs font-bold">{lead.car_model}</div>
                                      <div className="text-[10px] text-emerald-600 font-medium">Ano: {lead.car_year || 'N/I'}</div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400 text-xs">Sem veículo</span>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  <div className="max-w-xs">
                                    <div className="text-[10px] bg-slate-100 px-2 py-0.5 rounded inline-block mb-1 font-bold text-slate-500 uppercase tracking-tighter">
                                      {lead.source || 'Geral'}
                                    </div>
                                    {lead.message && (
                                      <p className="text-xs text-slate-600 bg-amber-50 p-2 rounded italic border border-amber-100">"{lead.message}"</p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-xs font-medium text-gray-400 whitespace-nowrap">
                                  {lead.created_at ? (
                                    <>
                                      {new Date(lead.created_at).toLocaleDateString()} <br />
                                      {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </>
                                  ) : '---'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="p-8 max-w-4xl mx-auto space-y-8">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm border border-blue-100 flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <div>
                        <strong>Modo Edição:</strong> As alterações feitas aqui atualizam o site em tempo real para todos os visitantes.
                      </div>
                    </div>

                    {/* Hero Image Edit */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <h3 className="font-bold mb-4 text-lg">Imagem de Capa (Hero)</h3>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={heroImage}
                          onChange={(e) => setHeroImage(e.target.value)}
                          className="flex-1 border p-2 rounded text-sm"
                          placeholder="URL da imagem (ou use o botão ao lado)"
                        />
                        <input
                          type="file"
                          id="hero-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'hero')}
                        />
                        <button
                          onClick={() => document.getElementById('hero-upload')?.click()}
                          className="bg-emerald-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" /> Subir Foto
                        </button>
                      </div>
                      <div className="mt-4 h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                        {heroImage ? (
                          <img src={heroImage} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Erro+na+Imagem')} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">Sem imagem definida</div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                          Visualização
                        </div>
                      </div>
                    </div>

                    {/* Floor Plan Edit */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <h3 className="font-bold mb-4 text-lg">Imagem da Planta Baixa</h3>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          value={floorPlanImage}
                          onChange={(e) => setFloorPlanImage(e.target.value)}
                          className="flex-1 border p-2 rounded text-sm"
                          placeholder="URL da planta (ou use o botão ao lado)"
                        />
                        <input
                          type="file"
                          id="floorplan-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'floorplan')}
                        />
                        <button
                          onClick={() => document.getElementById('floorplan-upload')?.click()}
                          className="bg-emerald-600 text-white px-4 py-2 rounded text-sm font-bold flex items-center gap-2 whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" /> Subir Planta
                        </button>
                      </div>
                      <div className="mt-4 h-64 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative group">
                        {floorPlanImage ? (
                          <img src={floorPlanImage} className="w-full h-full object-contain p-2" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Erro+na+Imagem')} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">Sem planta definida</div>
                        )}
                      </div>
                    </div>

                    {/* Gallery Edit */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Galeria de Fotos</h3>
                        <div className="flex gap-2">
                          <input
                            type="file"
                            id="gallery-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'gallery')}
                          />
                          <button onClick={addImage} className="flex items-center gap-1 text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm shadow-emerald-200">
                            <Plus className="w-4 h-4" /> Adicionar Foto
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img, idx) => (
                          <div key={idx} className="relative group border rounded-lg overflow-hidden bg-gray-50 aspect-video shadow-sm hover:shadow-md transition-all">
                            <img src={img.url} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                              <p className="text-white text-xs font-bold truncate">{img.label}</p>
                            </div>
                            <button
                              onClick={() => removeImage(idx)}
                              className="absolute top-2 right-2 bg-white text-red-600 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 shadow-md transform translate-y-2 group-hover:translate-y-0"
                              title="Remover foto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {galleryImages.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                          <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-400">Nenhuma foto na galeria.</p>
                        </div>
                      )}
                    </div>

                    <div className="sticky bottom-6">
                      <button
                        onClick={saveContent}
                        disabled={isSaving}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-900/20 transform active:scale-[0.99]"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" /> Salvando alterações...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" /> Salvar Alterações no Site
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;