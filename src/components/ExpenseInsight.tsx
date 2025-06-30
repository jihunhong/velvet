import { useExpenseInsightStream } from '@/hooks/useExpenseInsightStream';
import { useEffect } from 'react';

import type { Expense } from '../types/expense';

interface ExpenseInsightProps {
  expenses: Expense[];
}

export default function ExpenseInsight({ expenses }: ExpenseInsightProps) {
  const { insight, isLoading, isError, start } = useExpenseInsightStream();
  useEffect(() => {
    if (expenses.length > 0) {
      start(expenses);
    }
  }, [expenses]);

  if (isLoading && !insight) {
    return <span className="text-gray-500 text-sm font-medium animate-pulse">AI가 소비 내역을 분석 중입니다...</span>;
  }

  if (isError) {
    return <span className="text-red-500 text-sm font-medium">인사이트 생성 중 오류 발생</span>;
  }

  return <p className="text-gray-500 text-md whitespace-pre-wrap line-clamp-2">{insight}</p>;
}
