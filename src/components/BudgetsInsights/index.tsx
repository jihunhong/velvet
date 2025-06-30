import { getAllBudgets } from '@/db/budgetDB';
import { Budget } from '@/types/budget';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
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
    <>
      <div
        className="relative h-full py-2 px-4 w-90 items-center flex flex-col gap-4 border border-gray-200 rounded-md bg-white z-[1]"
        onWheel={handleWheel}
        tabIndex={0}
      >
        {/* TODO :: prev, next 버튼 없앨까? */}
        {/* <div className="header w-full absolute top-0 right-0">
        <section className="flex items-start justify-end">
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              disabled={currentIndex === 0}
              onClick={goPrev}
            >
              <ChevronUp className="w-5 h-5 text-gray-700" />
            </button>
            <button
              className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              disabled={currentIndex === total - 1}
              onClick={goNext}
            >
              <ChevronDown className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </section>
      </div> */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full  min-h-[289px]  p-4"
          >
            <BudgetItem budget={budgets[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[99%] h-[97.5%] bg-gray-100 rounded-lg z-[0]"></div>
    </>
  );
}
