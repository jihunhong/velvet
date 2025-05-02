import {ChartBarDecreasing, ChartBarIncreasing, Filter} from 'lucide-react';
import React, {useState} from 'react';
import CategoryIcon from './CategoryIcon';

interface ExpenseData {
  id: number;
  category: string;
  amount: number;
  percentage: number;
  icon: React.ReactNode;
}

const ExpenseTracking = () => {
  // true는 내림차순(높은 금액순), false는 오름차순(낮은 금액순)
  const [sortDesc, setSortDesc] = useState(true);
  
  // 소비 카테고리 데이터
  const expensesData: ExpenseData[] = [
    {
      id: 1,
      category: '식비',
      amount: 327459,
      percentage: 43,
      icon: CategoryIcon.Food
    },
    {
      id: 2,
      category: '공과금',
      amount: 142823,
      percentage: 27,
      icon: CategoryIcon.Housing
    },
    {
      id: 3,
      category: '취미',
      amount: 89935,
      percentage: 11,
      icon: CategoryIcon.Hobby
    },
    {
      id: 4,
      category: '쇼핑',
      amount: 37028,
      percentage: 7,
      icon: CategoryIcon.Shopping
    }
  ];

  // 정렬된 데이터 계산
  const expenses = [...expensesData].sort((a, b) => {
    return sortDesc ? b.amount - a.amount : a.amount - b.amount;
  });

  // 정렬 토글 함수
  const toggleSort = () => {
    setSortDesc(!sortDesc);
  };

  // 금액 포맷팅 함수
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 px-4 py-5 rounded-3xl">
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={toggleSort}
          className="flex items-center justify-center w-10 h-10 px-0 bg-gray-100 rounded-lg text-gray-700"
          aria-label={sortDesc ? "내림차순 정렬" : "오름차순 정렬"}
        >
          {sortDesc ? 
            <ChartBarDecreasing />
          :
            <ChartBarIncreasing />
          }
        </button>
        <button className="flex items-center bg-gray-100 px-4 py-1 rounded-ms text-gray-700 border border-gray-300">
          <span className="mr-1">Filters</span>
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {expenses.map((expense) => (
          <div 
            key={expense.id} 
            className="flex items-center justify-between bg-white p-3 rounded-xl"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                {expense.icon}
              </div>
              <span className="ml-3 text-gray-500 font-semibold">{expense.category}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold mr-4">{formatCurrency(expense.amount)}</span>
              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-600 font-bold">{expense.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseTracking;