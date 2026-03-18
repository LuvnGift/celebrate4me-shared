import { Currency, OrderStatus } from './common.types';

export interface OrderItem {
  id: string;
  orderId: string;
  customItemId?: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  bundleId?: string;
  vendorId?: string;
  status: OrderStatus;
  recipientName: string;
  recipientPhone: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryCountry: string;
  personalMessage?: string;
  specialInstructions?: string;
  preferredDeliveryDate?: Date;
  subtotal: number;
  tax: number;
  total: number;
  currency: Currency;
  adminNotes?: string;
  isFlagged: boolean;
  invoiceUrl?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  pdfUrl?: string;
  emailedAt?: Date;
  createdAt: Date;
}
