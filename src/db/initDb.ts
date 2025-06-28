import { defaultCategories } from '@/common/constants/defaultCategories';
import { defaultExpenses } from '@/common/constants/defaultExpenses';
import { withTimestamps } from '@/common/utils/timestamp';
import { Budget } from '@/types/budget';
import { Category } from '@/types/category';
import { addBudgets, getAllBudgets } from './budgetDB';
import { addCategories, getAllCategories } from './categoryDB';
import { getAllExpenses, setExpense } from './expenseDB';

export async function initDb() {
  try {
    // 1. 카테고리
    let categories = await getAllCategories();
    if (!categories || categories.length === 0) {
      await addCategories(defaultCategories as Category[]);
      categories = await getAllCategories();
    }

    // 2. 예산
    let budgets = await getAllBudgets();
    if (!budgets || budgets.length === 0) {
      const defaultBudgets = categories.map((category) =>
        withTimestamps({
          title: category.name,
          goal: 0,
          category: [category],
          expenses: [],
          startAt: null,
          endAt: null,
        })
      );
      await addBudgets(defaultBudgets as Budget[]);
      budgets = await getAllBudgets();
    }

    // 3. 지출
    const expenses = await getAllExpenses();
    if (!expenses || expenses.length === 0) {
      const mappedExpenses = defaultExpenses.map((expense) => {
        const category = categories.find((c) => c.id === expense.category);
        return {
          ...withTimestamps(expense),
          category: category!,
          isHidden: false,
        };
      });
      await setExpense(mappedExpenses);
    }
  } catch (error) {
    console.error('initDb error', error);
  }
}
