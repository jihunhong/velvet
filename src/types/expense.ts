export interface Expense {
  id?: number;
  amount: number;
  category: string;
  description: string;
  date: string;
}

// 저장용
export type ExpenseFormData = Omit<Expense, 'id'>;

// 조회용
export type ExpenseRecord = Required<Expense>;
