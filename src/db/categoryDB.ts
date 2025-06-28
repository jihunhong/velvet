import { Category } from '../types/category';
import { getDB } from './velvetDB';

export const getAllCategories = async (): Promise<Category[]> => {
  const db = await getDB();
  return db.getAllFromIndex('categories', 'by-id') as Promise<Category[]>;
};

export const getCategoryMap = async (): Promise<Record<number, Category>> => {
  const db = await getDB();
  const categories = await db.getAllFromIndex('categories', 'by-id');
  return categories.reduce(
    (acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    },
    {} as Record<number, Category>
  );
};

export const addCategories = async (categories: Category[]): Promise<void> => {
  const db = await getDB();
  const tx = db.transaction('categories', 'readwrite');
  for (const cat of categories) {
    await tx.store.put(cat);
  }
  await tx.done;
};
