import fetchExpenseInsights from '@/common/services/fetcher/expense';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import type { Expense } from '../types/expense';

export interface UseExpenseInsightStreamResult {
  insight: string;
  isLoading: boolean;
  isError: boolean;
  start: (expenses: Expense[]) => void;
  reset: () => void;
}

export function useExpenseInsightStream(): UseExpenseInsightStreamResult {
  const [insight, setInsight] = useState('');
  const [charQueue, setCharQueue] = useState<string[]>([]);
  const [streamComplete, setStreamComplete] = useState(false);

  const { mutate, isPending, isError, reset } = useMutation({
    mutationFn: async (expenses: Expense[]) => {
      setInsight('');
      setCharQueue([]);
      setStreamComplete(false);
      const result = await fetchExpenseInsights(expenses, (chunk) => {
        setInsight((prev) => prev + chunk);
        setCharQueue((prev) => [...prev, ...chunk.split('')]);
      });
      if (result && insight.length === 0) {
        setInsight(result);
      }
    },
  });

  // 타이핑 효과
  useEffect(() => {
    if (charQueue.length === 0) {
      if (!isPending && !isError && !streamComplete && insight) {
        setStreamComplete(true);
      }
      return;
    }
    const timer = setTimeout(() => {
      setInsight((prev) => prev + charQueue[0]);
      setCharQueue((prev) => prev.slice(1));
    }, 30);
    return () => clearTimeout(timer);
  }, [charQueue, isPending, isError, streamComplete, insight]);

  const start = useCallback(
    (expenses: Expense[]) => {
      setInsight('');
      setCharQueue([]);
      setStreamComplete(false);
      mutate(expenses);
    },
    [mutate]
  );

  return {
    insight,
    isLoading: isPending || (charQueue.length > 0 && !streamComplete),
    isError,
    start,
    reset,
  };
}
