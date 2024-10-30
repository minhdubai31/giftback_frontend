import { z } from 'zod';

export const BASE_URL = 'http://localhost:8080/api';

export const dateStringToDate = z
	.union([z.string(), z.date()])
	.transform((value) => (typeof value === 'string' ? new Date(value) : value));
