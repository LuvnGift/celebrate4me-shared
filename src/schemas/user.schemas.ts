import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/).optional(),
  phone: z.string().min(7).max(20).optional(),
  preferredCurrency: z.enum(['CAD', 'USD', 'GBP']).optional(),
  profilePicture: z.string().url().optional(),
});

export const createAddressSchema = z.object({
  recipientName: z.string().min(2).max(100),
  recipientPhone: z.string().min(7).max(20),
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().default('Nigeria'),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
