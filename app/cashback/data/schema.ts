import { transactionSchema } from '@/app/transaction/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const cashbackSchema = z.object({
	id: z.number(),
	transaction: transactionSchema,
	amount: z.number().nullable().optional(),
	earnedAt: dateStringToDate.nullable().optional()
});

export type Cashback = z.infer<typeof cashbackSchema>;
