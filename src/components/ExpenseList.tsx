import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

import { getCategoryColor } from '../common/constants/expenseCategory';
import { getAllExpenses, getCurrentMonthExpenses } from '../db/expenseDB';

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
    data: allExpenses,
    isLoading: isAllExpensesLoading,
    isError: isAllExpensesError,
  } = useQuery({
    queryKey: ['getAllExpenses'],
    queryFn: getAllExpenses,
    initialData: [],
  });

  if (isLoading || isAllExpensesLoading) return <div className="p-8 text-center text-gray-400">로딩 중...</div>;
  if (isError || isAllExpensesError) return <div className="p-8 text-center text-red-400">지출 내역을 불러오지 못했습니다.</div>;

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-[20px] px-6 py-1 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900">Expense</h2>
      </div>
      <div className="overflow-x-auto flex-1  custom-scrollbar">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-white z-10 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gray-200">
            <tr className="text-gray-500 ">
              <th className="py-2 px-2">카테고리</th>
              <th className="py-2 px-2">설명</th>
              <th className="py-2 px-2 text-right">금액</th>
              <th className="py-2 px-2">날짜</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, idx) => (
              <tr key={expense.id ?? idx} className="hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <td className="py-2 px-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2 align-middle"
                    style={{ backgroundColor: getCategoryColor(expense.category.name) }}
                  />
                  {expense.category.name}
                </td>
                <td className="py-2 px-2">{expense.description}</td>
                <td className="py-2 px-2 text-right text-red-500 font-semibold">-{expense.amount.toLocaleString()}원</td>
                <td className="py-2 px-2">{format(expense.updatedAt, 'MM월 dd일')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
