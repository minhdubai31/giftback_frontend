import { z } from 'zod';
import { customerSchema } from '@/app/customer/data/schema';
import { dateStringToDate } from '@/constant/common';

export const groupSchema = z.object({
	id: z.number(),
	name: z.string(),
	owner: customerSchema,
	users: z.array(customerSchema.nullable().optional()).nullable().optional(),
	createdAt: dateStringToDate,
	updatedAt: dateStringToDate,
});

export type Group = z.infer<typeof groupSchema>;
