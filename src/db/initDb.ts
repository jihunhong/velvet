import { defaultBudgets } from '@/common/constants/defaultBudgets';
import { defaultCategories } from '@/common/constants/defaultCategories';
import { defaultExpenses } from '@/common/constants/defaultExpenses';
import { Budget } from '@/types/budget';
import { Category } from '@/types/category';
import { addBudgets, addExpenseToBudget, getAllBudgets } from './budgetDB';
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

    let initAddedBudgets = false;
    // 2. 예산
    const budgets = await getAllBudgets();
    if (!budgets || budgets.length === 0) {
      await addBudgets(defaultBudgets as Budget[]);
      initAddedBudgets = true;
    }

    // 3. 지출
    let expenses = await getAllExpenses();
    if (!expenses || expenses.length === 0) {
      await setExpense(defaultExpenses);
      expenses = await getAllExpenses();
    }

    if (initAddedBudgets) {
      for (const expense of expenses) {
        for (const budget of expense.budgets) {
          await addExpenseToBudget(expense, budget.id);
        }
      }
    }

    await setExpense(expenses);
  } catch (error) {
    console.error('initDb error', error);
  }
}
