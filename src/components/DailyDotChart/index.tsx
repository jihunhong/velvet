import React from 'react';
import { getCategoryColor } from '../../common/constants/expenseCategory';
import Dot from '../WeeklyDotChart/Dot';

export interface DailyCategoryData {
  id: number;
  count: number;
  category: string;
}

interface DailyDotChartProps {
  data: DailyCategoryData[];
  dotClassName?: string;
  containerClassName?: string;
}

const GRID_SIZE = 5; // 5x5

const DailyDotChart: React.FC<DailyDotChartProps> = ({ data, dotClassName = '', containerClassName = '' }) => {
  // 최대 5개 카테고리만 사용, 5열 고정

  const dataMap = data.slice(0, GRID_SIZE).flatMap((item) => {
    return [Array.from({ length: item.count }).map(() => item.category)];
  });

  return (
    <div className={`flex items-end justify-end gap-1 h-full ${containerClassName}`}>
      {dataMap.map((categoryMap) =>
        categoryMap.map((category, idx) => <Dot key={idx} dotColor={getCategoryColor(category)} dotClassName={dotClassName} />)
      )}
    </div>
  );
};

export default DailyDotChart;
