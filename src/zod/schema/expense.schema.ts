import { z } from 'zod';
import { budgetSchema } from './budget.schema';
import { categorySchema } from './category.schema';

export const expenseSchema = z.object({
  id: z.number().optional(),
  amount: z.number(),
  category: categorySchema,
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isHidden: z.boolean(),
  budgets: z.array(budgetSchema).optional(),
});

export type ExpenseZod = z.infer<typeof expenseSchema>;
