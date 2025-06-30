import dayjs from 'dayjs';
import { END_TIME_ZONE, START_TIME_ZONE, WITH_TIME_ZONE } from '../common/constants/dateFormat';
import { withTimestamps } from '../common/utils/timestamp';

import { Expense, ExpenseFormData, ExpenseRecord } from '../types/expense';
import { getDB } from './velvetDB';

export const setExpense = async (expenses: Expense[]) => {
  const db = await getDB();
  const tx = db.transaction('expenses', 'readwrite');
  const store = tx.objectStore('expenses');
  expenses.forEach((expense) => {
    store.put(expense);
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
  const start = dayjs(startDate).format(START_TIME_ZONE);
  const end = dayjs(endDate).format(END_TIME_ZONE);
  const range = IDBKeyRange.bound(start, end);
  return db.getAllFromIndex('expenses', 'by-updatedAt', range) as Promise<ExpenseRecord[]>;
};

export const getCurrentMonthExpenses = async () => {
  const startDate = dayjs().startOf('month').format(WITH_TIME_ZONE);
  const endDate = dayjs().endOf('month').format(WITH_TIME_ZONE);
  return await getExpensesByDateRange({ startDate, endDate });
};

export const getWeeklyExpenses = async () => {
  const startDate = dayjs().startOf('week').format(WITH_TIME_ZONE);
  const endDate = dayjs().endOf('week').format(WITH_TIME_ZONE);
  return await getExpensesByDateRange({ startDate, endDate });
};
