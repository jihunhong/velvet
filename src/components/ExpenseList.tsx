import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { getCategoryColor } from '../common/consants/expenseCategory';
import { getCurrentMonthExpenses, getRecentWeekAmounts } from '../db/expenseDB';
export default function ExpenseList() {
  const {
    data: expenses,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getCurrentMonthExpenses'],
    queryFn: getCurrentMonthExpenses,
    initialData: [],
  });

  const {
    data: weeklyExpenses,
    isLoading: isWeeklyLoading,
    isError: isWeeklyError,
  } = useQuery({
    queryKey: ['getRecentWeekAmounts'],
    queryFn: getRecentWeekAmounts,
    initialData: [],
  });

  if (isLoading || isWeeklyLoading) return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  if (isError || isWeeklyError) return <div className="p-8 text-center text-red-400">지출 내역을 불러오지 못했습니다.</div>;

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-[20px] px-6 py-1 h-full flex flex-col">
      <div className="grid grid-cols-7 gap-6 mb-6">
        <div className="col-span-4 flex justify-between items-center w-full">
          <div className="flex flex-col items-start w-full h-full gap-2">
            <div className="flex items-center gap-[1.4rem]">
              <ChevronLeft className="w-4 h-4 text-gray-600 dropshadow" />
              <span className="font-semibold text-lg text-gray-950 text-shadow underline underline-offset-4">{dayjs().get('month') + 1}월</span>
              <ChevronRight className="w-4 h-4 text-gray-600 dropshadow" />
            </div>
            <div className="flex items-center">
              <span className="text-gray-950 text-4xl font-bold tracking-tight">{totalSpent.toLocaleString()}원</span>
            </div>

            <div className="flex items-center">
              <span className="text-gray-950 text-md font-bold tracking-tight">
                이번달은 <span className="text-blue-700">어쩌구 저쩌구</span> 이렇게 저렇게 쓰셨네요
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-3 h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyExpenses} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={false} />
              <YAxis dataKey="amount" axisLine={false} tickLine={false} tick={false} width={40} />
              <Area
                type="linear"
                dataKey="amount"
                stroke="#60a5fa"
                strokeWidth={3}
                fill="url(#colorValue)"
                dot={{ r: 4, stroke: '#60a5fa', strokeWidth: 2, fill: '#ffffff', fillOpacity: 1 }}
                activeDot={{ r: 6, stroke: '#60a5fa', strokeWidth: 2, fill: '#ffffff', fillOpacity: 1 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="space-y-4 overflow-y-auto flex-1 pr-2 custom-scrollbar">
        {expenses.map((expense, idx) => (
          <div
            key={expense.id ?? idx}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getCategoryColor(expense.category),
                }}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                <p className="text-xs text-gray-500">
                  {expense.category} • {format(expense.date, 'MM월 dd일')}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-red-500 tracking-tight">-{expense.amount.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}
