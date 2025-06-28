import * as budgetDB from './budgetDB';
import * as categoryDB from './categoryDB';
import { withErrorHandler } from './common';
import * as expenseDB from './expenseDB';

function wrapAllWithErrorHandler<T extends Record<string, any>>(obj: T): T {
  const wrapped: any = {};
  for (const key in obj) {
    if (typeof obj[key] === 'function') {
      wrapped[key] = withErrorHandler(obj[key]);
    } else {
      wrapped[key] = obj[key];
    }
  }
  return wrapped;
}

export const service = {
  expense: wrapAllWithErrorHandler(expenseDB),
  category: wrapAllWithErrorHandler(categoryDB),
  budget: wrapAllWithErrorHandler(budgetDB),
};
