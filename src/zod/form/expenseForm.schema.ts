import { z } from 'zod';

export const expenseFormSchema = z.object({
  description: z.string().min(1, '메모를 입력하세요'),
  amount: z
    .string()
    .min(1, '금액을 입력하세요')
    .regex(/^\d{1,3}(,\d{3})*|\d+$/, '숫자만 입력하세요'),
  category: z.coerce.number().min(1, '카테고리를 선택하세요'),
  date: z.string().min(1, '날짜를 선택하세요'),
  isHidden: z.boolean(),
  budgets: z.array(z.any()).optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseFormSchema>;
