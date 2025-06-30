import { getExpensesByDateRange } from '@/db/expenseDB';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { isSaturday, isSunday } from '../../common/utils/day';
import DailyDotChart from '../DailyDotChart';
import { getValidDailyData } from '../WeeklyDotChart/utils';
import { getDailyCategoryData, getExpenseTimeLine, getTimelineRange } from './calc';
import Ticks from './Ticks';

export interface TimelineSection {
  label: string;
  value: number;
}

export interface HorizontalTimelineProps {
  spacing?: number;
  containerClassName?: string;
}

// 실제 일별 카테고리별 소비 데이터 생성 함수

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ spacing = 12, containerClassName = '' }) => {
  const { startDate, endDate } = getTimelineRange();
  const { data: expenses } = useQuery({
    queryKey: ['getExpensesByDateRange', startDate, endDate],
    queryFn: () =>
      getExpensesByDateRange({
        startDate,
        endDate,
      }),
  });

  const timeLine = getExpenseTimeLine(expenses);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        setContainerWidth(width);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const gridClass = ['flex justify-start w-full h-full', containerClassName].filter(Boolean).join(' ');

  // 각 섹션이 컨테이너 전체 너비를 채우도록 계산
  const sectionWidth = containerWidth > 0 ? containerWidth / timeLine.length : 200;

  return (
    <div ref={containerRef} className={gridClass}>
      {timeLine.map((t, index) => {
        const validData = getValidDailyData(getDailyCategoryData(expenses, t.label), 10);
        const labelColor = isSaturday(t.label) ? 'text-blue-700' : isSunday(t.label) ? 'text-red-500' : 'text-gray-700';
        return (
          <div
            key={`${t.label}-${index}`}
            className="relative cursor-pointer group text-gray-400 transition-colors transform-gpu hover:text-gray-700 duration-500 ease-in-out"
            style={{ width: sectionWidth, height: sectionWidth * 0.9 }}
          >
            <div className="relative w-full h-full flex flex-col">
              {
                <div className="flex-1 flex flex-col items-start justify-start w-full px-4 gap-3 relative">
                  <div className={`opacity-50 ${labelColor} text-sm font-semibold group-hover:opacity-100 transition-opacity duration-500`}>
                    {dayjs(t.label).format('MMM, DD')}
                  </div>
                  <div className="opacity-50 text-gray-800 text-lg font-bold  group-hover:opacity-100 transition-opacity duration-500">{t.value}</div>
                  <div className="p-2 absolute bottom-0 right-0 w-1/2 h-full overflow-hidden">
                    <DailyDotChart data={validData} dotClassName="group-hover:opacity-100 opacity-10 transition-opacity duration-500" />
                  </div>
                </div>
              }

              <div className="h-2/5 flex items-end justify-center pb-2" />

              <Ticks spacing={spacing} sectionWidth={sectionWidth} isFirst={index === 0} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalTimeline;
