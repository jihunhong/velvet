import { Budget } from '@/types/budget';
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
