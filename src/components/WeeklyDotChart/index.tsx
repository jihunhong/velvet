import { CSSProperties, useMemo } from 'react';
import Dot from './Dot';
import { calculateDots, formatCount } from './utils';

interface WeeklyDotChartProps {
  weeks: number[]; // 주차별 소비 건수 배열 (최대 5개)
  maxHeight?: CSSProperties['maxHeight'];
  containerClassName?: string;
  dotClassName?: string;
  dotColor: string;
}

const WeeklyDotChart: React.FC<WeeklyDotChartProps> = ({ weeks: data, containerClassName = '', dotClassName = '', dotColor }) => {
  const weeklyData = useMemo(() => {
    const validData = data.slice(0, 5);

    return validData.map((amount, index) => ({
      week: index + 1,
      amount,
      dots: calculateDots(amount),
    }));
  }, [data]);

  return (
    <div className={`${containerClassName}`}>
      <div className="flex items-end justify-center gap-1 h-20">
        {weeklyData.map((week, index) => (
          <div key={week.week} className="flex flex-col items-center group relative">
            <div className="flex flex-col-reverse gap-1 mb-3">
              {week.dots === 0 ? (
                <Dot dotColor="#dadada" dotClassName={dotClassName} />
              ) : (
                Array.from({ length: week.dots }).map((_, dotIndex) => <Dot key={dotIndex} dotColor={dotColor} dotClassName={dotClassName} />)
              )}
            </div>

            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none  z-10">
              <div className="relative bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                {`${index + 1}주차 - ${formatCount(week.amount)}`}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyDotChart;
