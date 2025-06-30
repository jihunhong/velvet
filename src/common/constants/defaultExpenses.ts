import { Expense } from '@/types/expense';
import { defaultBudgets } from './defaultBudgets';
import { defaultCategories } from './defaultCategories';

// 카테고리 ID로 Category 객체 찾는 헬퍼 함수
const getCategoryById = (id: number) => defaultCategories.find((c) => c.id === id)!;

// 특정 Budget ID로 Budget 객체 찾는 헬퍼 함수
const getBudgetById = (id: number) => defaultBudgets.find((b) => b.id === id)!;

// 날짜를 ISO 형식으로 변환하는 헬퍼 함수
const formatDateTime = (dateStr: string) => {
  // 기존 date가 '2025-07-01T' 또는 '2025-07-01' 형식
  const cleanDate = dateStr.replace('T', '');
  return `${cleanDate}T09:00:00Z`; // 오전 9시로 기본 설정
};

export const defaultExpenses: Expense[] = [
  {
    id: 1,
    amount: 12000,
    category: getCategoryById(1), // 식비
    description: '점심 도시락',
    createdAt: formatDateTime('2025-07-01'),
    updatedAt: formatDateTime('2025-07-01'),
    isHidden: false,
    budgets: [getBudgetById(1)], // 기본 식비 관리
  },
  {
    id: 2,
    amount: 850000,
    category: getCategoryById(2), // 주거비
    description: '6월 월세',
    createdAt: formatDateTime('2025-07-01'),
    updatedAt: formatDateTime('2025-07-01'),
    isHidden: false,
    budgets: [getBudgetById(3), getBudgetById(11)], // 주거비 고정 예산 + 필수 생활비
  },
  {
    id: 3,
    amount: 6000,
    category: getCategoryById(1), // 식비
    description: '편의점 아침',
    createdAt: formatDateTime('2025-07-02'),
    updatedAt: formatDateTime('2025-07-02'),
    isHidden: false,
    budgets: [getBudgetById(1)], // 기본 식비 관리
  },
  {
    id: 4,
    amount: 2500,
    category: getCategoryById(4), // 교통비
    description: '지하철 요금',
    createdAt: formatDateTime('2025-07-02'),
    updatedAt: formatDateTime('2025-07-02'),
    isHidden: false,
    budgets: [getBudgetById(4)], // 대중교통 이용 예산
  },
  {
    id: 5,
    amount: 39000,
    category: getCategoryById(6), // 취미,여가
    description: '넷플릭스 정기결제',
    createdAt: formatDateTime('2025-07-02'),
    updatedAt: formatDateTime('2025-07-02'),
    isHidden: false,
    budgets: [getBudgetById(7)], // 주말 여가비
  },
  {
    id: 6,
    amount: 76000,
    category: getCategoryById(3), // 공과금,통신비
    description: '전기+인터넷 요금',
    createdAt: formatDateTime('2025-07-03'),
    updatedAt: formatDateTime('2025-07-03'),
    isHidden: false,
    budgets: [getBudgetById(10), getBudgetById(11)], // 통신비 관리 + 필수 생활비
  },
  {
    id: 7,
    amount: 13900,
    category: getCategoryById(1), // 식비
    description: '저녁 혼밥',
    createdAt: formatDateTime('2025-07-03'),
    updatedAt: formatDateTime('2025-07-03'),
    isHidden: false,
    budgets: [getBudgetById(2)], // 외식비 절약 챌린지
  },
  {
    id: 8,
    amount: 120000,
    category: getCategoryById(7), // 쇼핑
    description: '운동화 구입',
    createdAt: formatDateTime('2025-07-04'),
    updatedAt: formatDateTime('2025-07-04'),
    isHidden: false,
    budgets: [getBudgetById(8)], // 의류 쇼핑 예산
  },
  {
    id: 9,
    amount: 1800,
    category: getCategoryById(4), // 교통비
    description: '버스 요금',
    createdAt: formatDateTime('2025-07-04'),
    updatedAt: formatDateTime('2025-07-04'),
    isHidden: false,
    budgets: [getBudgetById(4)], // 대중교통 이용 예산
  },
  {
    id: 10,
    amount: 46000,
    category: getCategoryById(5), // 의료,건강
    description: '치과 진료',
    createdAt: formatDateTime('2025-07-05'),
    updatedAt: formatDateTime('2025-07-05'),
    isHidden: false,
    budgets: [getBudgetById(6)], // 건강관리 예산
  },
  {
    id: 11,
    amount: 35000,
    category: getCategoryById(6), // 취미,여가
    description: '만화책 구매',
    createdAt: formatDateTime('2025-07-05'),
    updatedAt: formatDateTime('2025-07-05'),
    isHidden: false,
    budgets: [getBudgetById(12)], // 자기계발 투자
  },
  {
    id: 12,
    amount: 9800,
    category: getCategoryById(1), // 식비
    description: '편의점 간식',
    createdAt: formatDateTime('2025-07-06'),
    updatedAt: formatDateTime('2025-07-06'),
    isHidden: false,
    budgets: [], // 예산 없이 기록
  },
  {
    id: 13,
    amount: 200000,
    category: getCategoryById(8), // 저축,투자
    description: '적금 입금',
    createdAt: formatDateTime('2025-07-06'),
    updatedAt: formatDateTime('2025-07-06'),
    isHidden: false,
    budgets: [getBudgetById(9), getBudgetById(17)], // 비상금 적립 + 1분기 집중 저축
  },
  {
    id: 14,
    amount: 11000,
    category: getCategoryById(10), // 기타
    description: '문구류 구매',
    createdAt: formatDateTime('2025-07-06'),
    updatedAt: formatDateTime('2025-07-06'),
    isHidden: false,
    budgets: [getBudgetById(12)], // 자기계발 투자
  },
  {
    id: 15,
    amount: 5200,
    category: getCategoryById(1), // 식비
    description: '편의점 도시락',
    createdAt: formatDateTime('2025-07-07'),
    updatedAt: formatDateTime('2025-07-07'),
    isHidden: false,
    budgets: [getBudgetById(1)], // 기본 식비 관리
  },
  {
    id: 16,
    amount: 89000,
    category: getCategoryById(7), // 쇼핑
    description: '여름 바지 구매',
    createdAt: formatDateTime('2025-07-07'),
    updatedAt: formatDateTime('2025-07-07'),
    isHidden: false,
    budgets: [getBudgetById(8), getBudgetById(19)], // 의류 쇼핑 예산 + 봄맞이 쇼핑
  },
  {
    id: 17,
    amount: 39000,
    category: getCategoryById(5), // 의료,건강
    description: '한의원 침치료',
    createdAt: formatDateTime('2025-07-08'),
    updatedAt: formatDateTime('2025-07-08'),
    isHidden: false,
    budgets: [getBudgetById(16)], // 건강 투자
  },
  {
    id: 18,
    amount: 15900,
    category: getCategoryById(1), // 식비
    description: '브런치 카페',
    createdAt: formatDateTime('2025-07-08'),
    updatedAt: formatDateTime('2025-07-08'),
    isHidden: false,
    budgets: [getBudgetById(2)], // 외식비 절약 챌린지
  },
  {
    id: 19,
    amount: 2500,
    category: getCategoryById(4), // 교통비
    description: '지하철 왕복',
    createdAt: formatDateTime('2025-07-08'),
    updatedAt: formatDateTime('2025-07-08'),
    isHidden: false,
    budgets: [getBudgetById(4)], // 대중교통 이용 예산
  },
  {
    id: 20,
    amount: 125000,
    category: getCategoryById(7), // 쇼핑
    description: '가방 구매',
    createdAt: formatDateTime('2025-07-09'),
    updatedAt: formatDateTime('2025-07-09'),
    isHidden: false,
    budgets: [getBudgetById(14)], // 라이프스타일 예산
  },
  {
    id: 21,
    amount: 30000,
    category: getCategoryById(6), // 취미,여가
    description: '전시회 관람',
    createdAt: formatDateTime('2025-07-09'),
    updatedAt: formatDateTime('2025-07-09'),
    isHidden: false,
    budgets: [getBudgetById(7), getBudgetById(14)], // 주말 여가비 + 라이프스타일 예산
  },
  {
    id: 22,
    amount: 20000,
    category: getCategoryById(3), // 공과금,통신비
    description: '휴대폰 요금',
    createdAt: formatDateTime('2025-07-09'),
    updatedAt: formatDateTime('2025-07-09'),
    isHidden: false,
    budgets: [getBudgetById(10)], // 통신비 관리
  },
  {
    id: 23,
    amount: 6700,
    category: getCategoryById(1), // 식비
    description: '편의점 음료+빵',
    createdAt: formatDateTime('2025-07-10'),
    updatedAt: formatDateTime('2025-07-10'),
    isHidden: false,
    budgets: [], // 예산 없이 기록
  },
  {
    id: 24,
    amount: 100000,
    category: getCategoryById(8), // 저축,투자
    description: '주식 구매',
    createdAt: formatDateTime('2025-07-10'),
    updatedAt: formatDateTime('2025-07-10'),
    isHidden: false,
    budgets: [getBudgetById(17)], // 1분기 집중 저축
  },
  {
    id: 25,
    amount: 4500,
    category: getCategoryById(4), // 교통비
    description: '택시 요금 일부',
    createdAt: formatDateTime('2025-07-11'),
    updatedAt: formatDateTime('2025-07-11'),
    isHidden: false,
    budgets: [getBudgetById(5)], // 자차 운영비
  },
  {
    id: 26,
    amount: 65000,
    category: getCategoryById(5), // 의료,건강
    description: '정형외과 진료',
    createdAt: formatDateTime('2025-07-12'),
    updatedAt: formatDateTime('2025-07-12'),
    isHidden: false,
    budgets: [getBudgetById(6), getBudgetById(16)], // 건강관리 예산 + 건강 투자
  },
  {
    id: 27,
    amount: 38000,
    category: getCategoryById(6), // 취미,여가
    description: '노래방',
    createdAt: formatDateTime('2025-07-12'),
    updatedAt: formatDateTime('2025-07-12'),
    isHidden: false,
    budgets: [getBudgetById(7)], // 주말 여가비
  },
  {
    id: 28,
    amount: 32000,
    category: getCategoryById(1), // 식비
    description: '친구와 저녁 식사',
    createdAt: formatDateTime('2025-07-13'),
    updatedAt: formatDateTime('2025-07-13'),
    isHidden: false,
    budgets: [getBudgetById(2)], // 외식비 절약 챌린지
  },
  {
    id: 29,
    amount: 11000,
    category: getCategoryById(10), // 기타
    description: '택배비',
    createdAt: formatDateTime('2025-07-14'),
    updatedAt: formatDateTime('2025-07-14'),
    isHidden: false,
    budgets: [], // 예산 없이 기록
  },
  {
    id: 30,
    amount: 4500,
    category: getCategoryById(4), // 교통비
    description: '택시비',
    createdAt: formatDateTime('2025-07-14'),
    updatedAt: formatDateTime('2025-07-14'),
    isHidden: false,
    budgets: [getBudgetById(5)], // 자차 운영비
  },
  {
    id: 31,
    amount: 89000,
    category: getCategoryById(7), // 쇼핑
    description: '시계 구매',
    createdAt: formatDateTime('2025-07-15'),
    updatedAt: formatDateTime('2025-07-15'),
    isHidden: false,
    budgets: [getBudgetById(14)], // 라이프스타일 예산
  },
  {
    id: 32,
    amount: 50000,
    category: getCategoryById(8), // 저축,투자
    description: '펀드 납입',
    createdAt: formatDateTime('2025-07-15'),
    updatedAt: formatDateTime('2025-07-15'),
    isHidden: false,
    budgets: [getBudgetById(17)], // 1분기 집중 저축
  },
  {
    id: 33,
    amount: 9800,
    category: getCategoryById(1), // 식비
    description: '치킨 배달',
    createdAt: formatDateTime('2025-07-16'),
    updatedAt: formatDateTime('2025-07-16'),
    isHidden: false,
    budgets: [getBudgetById(2)], // 외식비 절약 챌린지
  },
  {
    id: 34,
    amount: 19000,
    category: getCategoryById(3), // 공과금,통신비
    description: '가스요금',
    createdAt: formatDateTime('2025-07-16'),
    updatedAt: formatDateTime('2025-07-16'),
    isHidden: false,
    budgets: [getBudgetById(11)], // 필수 생활비
  },
  {
    id: 35,
    amount: 4700,
    category: getCategoryById(1), // 식비
    description: '편의점 커피',
    createdAt: formatDateTime('2025-07-17'),
    updatedAt: formatDateTime('2025-07-17'),
    isHidden: false,
    budgets: [], // 예산 없이 기록
  },
  {
    id: 36,
    amount: 33000,
    category: getCategoryById(6), // 취미,여가
    description: '게임 구입',
    createdAt: formatDateTime('2025-07-17'),
    updatedAt: formatDateTime('2025-07-17'),
    isHidden: false,
    budgets: [getBudgetById(7)], // 주말 여가비
  },
  {
    id: 37,
    amount: 47000,
    category: getCategoryById(5), // 의료,건강
    description: '약국 약값',
    createdAt: formatDateTime('2025-07-18'),
    updatedAt: formatDateTime('2025-07-18'),
    isHidden: false,
    budgets: [getBudgetById(16)], // 건강 투자
  },
  {
    id: 38,
    amount: 2000,
    category: getCategoryById(4), // 교통비
    description: '버스',
    createdAt: formatDateTime('2025-07-19'),
    updatedAt: formatDateTime('2025-07-19'),
    isHidden: false,
    budgets: [getBudgetById(4)], // 대중교통 이용 예산
  },
  {
    id: 39,
    amount: 77000,
    category: getCategoryById(7), // 쇼핑
    description: '여름 슬리퍼',
    createdAt: formatDateTime('2025-07-20'),
    updatedAt: formatDateTime('2025-07-20'),
    isHidden: false,
    budgets: [getBudgetById(19)], // 봄맞이 쇼핑
  },
  {
    id: 40,
    amount: 12000,
    category: getCategoryById(1), // 식비
    description: '점심 구내식당',
    createdAt: formatDateTime('2025-07-20'),
    updatedAt: formatDateTime('2025-07-20'),
    isHidden: false,
    budgets: [getBudgetById(1)], // 기본 식비 관리
  },
  {
    id: 33,
    amount: 9800,
    category: getCategoryById(1), // 식비
    description: '치킨 배달',
    createdAt: formatDateTime('2025-07-16'),
    updatedAt: formatDateTime('2025-07-16'),
    isHidden: false,
    budgets: [getBudgetById(1)],
  },
  {
    id: 34,
    amount: 19000,
    category: getCategoryById(3), // 공과금,통신비
    description: '가스요금',
    createdAt: formatDateTime('2025-07-16'),
    updatedAt: formatDateTime('2025-07-16'),
    isHidden: false,
    budgets: [getBudgetById(3)],
  },
  {
    id: 35,
    amount: 4700,
    category: getCategoryById(1), // 식비
    description: '편의점 커피',
    createdAt: formatDateTime('2025-07-17'),
    updatedAt: formatDateTime('2025-07-17'),
    isHidden: false,
    budgets: [getBudgetById(1)],
  },
  {
    id: 36,
    amount: 33000,
    category: getCategoryById(6), // 취미,여가
    description: '게임 구입',
    createdAt: formatDateTime('2025-07-17'),
    updatedAt: formatDateTime('2025-07-17'),
    isHidden: false,
    budgets: [getBudgetById(6)],
  },
  {
    id: 37,
    amount: 47000,
    category: getCategoryById(5), // 의료,건강
    description: '약국 약값',
    createdAt: formatDateTime('2025-07-18'),
    updatedAt: formatDateTime('2025-07-18'),
    isHidden: false,
    budgets: [getBudgetById(5)],
  },
  {
    id: 38,
    amount: 2000,
    category: getCategoryById(4), // 교통비
    description: '버스',
    createdAt: formatDateTime('2025-07-19'),
    updatedAt: formatDateTime('2025-07-19'),
    isHidden: false,
    budgets: [getBudgetById(4)],
  },
  {
    id: 39,
    amount: 77000,
    category: getCategoryById(7), // 쇼핑
    description: '여름 슬리퍼',
    createdAt: formatDateTime('2025-07-20'),
    updatedAt: formatDateTime('2025-07-20'),
    isHidden: false,
    budgets: [getBudgetById(7)],
  },
  {
    id: 40,
    amount: 12000,
    category: getCategoryById(1), // 식비
    description: '점심 구내식당',
    createdAt: formatDateTime('2025-07-20'),
    updatedAt: formatDateTime('2025-07-20'),
    isHidden: false,
    budgets: [getBudgetById(1)],
  },
];
