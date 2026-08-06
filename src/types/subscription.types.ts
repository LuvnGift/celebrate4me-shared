import type { Currency } from './common.types';

/**
 * Recurring gifting contract, shared by API, web and mobile.
 *
 * Subscription management is a core service on every platform, so this lives in
 * the shared package rather than being duplicated per app.
 */

/**
 * These are wire values: they arrive from JSON as plain strings, so they're
 * const arrays + union types rather than TS enums. An enum would force a cast
 * at every API boundary in both clients.
 */

export const SUBSCRIPTION_INTERVALS = ['MONTHLY', 'BIWEEKLY'] as const;
export type SubscriptionInterval = (typeof SUBSCRIPTION_INTERVALS)[number];

export const SUBSCRIPTION_STATUSES = [
  'ACTIVE',
  'PAUSED',
  /** Stripe couldn't collect. Deliveries continue during the retry window. */
  'PAST_DUE',
  'CANCELLED',
] as const;
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUSES)[number];

/**
 * How the subscriber wants unavailable items handled.
 * SMART — replace with equal or better, no delivery delay (default).
 * ASK_FIRST — contact the subscriber, fall back to SMART after 24h.
 * NONE — never replace; omit and make good.
 */
export const SUBSTITUTION_PREFERENCES = ['SMART', 'ASK_FIRST', 'NONE'] as const;
export type SubstitutionPreference = (typeof SUBSTITUTION_PREFERENCES)[number];

/**
 * Hard constraints on what may be delivered to a recipient.
 * SAFETY, not preference: these override the substitution ladder in both
 * directions. See SUBSTITUTION-POLICY.md clause 3.
 */
export const DIETARY_FLAGS = [
  'Peanuts / groundnuts',
  'Tree nuts',
  'Dairy',
  'Gluten',
  'Shellfish',
  'Eggs',
  'Soy',
  'No alcohol',
  'No pork',
  'Halal only',
  'Vegetarian',
] as const;

export type DietaryFlag = (typeof DIETARY_FLAGS)[number];

export interface SubscriptionPrice {
  id: string;
  interval: SubscriptionInterval;
  currency: Currency;
  /** Smallest currency unit, like every other monetary value. */
  amount: number;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** How many catalogue items the subscriber may pick. Quantity is free. */
  slotCount: number;
  image?: string | null;
  sortOrder: number;
  isActive: boolean;
  prices: SubscriptionPrice[];
}

export interface SubscriptionCatalogueItem {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  currency: Currency;
  category: string;
}

export interface SubscriptionItem {
  id: string;
  quantity: number;
  customItem: SubscriptionCatalogueItem;
}

export interface SubscriptionRecipient {
  recipientName: string;
  city: string;
  state: string;
  dietaryFlags?: string[];
  dietaryNotes?: string | null;
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  interval: SubscriptionInterval;
  currency: Currency;
  substitutionPreference: SubstitutionPreference;
  currentPeriodEnd?: string | null;
  /** Start of the promised delivery window for the upcoming cycle. */
  nextDeliveryDate?: string | null;
  skipNextCycle: boolean;
  cancelAtPeriodEnd: boolean;
  plan: SubscriptionPlan;
  address: SubscriptionRecipient;
  items: SubscriptionItem[];
}

export interface CreateSubscriptionResult {
  subscriptionId: string;
  stripeSubscriptionId: string;
  /** Null when the first invoice needed no confirmation. */
  clientSecret: string | null;
}
