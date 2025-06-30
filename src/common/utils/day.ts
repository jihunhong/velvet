import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { ENG_DATE_FORMAT, WITHOUT_TIME_ZONE } from '../constants/dateFormat';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

export const isSaturday = (date: string) => {
  return dayjs(date, 'MMM, DD').day() === 6;
};

export const isSunday = (date: string) => {
  return dayjs(date, 'MMM, DD').day() === 0;
};

export const getToday = () => {
  return dayjs().format(WITHOUT_TIME_ZONE);
};

export const getWeekOfMonth = (date: string) => {
  const startOfMonth = dayjs(date).startOf('month');
  const weekOfYear = dayjs(date).week();
  const weekOfStartMonth = startOfMonth.week();
  return weekOfYear - weekOfStartMonth + 1;
};

// Jun 1
export const getDayForEng = (date: string | null) => {
  if (!date) {
    return 'missing date';
  }
  return dayjs(date).format(ENG_DATE_FORMAT);
};

export const getWeeksInMonth = (date: string) => {
  const startOfMonth = dayjs(date).startOf('month');
  const endOfMonth = dayjs(date).endOf('month');

  // 첫째 주의 시작일 (일요일 기준)
  const firstWeekStart = startOfMonth.startOf('week');
  // 마지막 주의 끝일 (토요일 기준)
  const lastWeekEnd = endOfMonth.endOf('week');

  // 총 주수 계산
  const totalWeeks = lastWeekEnd.diff(firstWeekStart, 'week') + 1;

  return totalWeeks;
};
