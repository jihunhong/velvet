import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface DailyExpense {
  date: string;
  amount: number;
}

export interface ExpenseAreaChartProps {
  data: DailyExpense[];
}

const ExpenseAreaChart = ({ data }: ExpenseAreaChartProps) => (
  <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm h-full flex flex-col">
    <h3 className="text-lg text-gray-900 font-bold mb-4">최근 지출 추이</h3>
    <div className="flex-1 flex items-center justify-center">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <defs>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.7} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip formatter={(value: number) => value.toLocaleString()} />
          <Area type="monotone" dataKey="amount" stroke="#ef4444" fill="url(#colorExpense)" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ExpenseAreaChart;
