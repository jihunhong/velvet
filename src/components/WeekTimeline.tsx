import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React from 'react';
import { getDailyData } from '../../tests/daily';
import DailyDotChart, { DailyCategoryData } from './DailyDotChart';
import { calculateDots } from './WeeklyDotChart/utils';

function getNext7DaysFromTomorrow() {
  const tomorrow = dayjs().add(1, 'day');
  // 7일 전(=내일-6) ~ 내일까지 오름차순 배열
  return Array.from({ length: 7 }).map((_, idx) => tomorrow.subtract(6 - idx, 'day'));
}

interface WeekTimelineProps {
  contents?: React.ReactNode[]; // 7개(각 날짜별 차트/컴포넌트)
}

const WeekTimeline: React.FC<WeekTimelineProps> = () => {
  const weeks = getNext7DaysFromTomorrow();
  console.log('weeks', weeks);

  const getValidDailyData = (data: DailyCategoryData[]) => {
    return data.map((item) => ({
      ...item,
      count: calculateDots(item.count),
    }));
  };

  return (
    <>
      {weeks.map((date, idx) => {
        const dailyData = getDailyData();
        const validData = getValidDailyData(dailyData);
        return (
          <div key={idx} className={`flex flex-col w-full h-auto px-2 py-2 aspect-square`} style={{ minWidth: 0 }}>
            <DailyDotChart data={validData} />
          </div>
        );
      })}
    </>
  );
};

export default WeekTimeline;
