import { z } from 'zod';

// ── Reusable primitives ──────────────────────────────────────────────────────

/** Letters (incl. accented), spaces, hyphens, apostrophes only. Trims whitespace. */
const nameField = (label: string, min = 1, max = 50) =>
  z.string()
    .trim()
    .min(min, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`)
    .regex(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ'\-\s]+$/,
      `${label} can only contain letters, hyphens, and apostrophes`,
    );

/** Letters, digits, spaces, hyphens, apostrophes, periods — for city/state/place names */
const placeField = (label: string, min = 2, max = 100) =>
  z.string()
    .trim()
    .min(min, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`)
    .regex(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9'\-\s.]+$/,
      `${label} contains invalid characters`,
    );

/** E.164-compatible phone: optional +, then digits/spaces/dashes/parens */
const phoneField = z
  .string()
  .trim()
  .regex(/^\+?[\d\s\-(). ]{7,20}$/, 'Enter a valid phone number (e.g. +1 555 000 0000)');

/** YYYY-MM-DD string that is a valid past date */
const dobField = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use format YYYY-MM-DD')
  .refine((val) => {
    const d = new Date(val);
    return !isNaN(d.getTime()) && d < new Date();
  }, 'Date of birth must be a valid past date')
  .optional();

/** Street addresses can contain letters, digits, spaces, and common punctuation */
const streetField = (min = 5, max = 200) =>
  z.string()
    .trim()
    .min(min, 'Street address is required')
    .max(max)
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s,.'#\-/]+$/, 'Street address contains invalid characters');

/** Postal / ZIP codes: alphanumeric with optional spaces and hyphens */
const postalField = z
  .string()
  .trim()
  .max(20)
  .regex(/^[a-zA-Z0-9\s\-]+$/, 'Enter a valid postal / ZIP code')
  .optional();

// ── Schemas ──────────────────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  firstName: nameField('First name').optional(),
  lastName: nameField('Last name').optional(),
  dateOfBirth: dobField,
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(30)
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      'Username must start with a letter and can only contain letters, numbers, and underscores',
    )
    .optional(),
  phone: phoneField.optional(),
  preferredCurrency: z.enum(['CAD', 'USD', 'GBP']).optional(),
  profilePicture: z.string().url('Must be a valid URL').optional(),
  /** ISO 3166-1 alpha-2 country code of the buyer ('CA', 'US', 'GB') */
  buyerCountry: z.enum(['CA', 'US', 'GB']).optional(),
  /** Province/state code — required for CA (tax), optional otherwise */
  buyerProvince: z
    .string()
    .trim()
    .min(2, 'Province/state is required')
    .max(50)
    .regex(/^[a-zA-Z\s\-]+$/, 'Province/state contains invalid characters')
    .optional(),
  /** Buyer billing address fields */
  billingStreet: streetField().optional(),
  billingCity: placeField('City', 2, 100).optional(),
  billingPostalCode: postalField,
});

/** Dedicated schema for the post-verification billing address setup step */
export const updateLocationSchema = z.object({
  buyerCountry: z.enum(['CA', 'US', 'GB'], { required_error: 'Country is required' }),
  buyerProvince: z
    .string()
    .trim()
    .min(2, 'Province/state is required')
    .max(50)
    .regex(/^[a-zA-Z\s\-]+$/, 'Province/state contains invalid characters')
    .optional(),
  billingStreet: streetField(),
  billingCity: placeField('City', 2, 100),
  billingPostalCode: postalField,
}).refine(
  (data) => data.buyerCountry !== 'CA' || !!data.buyerProvince,
  { message: 'Province is required for Canadian buyers', path: ['buyerProvince'] },
);

export const createAddressSchema = z.object({
  recipientName: nameField('Recipient name', 2, 100),
  recipientPhone: phoneField,
  street: streetField(),
  city: placeField('City', 2, 100),
  state: placeField('State', 2, 50),
  country: z.string().trim().default('Nigeria'),
  postalCode: postalField,
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;