import { customerSchema } from '@/app/customer/data/schema';
import { affiliateProgramSchema } from '@/app/program/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const transactionSchema = z.object({
	id: z.number(),
	user: customerSchema.nullable().optional(),
	program: affiliateProgramSchema.nullable().optional(),
	totalAmount: z.number().nullable().optional(),
	cashbackAmount: z.number().nullable().optional(),
	transactionDate: dateStringToDate.nullable().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
