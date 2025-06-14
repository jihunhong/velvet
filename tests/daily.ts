import { categoryColors } from '../src/common/constants/expenseCategory';

export const getDailyData = () => {
  const startIndex = Math.floor(Math.random() * 5);

  const randomData = Object.keys(categoryColors)
    .slice(startIndex, Object.keys(categoryColors).length)
    .map((category, idx) => ({
      id: idx + 1,
      count: Math.floor(Math.random() * 25),
      category: category,
    }));
  return randomData;
};
