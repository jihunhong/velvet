import { generateBudgetInsightStream } from '@/common/services/ai';
import { getToday } from '@/common/utils/day';
import { Budget } from '@/types/budget';

const PREFIX_CACHE_KEY = 'budgetInsight';

const fetchBudgetInsights = async (budget: Budget, onChunk: (chunk: string) => void): Promise<string> => {
  const TODAY = getToday();
  const SUFFIX = budget.title;
  const CACHE_KEY = `${PREFIX_CACHE_KEY}-${SUFFIX}-${TODAY}`;
  const cachedDataJSON = localStorage.getItem(CACHE_KEY);

  return new Promise<string>((resolve, reject) => {
    if (cachedDataJSON) {
      resolve(JSON.parse(cachedDataJSON).insights);
      return;
    }
    let fullText = '';
    generateBudgetInsightStream(
      budget,
      (chunk) => {
        fullText += chunk;
        onChunk(chunk);
      },
      () => {
        try {
          const dataToCache = {
            insights: fullText,
            timestamp: TODAY,
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
          resolve(fullText);
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
