import { brandSchema } from '@/app/brand/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const affiliateProgramSchema = z.object({
	id: z.number(),
	brand: brandSchema, 
	programName: z.string(),
	commissionRate: z.number(),
	terms: z.string(),
	programUrl: z.string(),
	validFrom: dateStringToDate,
	validUntil: dateStringToDate,
});

export type AffiliateProgram = z.infer<typeof affiliateProgramSchema>;
