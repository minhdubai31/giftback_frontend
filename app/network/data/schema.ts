import { z } from 'zod';

export const affiliateNetworkSchema = z.object({
	id: z.number(),
	name: z.string().optional(),
	url: z.string().optional(),
	authorizeToken: z.string().optional(),
	apiMap: z.object({
		getCampaignApi: z.string().nullable().optional(),
		getTransactionApi: z.string().nullable().optional(),
		getCampaignCommissionApi: z.string().nullable().optional(),
	}).optional().nullable(),
});

export type AffiliateNetwork = z.infer<typeof affiliateNetworkSchema>;
