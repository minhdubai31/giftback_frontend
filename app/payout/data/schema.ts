import { userSchema } from '@/app/user/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const payoutSchema = z.object({
	id: z.number(),
	user: userSchema,
	amount: z.number(),
	status: z.enum(['PENDING', 'COMPLETED', 'DENIED']).default('PENDING'),
	requestedAt: dateStringToDate.nullable().optional(),
	completedAt: dateStringToDate.nullable().optional(),
});

export type Payout = z.infer<typeof payoutSchema>;
