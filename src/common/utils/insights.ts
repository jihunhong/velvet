import { endOfWeek, parseISO, startOfWeek, subWeeks } from 'date-fns';
import type { Budget } from '../../types/budget';
import type { Expense } from '../../types/expense';

export interface Insight {
  id: string;
  type: 'overspending' | 'warning' | 'surge' | 'saving';
  message: string;
  icon: string;
}

const CATEGORY_EMOJI: Record<string, string> = {
  교통: '🚗',
  건강: '💊',
  취미: '🎮',
  식비: '🍔',
  쇼핑: '🛍️',
  주거: '🏠',
  기타: '💸',
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
};

export const generateInsights = (expenses: Expense[], budgets: Budget[], today: Date = new Date()): Insight[] => {
  const insights: Insight[] = [];

  // 1. 예산 기반 분석
  budgets.forEach((budget) => {
    const relevantExpenses = expenses.filter((e) => e.category === budget.category && parseISO(e.date) <= today);
    const totalSpent = relevantExpenses.reduce((sum, e) => sum + e.amount, 0);
    const usage = (totalSpent / budget.amount) * 100;

    if (usage >= 100) {
      insights.push({
        id: `overspending-${budget.id}`,
        type: 'overspending',
        message: `${CATEGORY_EMOJI[budget.category] || '💰'} ${
          budget.category
        } ${usage.toFixed(0)}% 초과 (+${formatCurrency(totalSpent - budget.amount)})`,
        icon: CATEGORY_EMOJI[budget.category] || '💰',
      });
    } else if (usage >= 90) {
      insights.push({
        id: `warning-${budget.id}`,
        type: 'warning',
        message: `${CATEGORY_EMOJI[budget.category] || '💰'} ${
          budget.category
        } 예산 ${usage.toFixed(0)}% 도달 (${formatCurrency(budget.amount - totalSpent)} 남음)`,
        icon: CATEGORY_EMOJI[budget.category] || '💰',
      });
    }
  });

  // 2. 주간 지출 급증 분석
  const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const lastWeekStart = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });

  const expensesByCategory: Record<string, { currentWeek: number; lastWeek: number }> = {};

  expenses.forEach((expense) => {
    const expenseDate = parseISO(expense.date);
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = { currentWeek: 0, lastWeek: 0 };
    }

    if (expenseDate >= currentWeekStart && expenseDate <= today) {
      expensesByCategory[expense.category].currentWeek += expense.amount;
    } else if (expenseDate >= lastWeekStart && expenseDate <= lastWeekEnd) {
      expensesByCategory[expense.category].lastWeek += expense.amount;
    }
  });

  for (const category in expensesByCategory) {
    const { currentWeek, lastWeek } = expensesByCategory[category];
    if (currentWeek > 0 && lastWeek > 0) {
      const increase = ((currentWeek - lastWeek) / lastWeek) * 100;
      if (increase >= 30) {
        insights.push({
          id: `surge-${category}`,
          type: 'surge',
          message: `${CATEGORY_EMOJI[category] || '📈'} ${category} 이번 주 급증 (+${increase.toFixed(0)}%)`,
          icon: CATEGORY_EMOJI[category] || '📈',
        });
      }
    }
  }

  // TODO: 절약 성과 감지 로직 추가

  return insights;
};
