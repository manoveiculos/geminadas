export type PhotoCategory =
  | 'todas'
  | 'fachada'
  | 'social'
  | 'quartos'
  | 'banheiros'
  | 'fundos'
  | 'planta';

export interface PropertyPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Exclude<PhotoCategory, 'todas'>;
  categoryLabel: string;
  width: number;
  height: number;
}

export interface PropertyUnit {
  id: number;
  code: string;
  name: string;
  position: string;
  status: 'DISPONÍVEL' | 'RESERVADA' | 'VENDIDA';
  price: number;
  area: string;
  specs: string[];
  highlight: string;
}

export const PROPERTY = {
  name: 'Residencial Alêro',
  city: 'Rio do Sul - SC',
  neighborhood: 'Bairro Barragem',
  address: 'Rua Antônio Tonon, Bairro Barragem — Rio do Sul/SC',
  cep: '89165-184',
  coordinates: {
    lat: -27.2404991,
    lng: -49.6760014,
  },
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=-27.2404991,-49.6760014+(Residencial+Al%C3%AAro+-+Rua+Ant%C3%B4nio+Tonon,+Barragem,+Rio+do+Sul)&t=&z=16&ie=UTF8&iwloc=&output=embed',
  googleMapsRouteUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-27.2404991,-49.6760014',
  whatsappNumber: '5547988452087',
  whatsappDisplay: '(47) 98845-2087',
  price: 395000,
  priceFormatted: 'R$ 395.000',
  priceShort: 'R$ 395 mil',
  areaPrivativa: '75,87m²',
  gaMeasurementId: 'G-H0PLTNLJTS',
} as const;

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${PROPERTY.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const UNITS: PropertyUnit[] = [
  {
    id: 1,
    code: 'Unidade 01',
    name: 'Unidade 01',
    position: 'Canto Esquerdo',
    status: 'DISPONÍVEL',
    price: 395000,
    area: '75,87m²',
    highlight: 'Maior privacidade lateral esquerda e acesso independente',
    specs: [
      '75,87m² de área privativa bem distribuída',
      '1 Suíte Master (12,03m²) com vista para a mata',
      '1 Dormitório amplo (9,52m²)',
      'Banheiro Social + Banheiro da Suíte com nicho',
      'Sala e Cozinha integradas (conceito aberto)',
      'Lavanderia lateral coberta e independente',
      'Vaga frontal gramada com jardim',
      'Terreno exclusivo nos fundos para área de lazer',
    ],
  },
  {
    id: 2,
    code: 'Unidade 02',
    name: 'Unidade 02',
    position: 'Canto Direito',
    status: 'DISPONÍVEL',
    price: 395000,
    area: '75,87m²',
    highlight: 'Excelente incidência solar e terreno amplo nos fundos',
    specs: [
      '75,87m² de área privativa bem distribuída',
      '1 Suíte Master (12,03m²) com vista para a mata',
      '1 Dormitório amplo (9,52m²)',
      'Banheiro Social + Banheiro da Suíte com nicho',
      'Sala e Cozinha integradas (conceito aberto)',
      'Lavanderia lateral coberta e independente',
      'Vaga frontal gramada com jardim',
      'Terreno exclusivo nos fundos para área de lazer',
    ],
  },
];

export const GALLERY_CATEGORIES: { key: PhotoCategory; label: string }[] = [
  { key: 'todas', label: 'Todas as Fotos' },
  { key: 'fachada', label: 'Fachada & Frente' },
  { key: 'social', label: 'Sala & Cozinha' },
  { key: 'quartos', label: 'Suíte & Dormitório' },
  { key: 'banheiros', label: 'Banheiros' },
  { key: 'fundos', label: 'Fundos & Mata' },
  { key: 'planta', label: 'Planta Baixa' },
];

export const PROPERTY_PHOTOS: PropertyPhoto[] = [
  {
    id: 'fachada-principal',
    src: '/images/fachada-principal.webp',
    alt: 'Fachada real pronta do Residencial Alêro no Bairro Barragem em Rio do Sul',
    caption: 'Fachada Moderna Pronta — Acabamento em mármore, esquadrias pretas e jardim frontal',
    category: 'fachada',
    categoryLabel: 'Fachada',
    width: 1200,
    height: 1125,
  },
  {
    id: 'sala-cozinha-integradas',
    src: '/images/sala-cozinha-integradas.webp',
    alt: 'Sala e cozinha integradas com piso porcelanato polido e iluminação LED',
    caption: 'Sala e Cozinha Integradas — Piso porcelanato polido, iluminação LED e ótima luz natural',
    category: 'social',
    categoryLabel: 'Sala & Cozinha',
    width: 1600,
    height: 1200,
  },
  {
    id: 'suite-vista-mata',
    src: '/images/suite-vista-mata.webp',
    alt: 'Suíte master de 12,03m² com janela ampla para área de preservação ambiental',
    caption: 'Suíte Master (12,03m²) — Vista permanente para a área de preservação verde',
    category: 'quartos',
    categoryLabel: 'Suíte',
    width: 1600,
    height: 1200,
  },
  {
    id: 'banheiro-suite',
    src: '/images/banheiro-suite.webp',
    alt: 'Banheiro da suíte com porcelanato amadeirado no box e nicho embutido',
    caption: 'Banheiro da Suíte — Revestimento amadeirado, nicho embutido e ventilação natural',
    category: 'banheiros',
    categoryLabel: 'Banheiro',
    width: 1600,
    height: 1200,
  },
  {
    id: 'terreno-fundos-mata',
    src: '/images/terreno-fundos-mata.webp',
    alt: 'Terreno nos fundos com muro privativo e vista direta para mata nativa preservada',
    caption: 'Terreno nos Fundos — Privacidade absoluta de frente para área de preservação',
    category: 'fundos',
    categoryLabel: 'Fundos & Mata',
    width: 1024,
    height: 1536,
  },
  {
    id: 'sala-estar-acesso-lateral',
    src: '/images/sala-estar-acesso-lateral.webp',
    alt: 'Área social integrada com infra para ar-condicionado split e acesso à lavanderia',
    caption: 'Área Social Open Space — Ponto de ar-condicionado split pronto e acesso à lavanderia',
    category: 'social',
    categoryLabel: 'Sala & Cozinha',
    width: 1536,
    height: 1024,
  },
  {
    id: 'dormitorio-amplo',
    src: '/images/dormitorio-amplo.webp',
    alt: 'Dormitório amplo de 9,52m² com piso porcelanato e janela em alumínio preto',
    caption: 'Dormitório (9,52m²) — Acabamento em massa corrida, porcelanato e esquadria preta',
    category: 'quartos',
    categoryLabel: 'Dormitório',
    width: 1600,
    height: 1200,
  },
  {
    id: 'banheiro-social',
    src: '/images/banheiro-social.webp',
    alt: 'Banheiro social com revestimento amadeirado no box e nicho embutido',
    caption: 'Banheiro Social — Porcelanato retificado e box com acabamento amadeirado',
    category: 'banheiros',
    categoryLabel: 'Banheiro',
    width: 1600,
    height: 1200,
  },
  {
    id: 'vista-area-preservacao',
    src: '/images/vista-area-preservacao.webp',
    alt: 'Vista real pela janela dos fundos para a mata verde preservada',
    caption: 'Vista Real da Janela — Tranquilidade e contato diário com a natureza, sem vizinhos nos fundos',
    category: 'fundos',
    categoryLabel: 'Fundos & Mata',
    width: 1600,
    height: 1200,
  },
  {
    id: 'cozinha-revestimento',
    src: '/images/cozinha-revestimento.webp',
    alt: 'Parede da cozinha com revestimento porcelanato marmorizado e pontos instalados',
    caption: 'Cozinha Funcional — Parede revestida em porcelanato marmorizado e pontos preparados',
    category: 'social',
    categoryLabel: 'Sala & Cozinha',
    width: 1200,
    height: 1600,
  },
  {
    id: 'lavanderia-coberta',
    src: '/images/lavanderia-coberta.webp',
    alt: 'Lavanderia lateral coberta e independente com passagem para os fundos',
    caption: 'Lavanderia Coberta — Espaço independente e arejado com passagem direta aos fundos',
    category: 'fundos',
    categoryLabel: 'Fundos & Mata',
    width: 1200,
    height: 1600,
  },
  {
    id: 'vaga-frontal-rua',
    src: '/images/vaga-frontal-rua.webp',
    alt: 'Vaga de garagem frontal gramada e rua residencial tranquila no Bairro Barragem',
    caption: 'Vaga Frontal & Rua Tranquila — Rua Antônio Tonon, bairro residencial calmo e seguro',
    category: 'fachada',
    categoryLabel: 'Fachada',
    width: 1200,
    height: 980,
  },
  {
    id: 'dormitorio-infra-split',
    src: '/images/dormitorio-infra-split.webp',
    alt: 'Dormitório com infraestrutura pronta para ar-condicionado split e porta branca',
    caption: 'Infraestrutura para Split — Pontos de ar-condicionado prontos sem precisar quebrar parede',
    category: 'quartos',
    categoryLabel: 'Dormitório',
    width: 1600,
    height: 1200,
  },
  {
    id: 'planta-baixa-alero',
    src: '/images/planta-baixa-alero.webp',
    alt: 'Planta baixa técnica das Unidades 01 e 02 do Residencial Alêro com 75,87m² cada',
    caption: 'Planta Baixa Oficial — 75,87m² privativos por unidade com distribuição inteligente',
    category: 'planta',
    categoryLabel: 'Planta Baixa',
    width: 1024,
    height: 1448,
  },
];

export const DISTANCES = [
  { place: 'SESC Rio do Sul', distance: '2,1 km', time: '~4 min' },
  { place: 'Centro / Prefeitura', distance: '5,6 km', time: '~9 min' },
  { place: 'UNIDAVI', distance: '5,7 km', time: '~10 min' },
];

export const FAQ_ITEMS = [
  {
    question: 'As casas já estão prontas e averbadas para financiamento?',
    answer:
      'Sim! Ambas as unidades estão 100% concluídas, prontas para morar, com Habite-se concedido, matrícula individualizada e construção averbada no Registro de Imóveis. Isso permite aprovar seu financiamento bancário (Caixa ou outros bancos) de forma rápida e sem entraves.',
  },
  {
    question: 'Posso usar meu FGTS ou dar meu carro como parte da entrada?',
    answer:
      'Sim! Você pode somar recursos próprios, saldo de FGTS e também oferecer seu veículo na negociação (mediante avaliação justa) para compor a entrada. Fazemos toda a orientação junto ao correspondente bancário para facilitar sua aprovação.',
  },
  {
    question: 'A rua ou o terreno sofrem com enchente em Rio do Sul?',
    answer:
      'Não! O Residencial Alêro está localizado em cota segura na Rua Antônio Tonon, no Bairro Barragem — uma região 100% fora de enchente e livre de área de risco, oferecendo tranquilidade total para sua família e valorização patrimonial.',
  },
  {
    question: 'Qual a diferença entre a Unidade 01 e a Unidade 02?',
    answer:
      'As duas unidades possuem a mesma área privativa (75,87m²), o mesmo padrão refinado de acabamento em porcelanato, 1 suíte + 1 dormitório, vaga frontal e fundos para área de preservação. A diferença está na posição (Canto Esquerdo ou Canto Direito), e ambas estão disponíveis para você visitar e escolher a sua favorita.',
  },
  {
    question: 'Como funciona para agendar uma visita presencial?',
    answer:
      'É simples e sem burocracia: basta clicar em qualquer botão de WhatsApp aqui na página e informar o melhor dia e horário para você. Atendemos inclusive fora do horário comercial e aos finais de semana mediante agendamento rápido.',
  },
];
