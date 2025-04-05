import {format} from 'date-fns';
import Revenue from './Revenue';

interface DashboardProps {
  timeframe: {
    start: Date;
    end: Date;
  };
  onTimeframeChange: (timeframe: { start: Date; end: Date }) => void;
}

const mockData = [
  { date: '1월', revenue: 4500000, leads: 2800000, deals: 1700000 },
  { date: '2월', revenue: 4800000, leads: 3100000, deals: 1700000 },
  { date: '3월', revenue: 4600000, leads: 2900000, deals: 1700000 },
  { date: '4월', revenue: 4700000, leads: 3000000, deals: 1700000 },
];

export default function Dashboard({ timeframe, onTimeframeChange }: DashboardProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 space-y-6 w-full">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-400 opacity-70">New report</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select 
              className="appearance-none px-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm cursor-pointer"
              value={`${format(timeframe.start, 'MMM d')} - ${format(timeframe.end, 'MMM d, yyyy')}`}
              onChange={() => onTimeframeChange(timeframe)}
            >
              <option>{format(timeframe.start, 'MMM d')} - {format(timeframe.end, 'MMM d, yyyy')}</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Revenue 컴포넌트 */}
        <Revenue data={mockData} />
      </div>

    </div>
  );
} 