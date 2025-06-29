import { Category } from './category';
import { Expense } from './expense';

export interface Budget {
  id: number;
  title: string;
  description?: string;
  goal: number; // 목표 금액
  category: Category[];
  expenses: Expense[];
  createdAt: string;
  updatedAt: string;
  startAt: string | null; // 시작 날짜
  endAt: string | null; // 종료 날짜
}
