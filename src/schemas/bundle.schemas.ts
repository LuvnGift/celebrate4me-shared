import { z } from 'zod';

export const createBundleSchema = z.object({
  occasionId: z.string().cuid(),
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(2000),
  price: z.number().int().positive(),
  currency: z.enum(['CAD', 'USD', 'GBP']),
  estimatedDeliveryDays: z.number().int().positive().max(30),
  images: z.array(z.string().url()).min(1).max(10),
  items: z.array(z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
    quantity: z.number().int().positive(),
  })).min(1),
});

export const updateBundleSchema = createBundleSchema.partial();

export const createOccasionSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  image: z.string().url().optional(),
});

export const updateOccasionSchema = createOccasionSchema.partial();

export const createCustomItemSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional(),
  price: z.number().int().positive(),
  currency: z.enum(['CAD', 'USD', 'GBP']),
  category: z.string().min(2).max(50),
  stock: z.number().int().min(0),
});

export const updateCustomItemSchema = createCustomItemSchema.partial();

export type CreateBundleInput = z.infer<typeof createBundleSchema>;
export type CreateOccasionInput = z.infer<typeof createOccasionSchema>;
export type CreateCustomItemInput = z.infer<typeof createCustomItemSchema>;
