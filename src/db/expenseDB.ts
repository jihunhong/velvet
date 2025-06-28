import dayjs from 'dayjs';
import { WITH_TIME_ZONE } from '../common/constants/dateFormat';
import { withTimestamps } from '../common/utils/timestamp';

import { DailyExpenseSummary, Expense, ExpenseFormData, ExpenseRecord } from '../types/expense';
import { getDB } from './velvetDB';

export const setExpense = async (expenses: Expense[]) => {
  const db = await getDB();
  const tx = db.transaction('expenses', 'readwrite');
  const store = tx.objectStore('expenses');
  expenses.forEach((expense) => {
    store.put(withTimestamps(expense));
  });
  await tx.done;
};

export const addExpense = async (expense: ExpenseFormData) => {
  const db = await getDB();
  const id = await db.add('expenses', { ...withTimestamps(expense) });
  return id;
};

export const getAllExpenses = async () => {
  const db = await getDB();
  return db.getAll('expenses') as Promise<ExpenseRecord[]>;
};

export const getExpensesByDate = async (date: string) => {
  const db = await getDB();
  return db.getAllFromIndex('expenses', 'by-updatedAt', date) as Promise<ExpenseRecord[]>;
};

export const getExpensesByDateRange = async ({ startDate, endDate }: Record<'startDate' | 'endDate', string>) => {
  const db = await getDB();
  const range = IDBKeyRange.bound(startDate, endDate);
  return db.getAllFromIndex('expenses', 'by-updatedAt', range) as Promise<ExpenseRecord[]>;
};

export const getCurrentMonthExpenses = async () => {
  const startDate = dayjs().startOf('month').format(WITH_TIME_ZONE);
  const endDate = dayjs().endOf('month').format(WITH_TIME_ZONE);
  return await getExpensesByDateRange({ startDate, endDate });
};

export const getRecentWeekDailySummary = async () => {
  const endDate = dayjs().format('2025-06-20');
  const startDate = dayjs().subtract(6, 'day').format(WITH_TIME_ZONE); // 오늘 포함 7일
  const expenses = await getExpensesByDateRange({ startDate, endDate });
  // 7일간의 모든 날짜를 먼저 생성 (데이터가 없는 날도 0으로 표시하기 위해)
  const dateRange: DailyExpenseSummary[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = dayjs(endDate).subtract(i, 'day').format(WITH_TIME_ZONE);
    dateRange.push({
      date,
      amount: 0,
      count: 0,
    });
  }
  expenses.forEach((expense) => {
    const dayIndex = dateRange.findIndex((day) => day.date === expense.updatedAt);
    if (dayIndex !== -1) {
      dateRange[dayIndex].amount += expense.amount;
      dateRange[dayIndex].count += 1;
    }
  });
  return dateRange;
};

export const getRecentWeekAmounts = async () => {
  const dailySummary = await getRecentWeekDailySummary();
  return dailySummary.map((day) => ({
    date: day.date,
    amount: day.amount,
  }));
};
