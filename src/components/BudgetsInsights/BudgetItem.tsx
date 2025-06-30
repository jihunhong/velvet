import { generateSubTitle, getStatusStyles } from '@/common/utils/percent';
import { useBudgetInsightStream } from '@/hooks/useBudgetInsightStream';
import { Ellipsis, TrendingUp } from 'lucide-react';
import { useEffect } from 'react';
import { getCategoryColor, housing } from '../../common/constants/expenseCategory';
import type { Budget } from '../../types/budget';
import WeeklyDotChart from '../WeeklyDotChart';

const BudgetItem = ({ budget }: { budget: Budget }) => {
  const { title, category } = budget;

  const { insight, start } = useBudgetInsightStream();

  useEffect(() => {
    if (budget) {
      start(budget);
    }
  }, [budget, start]);

  const totalExpense = budget.expenses.filter((e) => !e.isHidden).reduce((acc, e) => acc + e.amount, 0);
  const percent = Number(Math.round((totalExpense / budget.goal) * 100).toFixed(0));
  const subTitle = generateSubTitle(percent);

  const { status, txt, bg } = getStatusStyles(percent);

  return (
    <div className="rounded-lg grid grid-rows-[30px_70px_1fr] gap-6 h-full">
      <div className="flex items-center justify-between gap-2 header">
        <div className="flex items-center gap-2">
          <div className={`h-4 w-4 rounded-sm`} aria-hidden="true" style={{ backgroundColor: getCategoryColor(category?.[0]?.name) }} />
          <h3 className="font-semibold text-gray-800 text-xl text-shadow tracking-tight">{title}</h3>
        </div>
        <div>
          <Ellipsis className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-1 subtitle">
        <div className="flex items-center gap-2">
          <p className="text-3xl font-bold text-black">
            ₩102,240<span className="text-gray-400 text-2xl">.82</span>
          </p>
          <span className="px-2 py-1 text-xs font-small bg-rose-600 text-white rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            5.2%
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-1 opacity-80 text-shadow">{subTitle}</p>
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
        <div className="flex items-center justify-between gap-1 w-full">
          {insight.length > 0 ? (
            <p className="text-sm text-gray-600 text-shadow whitespace-pre-line">{insight}</p>
          ) : (
            // 스켈레톤 ui
            <div className="flex flex-col gap-1 w-full">
              <div className="w-[40%] h-4 bg-gray-200 rounded-md animate-pulse" />
              <div className="w-[60%] h-4 bg-gray-200 rounded-md animate-pulse" />
            </div>
          )}
          <WeeklyDotChart weeks={[2, 14, 0, 0, 24]} dotColor={housing} maxHeight="unset" />
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
