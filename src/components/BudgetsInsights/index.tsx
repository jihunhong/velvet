import { getAllBudgets } from '@/db/budgetDB';
import { Budget } from '@/types/budget';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { Insight } from '../../types/insight';
import BudgetLoading from './BudgetLoading';
import fetchBudgetInsights from './fetchBudgetInsights';
import InsightItem from './InsightItem';

export default function BudgetsInsights() {
  const { data: budgets } = useQuery<Budget[]>({
    queryKey: ['getAllBudgets'],
    queryFn: getAllBudgets,
  });

  const {
    data: insights,
    isLoading,
    isError,
    error,
  } = useQuery<Insight[], Error>({
    queryKey: ['budgetInsights'],
    queryFn: () => {
      if (!budgets) throw new Error('Should not happen');
      return fetchBudgetInsights(budgets);
    },
    staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 fresh 상태로 유지
    refetchOnWindowFocus: false,
    enabled: !!budgets,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = insights?.length ?? 0;

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  }, [total]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.deltaY > 0) goNext();
      else if (e.deltaY < 0) goPrev();
    },
    [goNext, goPrev]
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [insights]);

  if (isLoading) {
    return <BudgetLoading />;
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-2">
        <p className="text-2xl">⚠️</p>
        <p className="font-semibold">오류 발생</p>
        <p className="text-xs">{error?.message}</p>
      </div>
    );
  }

  if (!insights || insights.length === 0) return null;

  return (
    <div className="relative h-full overflow-hidden py-2 px-4 w-full items-center flex flex-col gap-4" onWheel={handleWheel} tabIndex={0}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="w-full"
        >
          <InsightItem insight={insights[currentIndex]} />
        </motion.div>
      </AnimatePresence>
      <div className="footer w-full">
        <section className="flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-full border border-gray-700 bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === 0}
              onClick={goPrev}
            >
              <ChevronUp className="w-4 h-4 text-gray-600" />
            </button>
            <button
              className="p-1 rounded-full border border-gray-700 bg-white hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentIndex === total - 1}
              onClick={goNext}
            >
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
