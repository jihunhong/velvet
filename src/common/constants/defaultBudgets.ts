import { withTimestamps } from '../utils/timestamp';
import { defaultCategories } from './defaultCategories';

// 2024년 4분기 통계청 데이터: 가계동향조사 기준 290만 3천원
export const mockBudgets = [
  {
    id: 1,
    title: '기본 식비 관리',
    description: '장보기와 기본 식료품 구매',
    goal: 350000,
    category: [defaultCategories.find((c) => c.value === 'food')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 2,
    title: '외식비 절약 챌린지',
    description: '외식비를 월 12만원으로 제한하는 목표',
    goal: 120000,
    category: [defaultCategories.find((c) => c.value === 'food')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 3,
    title: '주거비 고정 예산',
    description: '월세, 관리비, 수도광열비',
    goal: 850000,
    category: [defaultCategories.find((c) => c.value === 'housing')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 4,
    title: '대중교통 이용 예산',
    description: '지하철, 버스 정기권 및 이용료',
    goal: 90000,
    category: [defaultCategories.find((c) => c.value === 'transportation')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 5,
    title: '자차 운영비',
    description: '주유비, 주차비, 톨게이트, 차량관리',
    goal: 180000,
    category: [defaultCategories.find((c) => c.value === 'transportation')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 6,
    title: '건강관리 예산',
    description: '병원비, 약값, 건강보조식품, 헬스장',
    goal: 200000,
    category: [defaultCategories.find((c) => c.value === 'health')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 7,
    title: '주말 여가비',
    description: '영화, 카페, 데이트, 취미활동',
    goal: 200000,
    category: [defaultCategories.find((c) => c.value === 'hobby')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 8,
    title: '의류 쇼핑 예산',
    description: '계절별 의류, 신발, 액세서리',
    goal: 250000,
    category: [defaultCategories.find((c) => c.value === 'shopping')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 9,
    title: '비상금 적립',
    description: '예상치 못한 지출에 대비한 비상금',
    goal: 500000,
    category: [defaultCategories.find((c) => c.value === 'saving')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 10,
    title: '통신비 관리',
    description: '휴대폰, 인터넷, OTT 구독료',
    goal: 150000,
    category: [defaultCategories.find((c) => c.value === 'utils')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },

  // 다중 카테고리 예산들
  {
    id: 11,
    title: '필수 생활비',
    description: '식비, 주거비, 공과금 등 기본 생활에 필요한 지출',
    goal: 1400000,
    category: [
      defaultCategories.find((c) => c.value === 'food')!,
      defaultCategories.find((c) => c.value === 'housing')!,
      defaultCategories.find((c) => c.value === 'utils')!,
    ],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 12,
    title: '자기계발 투자',
    description: '취미활동, 도서구입, 온라인 강의, 세미나',
    goal: 300000,
    category: [defaultCategories.find((c) => c.value === 'hobby')!, defaultCategories.find((c) => c.value === 'shopping')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 13,
    title: '이동성 관리',
    description: '모든 교통 관련 지출 통합 관리',
    goal: 250000,
    category: [defaultCategories.find((c) => c.value === 'transportation')!],
    expenses: [],
    startAt: null,
    endAt: null,
  },
  {
    id: 14,
    title: '라이프스타일 예산',
    description: '취미, 쇼핑, 여가활동 등 삶의 질 향상을 위한 지출',
    goal: 400000,
    category: [
      defaultCategories.find((c) => c.value === 'hobby')!,
      defaultCategories.find((c) => c.value === 'shopping')!,
      defaultCategories.find((c) => c.value === 'etc')!,
    ],
    expenses: [],
    startAt: null,
    endAt: null,
  },

  {
    id: 16,
    title: '건강 투자',
    description: '의료비, 운동, 건강식품 등 건강 관련 모든 지출',
    goal: 350000,
    category: [
      defaultCategories.find((c) => c.value === 'health')!,
      defaultCategories.find((c) => c.value === 'food')!, // 건강식품
    ],
    expenses: [],
    startAt: null,
    endAt: null,
  },
];

export const defaultBudgets = mockBudgets.map((budget) => ({
  ...withTimestamps(budget),
}));
