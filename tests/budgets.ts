import { food, health, hobby, housing, saving, shopping, transportation } from '../src/common/constants/categoryName';

export const budgets = [
  {
    name: '주거비',
    category: housing,
    amount: 360,
    goal: 3000,
  },
  {
    name: '식비',
    category: food,
    amount: 760,
    goal: 2000,
  },
  {
    name: '교통비',
    category: transportation,
    amount: 8100,
    goal: 3200,
  },
  {
    name: '의료,건강',
    category: health,
    amount: 3400,
    goal: 7200,
  },
  {
    name: '취미,여가',
    category: hobby,
    amount: 4100,
    goal: 5300,
  },
  {
    name: '쇼핑',
    category: shopping,
    amount: 4100,
    goal: 5300,
  },
  {
    name: '저축,투자',
    category: saving,
    amount: 4100,
    goal: 5300,
  },
];
