import { getAllBudgets } from '@/db/budgetDB';
import { Budget } from '@/types/budget';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import BudgetItem from './BudgetItem';
import BudgetLoading from './BudgetLoading';

export default function BudgetsInsights() {
  const {
    isLoading,
    isError,
    error,
    data: budgets,
  } = useQuery<Budget[]>({
    queryKey: ['getAllBudgets'],
    queryFn: getAllBudgets,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = budgets?.length ?? 0;

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
  }, [budgets]);

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

  if (!budgets || budgets.length === 0) return null;

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
          <BudgetItem budget={budgets[currentIndex]} />
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
