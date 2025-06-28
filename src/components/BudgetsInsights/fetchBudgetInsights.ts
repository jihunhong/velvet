import { Budget } from '@/types/budget';
import { Expense } from '@/types/expense';
import { generateBudgetInsightsStream } from '../../common/services/ai';
import type { Insight } from '../../types/insight';

const CACHE_KEY = 'budgetInsightsCache';

const fetchBudgetInsights = async (expenses: Expense[], budgets: Budget[]): Promise<Insight[]> => {
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
      expenses,
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
