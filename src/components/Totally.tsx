import dayjs from 'dayjs';
import { ChevronRight, TrendingDown, TrendingUp } from 'lucide-react';

const Totally = () => {
  return (
    <>
      {/* Row 1 - Total Earnings */}
      <div className="relative col-span-1 h-full border border-gray-200 rounded-xl shadow-sm">
        <div className="h-full relative bg-black rounded-xl p-6 flex flex-col text-white">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 30%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)',
            }}
          />
          <div className="text-sm  mb-4">Total Earnings</div>
          <div className="text-2xl font-bold mb-1">₩450,000</div>
          <div className="flex items-center text-sm  font-semibold">
            <TrendingUp className="w-4 h-4 mr-1 text-rose-600" />
            <span className="text-rose-600">7%</span>
            <span className="mx-1">·</span> <span>prev month</span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-white text-sm font-medium">Jul 1 - {dayjs().format('MMM D')}, 2025</span>
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="relative col-span-1 h-full border border-gray-200 rounded-xl shadow-sm">
        <div className="h-full relative bg-white rounded-xl p-6 flex flex-col">
          <div className="text-sm text-gray-500 mb-4">Total Spending</div>
          <div className="text-2xl font-bold mb-1">₩450,000</div>
          <div className="flex items-center text-sm text-gray-400 font-semibold">
            <TrendingDown className="w-4 h-4 mr-1 text-blue-600" />
            <span className="text-blue-600">7%</span>
            <span className="mx-1">·</span> <span>prev month</span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-500 text-sm font-medium">Jul 1 - {dayjs().format('MMM D')}, 2025</span>
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="relative col-span-1 h-full border border-gray-200 rounded-xl shadow-sm">
        <div className="h-full relative bg-white rounded-xl p-6 flex flex-col">
          <div className="text-sm text-gray-500 mb-2">Total Income</div>
          <div className="text-2xl font-bold mb-1">₩250,000</div>
          <div className="flex items-center text-sm text-gray-400 font-semibold">
            <TrendingUp className="w-4 h-4 mr-1 text-rose-600" />
            <span className="text-rose-600">13%</span>
            <span className="mx-1">·</span> <span>prev month</span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-500 text-sm font-medium">Jul 1 - {dayjs().format('MMM D')}, 2025</span>
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1} />
          </div>
        </div>
      </div>
      <div className="relative col-span-1 h-full border border-gray-200 rounded-xl shadow-sm">
        <div className="h-full relative bg-white rounded-xl p-6 flex flex-col">
          <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
          <div className="text-2xl font-bold mb-1">₩950,000</div>
          <div className="flex items-center text-sm text-gray-400 font-semibold">
            <TrendingDown className="w-4 h-4 mr-1 text-blue-600" />
            <span className=" text-blue-600">7%</span>
            <span className="mx-1">·</span> <span>prev month</span>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gray-500 text-sm font-medium">Jul 1 - {dayjs().format('MMM D')}, 2025</span>
            <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Totally;
