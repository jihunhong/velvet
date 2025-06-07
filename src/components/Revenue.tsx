import { ChevronDown, ChevronRight, TrendingUp } from 'lucide-react';
import RateCard from './RateCard';

interface RevenueData {
  date: string;
  revenue: number;
  leads: number;
  deals: number;
}

interface RevenueProps {
  data: RevenueData[];
}

export default function Revenue({ data = [] }: RevenueProps) {
  return (
    <div className="col-span-3 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-gray-900">Expense</h2>
          <div className="flex items-center gap-2">
            <h3 className="text-3xl font-bold text-gray-900">
              ₩624,730<span className="text-gray-400 text-2xl">.82</span>
            </h3>
            <span className="px-2 py-1 text-xs font-medium bg-pink-600 text-white rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              5.2%
            </span>
          </div>
          <div className="font-bold text-sm text-gray-500 flex items-center gap-2">
            <span>vs prev.</span>
            <span>₩1,124,730</span>
            <span className="text-gray-400">Jun 1 - Aug 31, 2023</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Account card */}
          <div className="relative w-52 border border-gray-200 rounded-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[109%] bg-gray-100 rounded-xl"></div>
            <div className="relative bg-white rounded-xl p-4 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
              <div className="text-sm text-gray-500 mb-2">Accounts</div>
              <div className="text-2xl font-bold mb-2">₩324,730</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">unknown bank</span>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* Top expense card */}
          <div className="relative w-52 border border-gray-200 rounded-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[109%] bg-gray-200 rounded-xl"></div>
            <div className="relative bg-black rounded-xl p-4 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
              <div className="text-sm text-gray-400 mb-2">Top expense</div>
              <div className="text-2xl font-bold text-white mb-2">147.3</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Macbook Air</span>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* Rate cards */}
          <div className="flex gap-2">
            <RateCard label="Count" value="256" rate={-5} />
            <RateCard label="Amount" value="528k" rate={7.9} />
            <RateCard label="Rate" value="44%" rate={1.2} />
          </div>
        </div>
      </div>
    </div>
  );
}
