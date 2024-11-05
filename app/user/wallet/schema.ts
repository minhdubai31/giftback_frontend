import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const walletSchema = z.object({
	id: z.number().optional(),
	balance: z.number().default(0),
	lastUpdated: dateStringToDate.nullable().optional()
});

export type Wallet = z.infer<typeof walletSchema>;
