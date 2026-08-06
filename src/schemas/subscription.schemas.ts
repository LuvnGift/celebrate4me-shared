import { z } from 'zod';

/**
 * Recurring gifting validation, shared by API middleware, web forms and mobile
 * forms. Subscription management is a core service on every platform.
 */

export const subscriptionIntervalSchema = z.enum(['MONTHLY', 'BIWEEKLY']);
export const substitutionPreferenceSchema = z.enum(['SMART', 'ASK_FIRST', 'NONE']);

/**
 * Recipient dietary constraints — SAFETY, not preference. These override the
 * substitution ladder in both directions.
 */
export const dietarySchema = z.object({
  dietaryFlags: z.array(z.string().trim().min(2).max(40)).max(20).optional(),
  dietaryNotes: z.string().trim().max(500).optional(),
});

const boxItemSchema = z.object({
  customItemId: z.string().cuid(),
  quantity: z.number().int().positive().max(20),
});

export const createSubscriptionSchema = z.object({
  planId: z.string().cuid(),
  addressId: z.string().cuid(),
  interval: subscriptionIntervalSchema,
  substitutionPreference: substitutionPreferenceSchema.optional(),
  dietaryFlags: z.array(z.string().trim().min(2).max(40)).max(20).optional(),
  dietaryNotes: z.string().trim().max(500).optional(),
  /** Empty = take the plan's pre-picked default box. */
  items: z.array(boxItemSchema).max(50).optional().default([]),
});

export const updateSubscriptionItemsSchema = z.object({
  items: z.array(boxItemSchema).max(50),
});

export const skipCycleSchema = z.object({
  /** true = skip the next cycle (no charge), false = undo a pending skip. */
  skip: z.boolean(),
});

export const updatePreferenceSchema = z.object({
  substitutionPreference: substitutionPreferenceSchema,
});

export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type UpdateSubscriptionItemsInput = z.infer<typeof updateSubscriptionItemsSchema>;
export type DietaryInput = z.infer<typeof dietarySchema>;
