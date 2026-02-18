export interface UnitStatus {
  id: number;
  name: string;
  status: 'disponivel' | 'reservado' | 'vendido';
  price: number;
}

export interface LeadFormState {
  name: string;
  whatsapp: string;
  income: string;
  deposit: string;
  fgts: string;
  hasVehicle: boolean;
  vehicleModel: string;
  vehicleYear: string;
  vehicleFipe: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatarUrl: string;
}