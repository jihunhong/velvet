import { Ellipsis, TrendingUp } from 'lucide-react';
import { getCategoryColor, housing } from '../../common/constants/expenseCategory';
import type { Insight } from '../../types/insight';
import WeeklyDotChart from '../WeeklyDotChart';

const InsightItem = ({ insight }: { insight: Insight }) => {
  const { title, subTitle, description, category } = insight;
  const percent = 83;
  const getStatusStyles = (percent: number) => {
    if (percent >= 100) return { status: 'Over', txt: 'text-red-400', bg: 'bg-red-400' };
    if (percent > 90) return { status: 'High', txt: 'text-orange-400', bg: 'bg-orange-400' };
    if (percent > 80) return { status: 'Medium', txt: 'text-amber-400', bg: 'bg-amber-400' };
    return { status: 'Low', txt: 'text-emerald-400', bg: 'bg-emerald-400' };
  };
  const { status, txt, bg } = getStatusStyles(percent);

  return (
    <div className="rounded-lg grid grid-rows-[30px_70px_1fr] gap-6 h-full">
      <div className="flex items-center justify-between gap-2 header">
        <div className="flex items-center gap-2">
          <div className={`h-4 w-4 rounded-sm`} aria-hidden="true" style={{ backgroundColor: getCategoryColor(category) }} />
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
          <ul className="flex flex-col gap-1 list-disc pl-4">
            {description.map((d) => (
              <li key={d}>
                <p className="text-sm text-gray-600 text-shadow">{d}</p>
              </li>
            ))}
          </ul>
          <WeeklyDotChart weeks={[2, 14, 0, 0, 24]} dotColor={housing} maxHeight="unset" />
        </div>
      </div>
    </div>
  );
};

export default InsightItem;
