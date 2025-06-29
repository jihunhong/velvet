import { Budget } from '@/types/budget';
import { Expense } from '@/types/expense';
import { getDB } from './velvetDB';

export const getAllBudgets = async (): Promise<Budget[]> => {
  const db = await getDB();
  return db.getAllFromIndex('budgets', 'by-id') as Promise<Budget[]>;
};

export const addBudgets = async (budgets: Budget[]): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction('budgets', 'readwrite');
  for (const budget of budgets) {
    await tx.store.put(budget);
  }
  await tx.done;
};

export const addExpenseToBudget = async (expense: Expense, budgetId: number): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction('budgets', 'readwrite');
  const budget = await tx.store.get(budgetId);
  if (budget) {
    budget.expenses.push(expense);
    await tx.store.put(budget);
  }
};

export const getBudgetMap = async (): Promise<Record<number, Budget>> => {
  const db = await getDB();
  const budgets = await db.getAllFromIndex('budgets', 'by-id');
  return budgets.reduce(
    (acc, budget) => {
      acc[budget.id] = budget;
      return acc;
    },
    {} as Record<number, Budget>
  );
};
