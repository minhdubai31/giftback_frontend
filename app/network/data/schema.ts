import { z } from 'zod';

export const affiliateNetworkSchema = z.object({
	id: z.number(),
	name: z.string(),
	url: z.string(),
	authorizeToken: z.string(),
	apiMap: z.object({
		getCampaignApi: z.string(),
		getProductApi: z.string(),
		getTransactionApi: z.string(),
	}),
});

export type AffiliateNetwork = z.infer<typeof affiliateNetworkSchema>;
