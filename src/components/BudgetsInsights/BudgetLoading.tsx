import { useEffect, useState } from 'react';

const BudgetLoading = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full py-12 gap-4">
      <div className="relative w-16 h-16">
        {/* 바깥 원 */}
        <svg className="absolute inset-0 w-16 h-16 animate-spin-slow" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="44 88" strokeLinecap="round" />
        </svg>
        {/* 안쪽 원 */}
        <svg className="absolute inset-0 w-16 h-16 animate-spin-reverse-slower" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="18" fill="none" stroke="#818cf8" strokeWidth="4" strokeDasharray="28 56" strokeLinecap="round" />
        </svg>
        {/* 가운데 점 */}
        {/* TODO :: 로고로 바꿔야됨 */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-4 h-4 bg-blue-400 rounded-full shadow-lg" />
      </div>
      <p className="text-lg text-gray-500 font-semibold">인사이트 분석 중{'.'.repeat(dotCount)}</p>
      <p className="text-xs text-gray-400">AI가 예산 데이터를 분석하고 있습니다</p>
    </div>
  );
};

export default BudgetLoading;
