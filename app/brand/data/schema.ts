import { z } from 'zod';

export const brandSchema = z.object({
	id: z.number(),
	name: z.string(),
	description: z.string().optional().nullable(),
	logoPath: z.string().optional().nullable(),
});

export type Brand = z.infer<typeof brandSchema>;
