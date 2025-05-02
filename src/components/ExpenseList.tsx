import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import * as colors from '../common/colors/expenseCategory';
import * as categoryNames from '../common/consants/categoryName';

interface Expense {
  id: number;
  date: Date;
  category: string;
  description: string;
  amount: number;
}

const categoryColors: { [key: string]: string } = {
  [categoryNames.food]: colors.food, // 식사, 카페, 배달 등
  [categoryNames.housing]: colors.housing, // 월세, 관리비
  [categoryNames.utils]: colors.utils, // 전기, 수도, 가스, 휴대폰, 인터넷
  [categoryNames.transportation]: colors.transportation, // 대중교통, 주유, 차량 유지비
  [categoryNames.health]: colors.health, // 병원, 약국, 헬스장
  [categoryNames.hobby]: colors.hobby, // 영화, 게임, 운동, 레저 활동
  [categoryNames.shopping]: colors.shopping, // 의류, 잡화, 온라인 쇼핑
  [categoryNames.saving]: colors.saving, // 적금, 펀드, 주식
  [categoryNames.others]: colors.others, // 분류 어려운 지출
};

const mockExpenses: Expense[] = [
  {
    id: 1,
    date: new Date(2024, 2, 15),
    category: categoryNames.food,
    description: '점심 식사',
    amount: 15000,
  },
  {
    id: 2,
    date: new Date(2024, 2, 14),
    category: categoryNames.transportation,
    description: '택시비',
    amount: 8000,
  },
  {
    id: 3,
    date: new Date(2024, 2, 13),
    category: categoryNames.housing,
    description: '월세',
    amount: 500000,
  },
  {
    id: 4,
    date: new Date(2024, 2, 12),
    category: categoryNames.food,
    description: '저녁 식사',
    amount: 25000,
  },
  {
    id: 5,
    date: new Date(2024, 2, 11),
    category: categoryNames.utils,
    description: '전기세',
    amount: 65000,
  },
  {
    id: 6,
    date: new Date(2024, 2, 10),
    category: categoryNames.shopping,
    description: '옷 구매',
    amount: 89000,
  },
  {
    id: 7,
    date: new Date(2024, 2, 9),
    category: categoryNames.health,
    description: '병원 진료',
    amount: 35000,
  },
  {
    id: 8,
    date: new Date(2024, 2, 8),
    category: categoryNames.hobby,
    description: '영화 관람',
    amount: 14000,
  },
  {
    id: 9,
    date: new Date(2024, 2, 7),
    category: categoryNames.saving,
    description: '적금',
    amount: 300000,
  },
  {
    id: 10,
    date: new Date(2024, 2, 6),
    category: categoryNames.food,
    description: '카페',
    amount: 4500,
  },
  {
    id: 11,
    date: new Date(2024, 2, 5),
    category: categoryNames.transportation,
    description: '지하철',
    amount: 1400,
  },
  {
    id: 12,
    date: new Date(2024, 2, 4),
    category: categoryNames.utils,
    description: '인터넷 요금',
    amount: 35000,
  },
  {
    id: 13,
    date: new Date(2024, 2, 3),
    category: categoryNames.hobby,
    description: '헬스장 회비',
    amount: 100000,
  },
  {
    id: 14,
    date: new Date(2024, 2, 2),
    category: categoryNames.shopping,
    description: '온라인 쇼핑',
    amount: 75000,
  },
  {
    id: 15,
    date: new Date(2024, 2, 1),
    category: categoryNames.others,
    description: '선물',
    amount: 50000,
  },
];

const generateDailyChartData = () => {
  const sortedExpenses = [...mockExpenses].sort((a, b) => a.date.getTime() - b.date.getTime());

  // 한 달의 시작일과 마지막일 구하기
  const firstDate = new Date(2024, 2, 1); // 3월 1일
  const lastDate = new Date(2024, 2, 31); // 3월 31일

  // 한 달 전체 날짜에 대한 데이터 생성
  const dailyData = [];
  for (let date = new Date(firstDate); date <= lastDate; date.setDate(date.getDate() + 1)) {
    const formattedDate = format(date, 'MM.dd');
    const expense = sortedExpenses.find((e) => format(e.date, 'MM.dd') === formattedDate);

    dailyData.push({
      date: formattedDate,
      value: expense ? expense.amount : null,
    });
  }

  return dailyData;
};

export default function ExpenseList() {
  const dailyChartData = generateDailyChartData();
  const totalSpent = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-[20px] px-6 py-1 h-full flex flex-col">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-500" strokeWidth={2.5} size={16} />
            <span className="font-semibold text-md text-gray-400">Mar 1 - Mar 31, 2024</span>
          </div>
          <div className="flex items-center text-red-500 font-semibold">
            <span>-{totalSpent.toLocaleString()}원</span>
          </div>
        </div>

        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyChartData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => (value >= 10000 ? `${(value / 10000).toFixed(0)}만` : value.toString())}
                width={40}
              />
              <Area
                type="linear"
                dataKey="value"
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
        {mockExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full shadow-md"
                style={{
                  backgroundColor: categoryColors[expense.category] || colors.others,
                  boxShadow: `0 2px 4px 0 ${categoryColors[expense.category] || colors.others}33`,
                }}
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                <p className="text-xs text-gray-500">
                  {expense.category} • {format(expense.date, 'MM월 dd일')}
                </p>
              </div>
            </div>
            <span className="text-sm font-semibold text-red-500">-{expense.amount.toLocaleString()}원</span>
          </div>
        ))}
      </div>
    </div>
  );
}
