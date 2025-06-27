import { budgets } from '../../../tests/budgets';
import { generateBudgetInsightsStream } from '../../common/services/ai';
import type { Expense } from '../../types/expense';
import type { Insight } from '../../types/insight';

const CACHE_KEY = 'budgetInsightsCache';
const mockExpenses: Expense[] = [
  { id: 1, amount: 25000, category: '교통', description: '주유', date: '2024-07-08' },
  { id: 2, amount: 88000, category: '식비', description: '주간 장보기', date: '2024-07-09' },
  { id: 3, amount: 150000, category: '쇼핑', description: '여름 옷 구매', date: '2024-07-10' },
  { id: 4, amount: 45000, category: '취미', description: '온라인 게임', date: '2024-07-11' },
  { id: 5, amount: 85000, category: '교통', description: '주유', date: '2024-07-15' },
  { id: 6, amount: 120000, category: '식비', description: '친구와 저녁', date: '2024-07-16' },
  { id: 7, amount: 75000, category: '건강', description: '병원 진료 및 약', date: '2024-07-17' },
  { id: 8, amount: 70000, category: '취미', description: '콘서트 티켓', date: '2024-07-18' },
];

const fetchBudgetInsights = async (): Promise<Insight[]> => {
  const cachedDataJSON = localStorage.getItem(CACHE_KEY);
  if (cachedDataJSON) {
    try {
      const cachedData = JSON.parse(cachedDataJSON);
      const cacheTimestamp = new Date(cachedData.timestamp);
      const today = new Date();
      if (cacheTimestamp.toDateString() === today.toDateString()) {
        return cachedData.insights;
      }
    } catch (e) {
      localStorage.removeItem(CACHE_KEY);
    }
  }
  return new Promise<Insight[]>((resolve, reject) => {
    generateBudgetInsightsStream(
      mockExpenses,
      budgets,
      () => {},
      (fullText) => {
        try {
          const cleanedText = fullText.replace(/```json\n?|```/g, '').trim();
          const parsedInsights = JSON.parse(cleanedText) as Insight[];
          const dataToCache = {
            insights: parsedInsights,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
          resolve(parsedInsights);
        } catch (e: any) {
          reject(new Error(`AI 응답 파싱 오류: ${e.message}`));
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export default fetchBudgetInsights;
