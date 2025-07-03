import { KOREAN_DATE_FORMAT } from '@/common/constants/dateFormat';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { getCurrentMonthExpenses } from '../db/expenseDB';

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

  if (isLoading) return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  if (isError) return <div className="p-8 text-center text-red-400">지출 내역을 불러오지 못했습니다.</div>;

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Transactions</h2>
      </div>
      <div className="rounded-md border border-gray-200 overflow-hidden flex-1">
        <div className="bg-gray-50 border-b border-gray-200">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider w-1/4">카테고리</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider w-1/3">설명</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 uppercase tracking-wider w-1/4">금액</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider w-1/6">날짜</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="max-h-80 overflow-y-auto custom-scrollbar">
          <table className="min-w-full">
            <tbody className="bg-white divide-y divide-gray-100">
              {expenses.map((expense, idx) => (
                <tr key={expense.id ?? idx} className="hover:bg-gray-50 transition-colors duration-150 group">
                  <td className="px-6 py-4 whitespace-nowrap w-1/4">
                    <div className="flex items-center space-x-3">
                      <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: expense.category.color }} />
                      <span className="text-sm font-medium text-gray-900">{expense.category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 w-1/3">
                    <span className="text-sm text-gray-700">{expense.description}</span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap w-1/4">
                    <span className="text-sm font-semibold text-red-600">-{expense.amount.toLocaleString()}원</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap w-1/6">
                    <span className="text-sm text-gray-500">{dayjs(expense.updatedAt).format(KOREAN_DATE_FORMAT)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
