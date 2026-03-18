import { z } from 'zod';

const deliveryAddressSchema = z.object({
  street: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().default('Nigeria'),
  postalCode: z.string().optional(),
});

export const createOrderSchema = z.object({
  bundleId: z.string().cuid().optional(),
  items: z.array(z.object({
    customItemId: z.string().cuid(),
    quantity: z.number().int().positive(),
  })).optional(),
  recipientName: z.string().min(2).max(100),
  recipientPhone: z.string().min(7).max(20),
  deliveryAddress: deliveryAddressSchema,
  personalMessage: z.string().max(500).optional(),
  specialInstructions: z.string().max(500).optional(),
  preferredDeliveryDate: z.string().datetime().optional(),
  currency: z.enum(['CAD', 'USD', 'GBP']),
}).refine(data => data.bundleId || (data.items && data.items.length > 0), {
  message: 'Order must include either a bundle or at least one custom item',
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
  adminNotes: z.string().max(1000).optional(),
});

export const assignVendorSchema = z.object({
  vendorId: z.string().cuid(),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
