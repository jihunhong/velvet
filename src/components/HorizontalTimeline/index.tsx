import { getExpensesByDateRange } from '@/db/expenseDB';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { isSaturday, isSunday } from '../../common/utils/day';
import DailyDotChart from '../DailyDotChart';
import { getValidDailyData } from '../WeeklyDotChart/utils';
import { getDailyCategoryData, getExpenseTimeLine, getTimelineRange } from './calc';

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

  const gridClass = ['flex justify-start w-full h-full gap-3', containerClassName].filter(Boolean).join(' ');

  // 각 섹션이 컨테이너 전체 너비를 채우도록 계산
  const sectionWidth = containerWidth > 0 ? containerWidth / timeLine.length : 200;
  console.log('sectionWidth', sectionWidth);

  return (
    <div ref={containerRef} className={gridClass}>
      {timeLine.map((t, index) => {
        const validData = getValidDailyData(getDailyCategoryData(expenses, t.label), 10);
        const labelColor = isSaturday(t.label) ? 'text-blue-700' : isSunday(t.label) ? 'text-red-500' : 'text-gray-700';
        const isSat = isSaturday(t.label);
        const isSun = isSunday(t.label);

        const bgColor = isSat
          ? 'bg-[#e0edff]' // 연한 파랑
          : isSun
            ? 'bg-[#ffe0e0]' // 연한 빨강
            : 'bg-[#fff]'; // 연한 회색

        const shadowColor = isSat
          ? 'shadow-[0_4px_16px_0_rgba(59,130,246,0.15)]' // 파랑 그림자
          : isSun
            ? 'shadow-[0_4px_16px_0_rgba(239,68,68,0.15)]' // 빨강 그림자
            : ''; // 회색 그림자

        return (
          <div
            key={`${t.label}-${index}`}
            className="relative cursor-pointer group text-gray-400 transition-colors transform-gpu hover:text-gray-700 duration-500 ease-in-out"
            style={{ width: sectionWidth, height: sectionWidth * 1.5 }}
          >
            <div className={`flex flex-col items-start justify-start w-full h-full relative py-3 px-2 gap-2 rounded-md ${bgColor} ${shadowColor}`}>
              <div className={`${labelColor} w-full text-center text-md font-semibold text-shadow`}>
                <span className="text-center">{dayjs(t.label).format('MMM, DD')}</span>
              </div>
              <div className={`${labelColor} text-lg text-center font-semibold w-full text-shadow`}>
                <span className="text-center">{t.value}</span>
              </div>
              <div className="p-2 absolute bottom-0 right-0 w-full h-full overflow-hidden">
                <DailyDotChart data={validData} dotClassName="" containerClassName="justify-center" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalTimeline;
