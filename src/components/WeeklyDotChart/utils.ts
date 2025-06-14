import { DailyCategoryData } from '../DailyDotChart';

export const calculateDots = (amount: number, division: number = 5): number => {
  if (amount === 0) return 1;

  const ratio = amount / division;
  const dots = Math.ceil(ratio);
  return dots;
};

export const formatCount = (count: number): string => {
  if (count === 0) return '소비 없음';
  return `${count}건`;
};

export const getValidDailyData = (data: DailyCategoryData[], division: number = 5) => {
  return data.map((item) => ({
    ...item,
    count: calculateDots(item.count, division),
  }));
};
