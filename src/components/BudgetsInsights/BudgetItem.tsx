import { getDayForEng } from '@/common/utils/day';
import { getStatusStyles } from '@/common/utils/percent';
import { useBudgetInsightStream } from '@/hooks/useBudgetInsightStream';
import { AnimatePresence, motion } from 'framer-motion';
import { Ellipsis, Settings2, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { getCategoryColor } from '../../common/constants/expenseCategory';
import type { Budget } from '../../types/budget';
import BudgetLoading from './BudgetLoading';

const BudgetItem = ({ budget }: { budget: Budget }) => {
  const { title, category } = budget;

  const { insight, start } = useBudgetInsightStream();

  useEffect(() => {
    if (budget) {
      start(budget);
    }
  }, [budget, start]);

  const totalExpense = budget.expenses.filter((e) => !e.isHidden).reduce((acc, e) => acc + e.amount, 0);
  const percent = Number(Math.round((totalExpense / budget.goal) * 100).toFixed(1));
  const { status, txt, bg } = getStatusStyles(percent);

  return (
    <div className="rounded-lg grid grid-rows-[30px_70px_1fr] gap-2 h-full">
      <div className="flex items-center justify-between gap-2 header">
        <div className="flex items-center gap-2">
          <div className={`h-[14px] w-[14px] rounded-sm`} aria-hidden="true" style={{ backgroundColor: getCategoryColor(category?.[0]?.name) }} />
          <h3 className="font-semibold text-gray-800 text-base text-shadow tracking-tight">{title}</h3>
        </div>
        <div>
          <Ellipsis className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-1 subtitle">
        <div className="flex items-center gap-2">
          <p className="text-base font-bold text-gray-900 tracking-tight">
            ₩ {totalExpense.toLocaleString()}
            <span className="text-gray-400 text-sm ml-[4px]">원</span>
          </p>
          <span className="px-2 py-1 text-xs bg-pink-600 text-white rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {percent}%
          </span>
        </div>
        <div className="font-bold text-sm text-gray-500 flex items-center gap-2 cursor-pointer hover:underline">
          <span>planned · ₩{budget.goal.toLocaleString()}</span>
          <span className="text-gray-400">
            {getDayForEng(budget.startAt)} - {getDayForEng(budget.endAt)}
          </span>
          <Settings2 className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-start gap-6 body">
        <div className="w-full">
          <div className="relative w-full">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${bg} text-white`}>{status}</span>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold inline-block ${txt} text-shadow`}>{percent}%</span>
              </div>
            </div>
            <div className="flex rounded-full h-2 bg-gray-200">
              <div style={{ width: `${percent}%` }} className={`rounded-full ${bg} shadow-sm`}></div>
            </div>
          </div>
        </div>
        <AnimatePresence mode="wait">
          {insight.length > 0 ? (
            <motion.div
              key="content"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-between gap-1 w-full"
            >
              <motion.p
                initial={{ opacity: 0.1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-gray-600 whitespace-pre-line"
              >
                {insight}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div key="loading" initial={{ opacity: 0.1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: 10 }}>
              <BudgetLoading />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BudgetItem;
