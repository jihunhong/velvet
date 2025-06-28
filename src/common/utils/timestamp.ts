// createdAt, updatedAt 자동 관리 유틸

import dayjs from 'dayjs';
import { WITH_TIME_ZONE } from '../constants/dateFormat';

export function withTimestamps<T extends object>(data: T): T & { createdAt: string; updatedAt: string } {
  const now = dayjs().format(WITH_TIME_ZONE);
  return {
    ...data,
    createdAt: now,
    updatedAt: now,
  };
}

export function updateTimestamp<T extends { updatedAt?: string }>(data: T): T {
  return {
    ...data,
    updatedAt: dayjs().format(WITH_TIME_ZONE),
  };
}
