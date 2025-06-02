import dayjs from 'dayjs';
import { DBSchema, openDB } from 'idb';
import { DailyExpenseSummary, Expense, ExpenseFormData, ExpenseRecord } from '../types/expense';

interface ExpenseDB extends DBSchema {
  expenses: {
    key: number;
    value: Expense;
    indexes: { 'by-date': string };
  };
}

export const getDB = () =>
  openDB<ExpenseDB>('expense-db', 1, {
    upgrade(db) {
      const store = db.createObjectStore('expenses', {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('by-date', 'date');
    },
  });

export async function addExpense(expense: ExpenseFormData) {
  const db = await getDB();
  const id = await db.add('expenses', { ...expense });
  return id;
}

export async function getAllExpenses(): Promise<ExpenseRecord[]> {
  const db = await getDB();
  return db.getAll('expenses') as Promise<ExpenseRecord[]>;
}

export async function getExpensesByDate(date: string): Promise<ExpenseRecord[]> {
  const db = await getDB();
  return db.getAllFromIndex('expenses', 'by-date', date) as Promise<ExpenseRecord[]>;
}

export async function getExpensesByDateRange({ startDate, endDate }: Record<'startDate' | 'endDate', string>): Promise<ExpenseRecord[]> {
  const db = await getDB();
  const range = IDBKeyRange.bound(startDate, endDate);
  return db.getAllFromIndex('expenses', 'by-date', range) as Promise<ExpenseRecord[]>;
}

export async function getCurrentMonthExpenses(): Promise<ExpenseRecord[]> {
  const startDate = dayjs().startOf('month').format('YYYY-MM-DD');
  const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

  return getExpensesByDateRange({ startDate, endDate });
}

export async function getRecentWeekDailySummary(): Promise<DailyExpenseSummary[]> {
  const endDate = dayjs().format('2025-06-20');
  const startDate = dayjs().subtract(6, 'day').format('YYYY-MM-DD'); // 오늘 포함 7일

  const expenses = await getExpensesByDateRange({ startDate, endDate });

  // 7일간의 모든 날짜를 먼저 생성 (데이터가 없는 날도 0으로 표시하기 위해)
  const dateRange: DailyExpenseSummary[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = dayjs(endDate).subtract(i, 'day').format('YYYY-MM-DD');
    dateRange.push({
      date,
      amount: 0,
      count: 0,
    });
  }

  expenses.forEach((expense) => {
    const dayIndex = dateRange.findIndex((day) => day.date === expense.date);
    if (dayIndex !== -1) {
      dateRange[dayIndex].amount += expense.amount;
      dateRange[dayIndex].count += 1;
    }
  });

  return dateRange;
}

// 간단한 버전 - 날짜와 총 금액만
export async function getRecentWeekAmounts(): Promise<{ date: string; amount: number }[]> {
  const dailySummary = await getRecentWeekDailySummary();

  return dailySummary.map((day) => ({
    date: day.date,
    amount: day.amount,
  }));
}
