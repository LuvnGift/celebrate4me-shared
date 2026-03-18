import { Currency } from './common.types';

export interface BundleItem {
  id: string;
  bundleId: string;
  name: string;
  description?: string;
  quantity: number;
}

export interface Bundle {
  id: string;
  occasionId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: Currency;
  estimatedDeliveryDays: number;
  images: string[];
  isActive: boolean;
  items: BundleItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Occasion {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  isActive: boolean;
  bundles?: Bundle[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: Currency;
  category: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
