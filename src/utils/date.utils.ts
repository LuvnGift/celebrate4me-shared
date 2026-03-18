/** Format a date to a human-readable string */
export const formatDate = (date: Date | string, locale = 'en-GB'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};

/** Format a date with time */
export const formatDateTime = (date: Date | string, locale = 'en-GB'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

/** Check if a date is in the future */
export const isFutureDate = (date: Date | string): boolean =>
  new Date(date) > new Date();

/** Add days to a date */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/** Get estimated delivery date from order creation */
export const getEstimatedDelivery = (createdAt: Date, estimatedDays: number): Date =>
  addDays(createdAt, estimatedDays);
