import { brandSchema } from '@/app/brand/data/schema';
import { affiliateNetworkSchema } from '@/app/network/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const affiliateProgramSchema = z.object({
	id: z.number(),
	brand: brandSchema, 
	logo: z.string().optional().nullable(),
	programName: z.string(),
	commissionRate: z.string(),
	terms: z.string(),
	programUrl: z.string(),
	affiliateNetwork: affiliateNetworkSchema.nullable().optional(),
	validFrom: dateStringToDate.nullable().optional(),
	validUntil: dateStringToDate.nullable().optional(),
});

export type AffiliateProgram = z.infer<typeof affiliateProgramSchema>;
