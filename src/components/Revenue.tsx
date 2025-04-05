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
  console.log(data);
  return (
    <div className="col-span-3 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className='flex flex-col gap-2'>
          <h2 className="text-lg font-bold text-gray-900">Revenue</h2>
          <div className="flex items-center gap-2 font-inter">
            <h3 className="text-3xl font-bold text-gray-900">$528,976<span className="text-gray-400 text-2xl">.82</span></h3>
            <span className="px-2 py-1 text-xs font-medium bg-pink-600 text-white rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 15l8-8 8 8" />
              </svg>
              5.2%
            </span>
          </div>
          <div className="font-inter font-bold text-sm text-gray-500 flex items-center gap-2">
            <span>vs prev.</span>
            <span>$501,641.73</span>
            <span className="text-gray-400">Jun 1 - Aug 31, 2023</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Top sales card */}
          <div className="relative w-52 border border-gray-200 rounded-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[109%] bg-gray-100 rounded-xl"></div>
            <div className="relative bg-white rounded-xl p-4 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
              <div className="text-sm text-gray-500 mb-2">Top sales</div>
              <div className="text-2xl font-bold mb-2">72</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mikasa</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Best deal card */}
          <div className="relative w-52 border border-gray-200 rounded-xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[109%] bg-gray-200 rounded-xl"></div>
            <div className="relative bg-black rounded-xl p-4 shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]">
              <div className="text-sm text-gray-400 mb-2">Best deal</div>
              <div className="text-2xl font-bold text-white mb-2">$42,300</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">Rolf Inc.</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 