import { brandSchema } from '@/app/brand/data/schema';
import { affiliateNetworkSchema } from '@/app/network/data/schema';
import { dateStringToDate } from '@/constant/common';
import { z } from 'zod';

export const affiliateProgramSchema = z.object({
	id: z.number(),
	logo: z.string().optional().nullable(),
	programName: z.string().nullable().optional(),
	commissionRate: z.string().nullable().optional(),
	terms: z.string().nullable().optional(),
	programUrl: z.string().nullable().optional(),
	affiliateNetwork: affiliateNetworkSchema.nullable().optional(),
	validFrom: dateStringToDate.nullable().optional(),
	validUntil: dateStringToDate.nullable().optional(),
});

export type AffiliateProgram = z.infer<typeof affiliateProgramSchema>;
