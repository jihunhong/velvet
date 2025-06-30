import { Expense } from '@/types/expense';
import dayjs from 'dayjs';
import { TimelineSection } from '.';

// 내일까지를 포함하는 최근 7일중 5일전부터 오늘까지
export const getTimelineRange = () => {
  return {
    startDate: dayjs().subtract(5, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
  };
};

export const getTimelineDays = () => {
  const { startDate } = getTimelineRange();
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(dayjs(startDate).add(i, 'day').format('YYYY-MM-DD'));
  }
  return days.map((date) => ({
    label: date,
    value: 0,
  }));
};

export const getExpenseTimeLine = (expenses: Expense[] = []) => {
  const inital = getTimelineDays();

  return expenses.reduce(
    (acc: TimelineSection[], expense) => {
      const date = dayjs(expense.updatedAt).format('YYYY-MM-DD');
      const exist = acc.find((item) => item.label === date);
      if (exist) {
        exist.value++;
      } else {
        acc.push({ label: date, value: 1 });
      }
      return acc;
    },
    inital as unknown as TimelineSection[]
  );
};

interface DailyCategoryData {
  id: number;
  count: number;
  category: string;
}

export const getDailyCategoryData = (expenses: Expense[] = [], targetDate: string): DailyCategoryData[] => {
  const filtered = expenses.filter((e) => dayjs(e.updatedAt).format('YYYY-MM-DD') === targetDate);
  const categoryMap: Record<string, number> = {};
  filtered.forEach((e) => {
    const cat = e.category?.name ?? '기타';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  return Object.entries(categoryMap).map(([category, count], idx) => ({
    id: idx + 1,
    count: Number(count),
    category,
  }));
};
