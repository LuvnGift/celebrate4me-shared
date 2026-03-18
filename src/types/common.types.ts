export enum Currency {
  CAD = 'CAD',
  USD = 'USD',
  GBP = 'GBP',
  NGN = 'NGN',
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum ChatMessageRole {
  USER = 'USER',
  BOT = 'BOT',
  AGENT = 'AGENT',
}

export enum NotificationType {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_STATUS_UPDATE = 'ORDER_STATUS_UPDATE',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  CHAT_ESCALATED = 'CHAT_ESCALATED',
  PROMOTIONAL = 'PROMOTIONAL',
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = null> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
