import dayjs from 'dayjs';
import React from 'react';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getWeekDates(baseDate: dayjs.Dayjs) {
  // baseDate가 속한 주의 일요일을 찾음
  const startOfWeek = baseDate.startOf('week'); // 일요일 기준
  return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
}

const Calendar: React.FC = () => {
  const today = dayjs();
  const weekDates = getWeekDates(today);

  return (
    <div className="w-full max-w-md">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2 text-shadow">
        {WEEK_DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      {/* 날짜 */}
      <div className="grid grid-cols-7 text-center">
        {weekDates.map((date) => {
          const isToday = date.isSame(today, 'date');
          return (
            <div
              key={date.format('YYYY-MM-DD')}
              className={
                'py-2 flex items-center justify-center ' +
                (isToday
                  ? 'bg-gray-500 text-white font-bold rounded-full shadow-sm w-9 h-9 mx-auto'
                  : 'text-gray-500 hover:bg-gray-100 rounded-full w-9 h-9 mx-auto text-shadow')
              }
              aria-label={isToday ? '오늘' : undefined}
            >
              {date.date()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
