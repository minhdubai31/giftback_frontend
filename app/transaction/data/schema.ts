import { userSchema } from '@/app/user/data/schema';
import { affiliateProgramSchema } from '@/app/program/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const transactionSchema = z.object({
	id: z.number(),
	user: userSchema.nullable().optional(),
	program: affiliateProgramSchema.nullable().optional(),
	totalAmount: z.number().nullable().optional(),
	cashbackAmount: z.number().nullable().optional(),
	transactionDate: dateStringToDate.nullable().optional(),
	productImage: z.string().nullable().optional(),
	productName: z.string().nullable().optional(),
	reasonReject: z.string().nullable().optional(),
});

export type Transaction = z.infer<typeof transactionSchema>;
