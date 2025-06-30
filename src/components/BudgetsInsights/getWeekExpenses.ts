import { getToday, getWeeksInMonth } from '@/common/utils/day';
import { Expense } from '@/types/expense';
import dayjs from 'dayjs';

/**
 * 이번 달 각 주별 소비 내역 개수를 반환
 * @param expenses
 * @returns number[] (각 주별 소비 개수)
 */
export function getWeeklyExpenseCounts(expenses: Expense[]): number[] {
  const today = getToday();
  const weekCount = getWeeksInMonth(today);
  const startOfMonth = dayjs(today).startOf('month');

  // 각 주별로 카운트 초기화
  const weekCounts = Array(weekCount).fill(0);

  expenses.forEach((expense) => {
    const expenseDate = dayjs(expense.updatedAt);
    // 이번 달에 속하는 지 확인
    if (expenseDate.isSame(startOfMonth, 'month')) {
      // 몇번째 주인지 계산 (1-based)
      const week = Math.floor(expenseDate.diff(startOfMonth, 'day') / 7);
      if (week >= 0 && week < weekCount) {
        weekCounts[week]++;
      }
    }
  });

  return weekCounts;
}
