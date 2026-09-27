export type PageView = 'home' | 'about' | 'services' | 'contact' | 'cgu' | 'rgpd' | '404';

export type ServiceTierId = 'express' | 'complet' | 'premium';

export type MotorType = 'all' | 'thermique' | 'hybride' | 'electrique';

export interface ServiceTier {
  id: ServiceTierId;
  name: string;
  tagline: string;
  price: number;
  duration: string;
  popular?: boolean;
  targetAudience: string;
  description: string;
  features: string[];
  pointsOfControl: string[];
}

export interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceId: ServiceTierId;
  motorType: 'thermique' | 'hybride' | 'electrique';
  vehicleBrandModel: string;
  vehiclePlateOrVin: string;
  vehicleYear: string;
  vehicleMileage: string;
  cityPostalCode: string;
  preferredDate: string;
  preferredTimeSlot: string;
  symptoms: string;
  message?: string;
}
