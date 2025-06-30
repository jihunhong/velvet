import dayjs from 'dayjs';
import { WITHOUT_TIME_ZONE } from '../constants/dateFormat';

export const isSaturday = (date: string) => {
  return dayjs(date, 'MMM, DD').day() === 6;
};

export const isSunday = (date: string) => {
  return dayjs(date, 'MMM, DD').day() === 0;
};

export const getToday = () => {
  return dayjs().format(WITHOUT_TIME_ZONE);
};
