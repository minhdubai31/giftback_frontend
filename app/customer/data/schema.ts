import { z } from 'zod';
import { walletSchema } from '../wallet/schema';
import { dateStringToDate } from '@/constant/common';

export const customerSchema = z.object({
	id: z.number(),
	username: z.string(),
	name: z.string(),
	role: z.string().nullable().optional(),
	authProvider: z.string().nullable().optional(),
	group: z
		.object({
			id: z.number().nullable().optional(),
			name: z.string().nullable().optional(),
		})
		
		.nullable().optional(),
	notifications: z.array(z.object({})).nullable().optional(),
	wallet: walletSchema.nullable().optional(),
	createdAt: dateStringToDate.nullable().optional(),
	updatedAt: dateStringToDate.nullable().optional(),
	password: z.string().nullable().optional()
});

export type Customer = z.infer<typeof customerSchema>;
