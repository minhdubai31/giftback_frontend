import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const walletSchema = z.object({
	id: z.number().optional().nullable(),
	balance: z.number().default(0).nullable().optional(),
	lastUpdated: dateStringToDate.nullable().optional()
});

export type Wallet = z.infer<typeof walletSchema>;
