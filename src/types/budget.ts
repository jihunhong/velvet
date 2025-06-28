import { Category } from './category';
import { Expense } from './expense';

export interface Budget {
  title: string;
  goal: number;
  category: Category[];
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
  startAt: string | null; // 시작 날짜
  endAt: string | null; // 종료 날짜
}
