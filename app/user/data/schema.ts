import { z } from 'zod';
import { walletSchema } from '../wallet/schema';
import { dateStringToDate } from '@/constant/common';

export const userSchema = z.object({
	id: z.number(),
	username: z.string().nullable().optional(),
	name: z.string().nullable().optional(),
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
	bankName: z.string().nullable().optional(),
	bankAccountNumber: z.string().nullable().optional(),
	createdAt: dateStringToDate.nullable().optional(),
	updatedAt: dateStringToDate.nullable().optional(),
	password: z.string().nullable().optional()
});

export type User = z.infer<typeof userSchema>;
