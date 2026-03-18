import { Currency, UserRole } from './common.types';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  profilePicture?: string;
  phone?: string;
  preferredCurrency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  recipientName: string;
  recipientPhone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
