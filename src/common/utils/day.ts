import dayjs from 'dayjs';

export const isSaturday = (date: string) => {
  return dayjs(date, 'MMM, DD').day() === 6;
};

export const isSunday = (date: string) => {
  return dayjs(date, 'MMM, DD').day() === 0;
};
