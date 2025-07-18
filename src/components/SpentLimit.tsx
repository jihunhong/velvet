import { getStatusStyles } from '@/common/utils/percent';
import { getAllBudgets } from '@/db/budgetDB';
import { getCurrentMonthExpenses } from '@/db/expenseDB';
import { useQuery } from '@tanstack/react-query';

const SpentLimit = () => {
  const { data: budgets } = useQuery({
    queryKey: ['getAllBudgets'],
    queryFn: () => getAllBudgets(),
  });
  const { data: expenses } = useQuery({
    queryKey: ['getCurrentMonthExpenses'],
    queryFn: () => getCurrentMonthExpenses(),
  });
  if (!budgets || !expenses) {
    return <div>Loading...</div>;
  }

  const totalLimit = budgets?.reduce((acc, budget) => acc + budget.goal, 0);
  const totalSpent = expenses?.reduce((acc, expense) => acc + expense.amount, 0);
  const percent = Number(Math.round((totalSpent / totalLimit) * 100).toFixed(1));
  const { status, txt, bg } = getStatusStyles(percent);

  return (
    <div className="col-span-2 bg-white border border-gray-200 rounded-md p-4 shadow-sm">
      <h3 className="text-lg text-gray-900 font-bold mb-4 text-shadow">Spending Limit</h3>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-md text-gray-600 font-semibold">₩{totalSpent?.toLocaleString()} spent out of</span>
          <span className="text-md text-gray-900 font-bold">₩{totalLimit?.toLocaleString()}원</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          {totalSpent && totalLimit && <div className={`${bg} h-2 rounded-full`} style={{ width: `${(totalSpent / totalLimit) * 100}%` }}></div>}
        </div>
      </div>
    </div>
  );
};

export default SpentLimit;
