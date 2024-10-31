import { z } from 'zod';
import { dateStringToDate } from '@/constant/common';

export const notificationSchema = z.object({
	message: z.string(),
	seen: z.number().nullable().optional(),
	createdAt: dateStringToDate.nullable().optional(),
});

export type Notification = z.infer<typeof notificationSchema>;
