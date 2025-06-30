import fetchBudgetInsights from '@/common/services/fetcher/budget';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import type { Budget } from '../types/budget';

export interface UseBudgetInsightStreamResult {
  insight: string;
  isLoading: boolean;
  isError: boolean;
  start: (budget: Budget) => void;
  reset: () => void;
}

export function useBudgetInsightStream(): UseBudgetInsightStreamResult {
  const [insight, setInsight] = useState('');
  const [charQueue, setCharQueue] = useState<string[]>([]);
  const [streamComplete, setStreamComplete] = useState(false);

  const { mutate, isError, reset } = useMutation({
    mutationFn: async (budget: Budget) => {
      setInsight('');
      setCharQueue([]);
      setStreamComplete(false);
      const result = await fetchBudgetInsights(budget, (chunk) => {
        setInsight((prev) => prev + chunk);
        setCharQueue((prev) => [...prev, ...chunk.split('')]);
      });
      if (result && insight.length === 0) {
        setInsight(result);
      }
    },
  });

  return {
    insight,
    isLoading: charQueue.length > 0 && !streamComplete,
    isError,
    start: useCallback(mutate, [mutate]),
    reset,
  };
}
