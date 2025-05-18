import { DBSchema, openDB } from 'idb';
import { Expense, ExpenseFormData, ExpenseRecord } from '../types/expense';

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
  console.log('IndexedDB 저장 성공:', { ...expense, id });
  return id;
}

export async function getAllExpenses(): Promise<ExpenseRecord[]> {
  const db = await getDB();
  return db.getAll('expenses') as Promise<ExpenseRecord[]>;
}
