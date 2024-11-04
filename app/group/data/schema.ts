import { z } from 'zod';
import { customerSchema } from '@/app/customer/data/schema';
import { dateStringToDate } from '@/constant/common';

export const groupSchema = z.object({
	id: z.number(),
	name: z.string(),
	owner: z.object({
		id: z.number().nullable().optional(),
		name: z.string().nullable().optional(),
	}),
	users: z.array(customerSchema.nullable().optional()).nullable().optional(),
	walletBalance: z.number().optional().nullable(),
	createdAt: dateStringToDate.nullable().optional(),
	updatedAt: dateStringToDate.nullable().optional(),
});

export type Group = z.infer<typeof groupSchema>;
