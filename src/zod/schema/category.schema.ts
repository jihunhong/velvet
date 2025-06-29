import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  value: z.string(),
  color: z.string(),
});
