import { UnitStatus, Testimonial } from './types';

export const PROJECT_DETAILS = {
  title: "Residencial Alêro",
  location: "Rua Antônio Tonon, Barragem - Rio do Sul/SC - CEP 89165-184",
  area: 75.87,
  totalArea: 151.74,
  rooms: {
    suite: "12,03m²",
    bedroom: "9,52m²",
    living: "18,97m²",
    kitchen: "6,82m²",
    bathrooms: "7,64m² (Total)",
    laundry: "3,44m²"
  },
  features: [
    "Área Privativa de 75,87m²",
    "Piso Porcelanato Polido e Retificado",
    "1 Suíte Real + 1 Dormitório Amplo",
    "Banheiros com Nicho e Acabamento Amadeirado",
    "Área de Serviço Coberta e Independente",
    "Vaga de Garagem Coberta com Abrigo",
    "Aceita Carro na Negociação (sob avaliação)"
  ]
};

export const UNITS: UnitStatus[] = [
  { id: 1, name: "Unidade 01 (Lado Cinza)", status: 'disponivel', price: 395000 },
  { id: 2, name: "Unidade 02 (Lado Azul)", status: 'disponivel', price: 395000 }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ricardo Mendes",
    role: "Cliente Satisfeito",
    text: "Consegui dar meu carro de entrada e financiar o restante. A casa é linda, acabamento impecável.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Juliana Santos",
    role: "Moradora do Bairro",
    text: "A localização na Barragem é ótima, livre de enchente e rua tranquila. O Residencial Alêro ficou muito bonito.",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];