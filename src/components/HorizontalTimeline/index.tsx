import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { getDailyData } from '../../../tests/daily';
import { isSaturday, isSunday } from '../../common/utils/day';
import DailyDotChart from '../DailyDotChart';
import { getValidDailyData } from '../WeeklyDotChart/utils';
import Ticks from './Ticks';

export interface TimelineSection {
  label: string;
  value: number;
}

export interface HorizontalTimelineProps {
  sections: TimelineSection[];
  spacing?: number;
  containerClassName?: string;
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ sections = [], spacing = 12, containerClassName = '' }) => {
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
  const sectionWidth = containerWidth > 0 ? containerWidth / sections.length : 200;

  return (
    <div ref={containerRef} className={gridClass}>
      {sections.map((section, idx) => {
        const validData = getValidDailyData(getDailyData(), 10);
        const labelColor = isSaturday(section.label) ? 'text-blue-700' : isSunday(section.label) ? 'text-red-500' : 'text-gray-700';
        return (
          <div
            key={`${section.label}-${idx}`}
            className="relative cursor-pointer group text-gray-400 transition-colors transform-gpu hover:text-gray-700 duration-500 ease-in-out"
            style={{ width: sectionWidth, height: sectionWidth * 0.9 }}
          >
            <div className="relative w-full h-full flex flex-col">
              {
                <div className="flex-1 flex flex-col items-start justify-start w-full px-4 gap-3 relative">
                  <div className={`opacity-50 ${labelColor} text-sm font-semibold group-hover:opacity-100 transition-opacity duration-500`}>
                    {dayjs(section.label).format('MMM, DD')}
                  </div>
                  <div className="opacity-50 text-gray-800 text-lg font-bold  group-hover:opacity-100 transition-opacity duration-500">
                    {section.value}
                  </div>
                  <div className="p-2 absolute bottom-0 right-0 w-1/2 h-full overflow-hidden">
                    <DailyDotChart data={validData} dotClassName="group-hover:opacity-100 opacity-10 transition-opacity duration-500" />
                  </div>
                </div>
              }

              <div className="h-2/5 flex items-end justify-center pb-2" />
              {/* Tick 배경 */}
              <Ticks spacing={spacing} sectionWidth={sectionWidth} isFirst={idx === 0} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HorizontalTimeline;
