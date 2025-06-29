import { z } from 'zod';
import { categorySchema } from './category.schema';

export const budgetSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  goal: z.number(),
  category: z.array(categorySchema),
  expenses: z.array(z.any()), // 순환 참조 방지용 any
  createdAt: z.string(),
  updatedAt: z.string(),
  startAt: z.string().nullable(),
  endAt: z.string().nullable(),
});
