import { CSSProperties, useMemo } from 'react';
import Dot from '../WeeklyDotChart/Dot';
import { calculateDots, formatCount } from '../WeeklyDotChart/utils';

export interface MonthlyDotChartProps {
  days: number[]; // 1일부터 말일까지 일별 데이터 (최대 31개)
  maxHeight?: CSSProperties['maxHeight'];
  containerClassName?: string;
  dotClassName?: string;
  dotColor: string;
}

const MonthlyDotChart: React.FC<MonthlyDotChartProps> = ({ days: data, containerClassName = '', dotClassName = '', dotColor, maxHeight = 80 }) => {
  // 1~31일까지 최대 31개만 사용
  const dailyData = useMemo(() => {
    const validData = data.slice(0, 31);
    return validData.map((amount, index) => ({
      day: index + 1,
      amount,
      dots: calculateDots(amount),
    }));
  }, [data]);

  return (
    <div className={`${containerClassName}`}>
      <div className="flex items-end justify-center gap-1 overflow-x-auto scrollbar-hide" style={{ maxHeight }}>
        {dailyData.map((day) => (
          <div key={day.day} className="flex flex-col items-center group relative min-w-[20px]" aria-label={`${day.day}일: ${day.amount}건`}>
            <div className="flex flex-col-reverse gap-1 mb-2">
              {Array.from({ length: day.dots }).map((_, dotIndex) => (
                <Dot key={dotIndex} dotColor={dotColor} dotClassName={dotClassName} />
              ))}
            </div>
            <span className="text-xs text-gray-400 mt-1">{day.day}</span>
            {/* 툴팁 */}
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
              <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {formatCount(day.amount)}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyDotChart;
