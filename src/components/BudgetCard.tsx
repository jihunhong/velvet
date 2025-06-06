import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { categoryColors } from '../common/constants/expenseCategory';

export interface BudgetCardProps {
  title: string;
  amount: number;
  percent: number;
  budget: number;
  category: string;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ title = 'Housing', amount, percent, budget, category }) => {
  const [showPercent, setShowPercent] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPercent((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="flex-shrink-0 rounded-2xl py-3 px-3 w-32 h-32 flex flex-col relative overflow-hidden shadow-md"
      style={{
        backgroundImage: "url('/pattern.svg')",
        backgroundSize: 'cover',
        backgroundBlendMode: 'lighten',
        backgroundColor: categoryColors[category],
      }}
    >
      <span className="mb-3 text-sm font-semibold text-white drop-shadow">{title}</span>
      <span className="text-xl font-bold text-white drop-shadow tracking-tight">$ {amount.toFixed(2)}</span>

      {/* framer-motion 슬라이드 애니메이션 */}
      <div className="flex relative h-6 overflow-hidden mt-auto items-center">
        <AnimatePresence mode="wait">
          {showPercent ? (
            <motion.span
              key="percent"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute left-0 right-0 rounded-full px-2 py-1 w-min h-full bg-white/20 text-white text-xs font-bold text-nowrap"
            >
              {percent.toFixed()}%
            </motion.span>
          ) : (
            <motion.span
              key="budget"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute left-0 right-0 rounded-full px-2 py-1 w-min h-full bg-white/20 text-white text-xs font-bold text-nowrap"
            >
              $ {budget.toFixed(2)}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
