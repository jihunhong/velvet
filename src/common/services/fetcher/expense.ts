import { generateExpenseInsightsStream } from '@/common/services/ai';
import { getToday } from '@/common/utils/day';
import { Expense } from '@/types/expense';

const PREFIX_CACHE_KEY = 'expenseInsight';

const fetchExpenseInsights = async (expenses: Expense[], onChunk: (chunk: string) => void): Promise<string> => {
  const TODAY = getToday();
  const SUFFIX = process.env.NODE_ENV === 'development' ? expenses.length : expenses.map((expense) => expense.id).join('-');
  const CACHE_KEY = `${PREFIX_CACHE_KEY}-${SUFFIX}-${TODAY}`;
  const cachedDataJSON = localStorage.getItem(CACHE_KEY);

  // stream + 캐싱
  return new Promise<string>((resolve, reject) => {
    if (cachedDataJSON) {
      resolve(JSON.parse(cachedDataJSON).insight);
      return;
    }
    let fullText = '';
    generateExpenseInsightsStream(
      expenses,
      (chunk) => {
        fullText += chunk;
        onChunk(chunk);
      },
      () => {
        const dataToCache = {
          insight: fullText,
          timestamp: TODAY,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
        resolve(fullText);
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export default fetchExpenseInsights;
