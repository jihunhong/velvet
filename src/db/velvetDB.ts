import { Budget } from '@/types/budget';
import { DBSchema, openDB } from 'idb';
import { Category } from '../types/category';
import { Expense } from '../types/expense';
import { DB_NAME, DB_VERSION } from './common';

export interface VelvetDB extends DBSchema {
  expenses: {
    key: number;
    value: Expense;
    indexes: { 'by-updatedAt': string; 'by-id': number };
  };
  categories: {
    key: number;
    value: Category;
    indexes: { 'by-id': number };
  };
  budgets: {
    key: number;
    value: Budget;
    indexes: { 'by-id': number };
  };
}

export const getDB = () =>
  openDB<VelvetDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('expenses')) {
        const store = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by-updatedAt', 'updatedAt');
      }
      if (!db.objectStoreNames.contains('categories')) {
        const store = db.createObjectStore('categories', { keyPath: 'id' });
        store.createIndex('by-id', 'id');
      }
      if (!db.objectStoreNames.contains('budgets')) {
        const store = db.createObjectStore('budgets', { keyPath: 'id', autoIncrement: true });
        store.createIndex('by-id', 'id');
      }
    },
  });
