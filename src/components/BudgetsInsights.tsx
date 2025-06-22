import { useQuery } from '@tanstack/react-query';
import { budgets } from '../../tests/budgets';
import { generateBudgetInsightsStream } from '../common/services/ai';
import type { Expense } from '../types/expense';
import type { Insight } from '../types/insight';

const CACHE_KEY = 'expenseInsightsCache';

// 대시보드와 동일한 목업 데이터를 사용합니다.
const mockExpenses: Expense[] = [
  // ... (지난 주 데이터)
  { id: 1, amount: 25000, category: '교통', description: '주유', date: '2024-07-08' },
  { id: 2, amount: 88000, category: '식비', description: '주간 장보기', date: '2024-07-09' },
  { id: 3, amount: 150000, category: '쇼핑', description: '여름 옷 구매', date: '2024-07-10' },
  { id: 4, amount: 45000, category: '취미', description: '온라인 게임', date: '2024-07-11' },

  // ... (이번 주 데이터)
  { id: 5, amount: 85000, category: '교통', description: '주유', date: '2024-07-15' }, // 예산 초과
  { id: 6, amount: 120000, category: '식비', description: '친구와 저녁', date: '2024-07-16' },
  { id: 7, amount: 75000, category: '건강', description: '병원 진료 및 약', date: '2024-07-17' }, // 예산 90% 도달
  { id: 8, amount: 70000, category: '취미', description: '콘서트 티켓', date: '2024-07-18' }, // 지출 급증
];

const fetchBudgetInsights = async (): Promise<Insight[]> => {
  // 1. 캐시 확인
  const cachedDataJSON = localStorage.getItem(CACHE_KEY);
  if (cachedDataJSON) {
    try {
      const cachedData = JSON.parse(cachedDataJSON);
      const cacheTimestamp = new Date(cachedData.timestamp);
      const today = new Date();
      if (cacheTimestamp.toDateString() === today.toDateString()) {
        return cachedData.insights;
      }
    } catch (e) {
      console.error('캐시 파싱 실패', e);
      localStorage.removeItem(CACHE_KEY);
    }
  }

  // 2. 캐시 없으면 AI에서 새 데이터 가져오기 (Promise로 래핑)
  return new Promise<Insight[]>((resolve, reject) => {
    generateBudgetInsightsStream(
      mockExpenses,
      budgets,
      () => {}, // onChunk - 스트리밍 중간 과정은 현재 UI에 표시하지 않으므로 비워둡니다.
      (fullText) => {
        try {
          const cleanedText = fullText.replace(/```json\n?|```/g, '').trim();
          const parsedInsights = JSON.parse(cleanedText) as Insight[];

          // 3. 새 데이터를 캐시에 저장
          const dataToCache = {
            insights: parsedInsights,
            timestamp: new Date().toISOString(),
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(dataToCache));
          resolve(parsedInsights);
        } catch (e: any) {
          reject(new Error(`AI 응답 파싱 오류: ${e.message}`));
        }
      },
      (err) => {
        reject(err);
      }
    );
  });
};

const InsightItem = ({ insight }: { insight: Insight }) => {
  const { title, percent, subTitle, description } = insight;

  const getStatusColor = (p: number) => {
    if (p >= 100) return 'bg-red-100 text-red-800';
    if (p >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getCategoryIcon = (categoryTitle: string) => {
    if (categoryTitle.includes('식비')) return '🍔';
    if (categoryTitle.includes('교통')) return '🚗';
    if (categoryTitle.includes('주거')) return '🏠';
    if (categoryTitle.includes('건강')) return '💊';
    if (categoryTitle.includes('취미')) return '🎮';
    if (categoryTitle.includes('쇼핑')) return '🛍️';
    if (categoryTitle.includes('저축')) return '💰';
    return '💡';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">{getCategoryIcon(title)}</div>
          <div>
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{subTitle}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(percent)}`}>{percent}%</span>
      </div>
      <div className="pl-[52px]">
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="space-y-3 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
        <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="w-3/4 h-4 bg-gray-200 rounded" />
          <div className="w-full h-3 bg-gray-200 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default function BudgetsInsights() {
  const {
    data: insights,
    isLoading,
    isError,
    error,
  } = useQuery<Insight[], Error>({
    queryKey: ['budgetInsights'],
    queryFn: fetchBudgetInsights,
    staleTime: 1000 * 60 * 60, // 1시간 동안 데이터를 fresh 상태로 유지
    refetchOnWindowFocus: false,
  });

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoader />;
    }
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 gap-2">
          <p className="text-2xl">⚠️</p>
          <p className="font-semibold">오류 발생</p>
          <p className="text-xs">{error?.message}</p>
        </div>
      );
    }
    if (insights && insights.length > 0) {
      return insights.map((insight, index) => <InsightItem key={index} insight={insight} />);
    }
    return <div className="flex items-center justify-center h-full text-gray-500">생성된 인사이트가 없습니다.</div>;
  };

  return <div className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[324px]  custom-scrollbar">{renderContent()}</div>;
}
