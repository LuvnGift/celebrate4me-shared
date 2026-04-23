import { Currency } from '../types';

/** Maps a buyer's country code to the currency they pay in. */
export const getUserCurrency = (buyerCountry?: string | null): 'USD' | 'GBP' | 'CAD' => {
  if (buyerCountry === 'CA') return 'CAD';
  if (buyerCountry === 'GB') return 'GBP';
  return 'USD';
};

const CURRENCY_CONFIG: Record<Currency, { symbol: string; locale: string; decimals: number }> = {
  [Currency.CAD]: { symbol: 'CA$', locale: 'en-CA', decimals: 2 },
  [Currency.USD]: { symbol: '$', locale: 'en-US', decimals: 2 },
  [Currency.GBP]: { symbol: '£', locale: 'en-GB', decimals: 2 },
  [Currency.NGN]: { symbol: '₦', locale: 'en-NG', decimals: 2 },
};

/** Convert smallest unit (kobo/cents) to decimal amount */
export const fromSmallestUnit = (amount: number): number => amount / 100;

/** Convert decimal amount to smallest unit (kobo/cents) */
export const toSmallestUnit = (amount: number): number => Math.round(amount * 100);

/** Format an amount (in smallest unit) to a display string */
export const formatCurrency = (amountInSmallestUnit: number, currency: Currency): string => {
  const { locale } = CURRENCY_CONFIG[currency];
  const amount = fromSmallestUnit(amountInSmallestUnit);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const getCurrencySymbol = (currency: Currency): string =>
  CURRENCY_CONFIG[currency].symbol;
