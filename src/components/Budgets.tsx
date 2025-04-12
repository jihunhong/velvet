import React, {useState} from 'react';
import {LineChart, Line, YAxis, XAxis, ResponsiveContainer} from 'recharts';
import {ThumbsUp, Flame, Star, ChevronUp, ChevronDown, Utensils, ShoppingBag, TrendingDown} from 'lucide-react';
import {format, subDays} from 'date-fns';

interface ChartData {
  date: Date;
  value: number;
}

interface ExpenseData {
  id: number;
  name: string;
  avatar: string;
  totalExpense: number;
  transactions: number;
  budget: number;
  savingRate: number;
  underBudget: number;
  overBudget: number;
  categories: CategoryData[];
  chartData: ChartData[];
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  icon: React.ReactNode;
}

const generateChartData = (baseValue: number, variance: number): ChartData[] => {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => ({
    date: subDays(today, (6 - i) * 3),
    value: baseValue + Math.random() * variance - variance / 2
  }));
};

const expenseData: ExpenseData[] = [
  {
    id: 1,
    name: "Macbook Air",
    avatar: "/avatars/armin.jpg",
    totalExpense: 209633,
    transactions: 118,
    budget: 0.84,
    savingRate: 31,
    underBudget: 12,
    overBudget: 29,
    categories: [
      {
        name: "쇼핑",
        amount: 12399,
        percentage: 5.9,
        icon: <ShoppingBag className="w-6 h-6 text-green-500" />
      }
    ],
    chartData: generateChartData(40, 10)
  },
  {
    id: 2,
    name: "Salad",
    avatar: "/avatars/mikasa.jpg",
    totalExpense: 156841,
    transactions: 103,
    budget: 0.89,
    savingRate: 39,
    underBudget: 21,
    overBudget: 33,
    categories: [
      {
        name: "식비",
        amount: 71048,
        percentage: 45.3,
        icon: <Utensils className="w-6 h-6 text-pink-500" />
      },
    ],
    chartData: generateChartData(45, 15)
  },
  {
    id: 3,
    name: "T-shirts",
    avatar: "/avatars/eren.jpg",
    totalExpense: 117115,
    transactions: 84,
    budget: 0.79,
    savingRate: 32,
    underBudget: 7,
    overBudget: 15,
    categories: [
      {
        name: "쇼핑",
        amount: 9881,
        percentage: 8.4,
        icon: <ShoppingBag className="w-6 h-6 text-green-500" />
      }
    ],
    chartData: generateChartData(35, 12)
  }
];

export default function Budgets() {
  const [selectedPerson, setSelectedPerson] = useState<ExpenseData>(expenseData[0]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount).replace('$', '');
  };

  const formatChartDate = (date: Date) => {
    return format(date, 'MM.dd');
  };

  const formatYAxisValue = (value: number) => {
    return `${(value / 10000).toFixed(1)}만`;
  };

  const handlePersonClick = (person: ExpenseData) => {
    setSelectedPerson(person);
  };

  return (
    <div className="bg-white rounded-2xl px-4 py-1 space-y-6">
      {/* Expense Table */}
      <div className="space-y-2">
        <div className="grid grid-cols-5 text-sm text-gray-500 pb-2">
          <div className="col-span-2">Name</div>
          <div>Expense</div>
          <div className="text-center">Transactions</div>
          <div className="text-center">Saving Rate</div>
        </div>
        
        {expenseData.map((person) => (
          <div 
            key={person.id} 
            onClick={() => handlePersonClick(person)}
            className={`rounded-xl overflow-hidden cursor-pointer transition-all duration-200
              ${selectedPerson.id === person.id ? 'shadow-[0_4px_12px_rgba(0,0,0,0.05)]' : 'shadow-[0px_2px_2px_rgba(0,0,0,0.05)]'}
              hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]`}
            style={{
              background: selectedPerson.id === person.id ? `
                linear-gradient(
                  135deg,
                  #f8fbfd 0%,
                  #faf8fd 15%,
                  #fdfafd 30%,
                  #fefafd 45%,
                  #fffafb 60%,
                  #fffbfc 75%,
                  #fffbf9 90%,
                  #fffdfb 100%
                )
              ` : 'white'
            }}
          >
            <div className="p-4">
              <div className="grid grid-cols-5 items-center">
                <div className="col-span-2 flex items-center gap-3">
                  <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full" />
                  <span className="font-medium">{person.name}</span>
                </div>
                <div className="font-semibold">${formatCurrency(person.totalExpense)}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="bg-gray-900 text-white px-2 rounded-full text-sm">{person.underBudget}</span>
                  <span className="text-gray-500">{person.transactions}</span>
                </div>
                <div className="text-center flex items-center justify-center gap-2">
                  <span>{person.savingRate}%</span>
                  {selectedPerson.id === person.id ? (
                    <ChevronUp className="w-4 h-4 text-pink-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Categories and Chart for selected person */}
              {selectedPerson.id === person.id && (
                <div className="mt-4 space-y-6 overflow-hidden animate-slideDown">
                  {/* Categories Section */}
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Budget Performance</h3>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                          <TrendingDown className="w-3 h-3" />${formatCurrency(person.totalExpense)}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl overflow-hidden bg-white/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {person.categories[0].icon}
                          <span className="font-medium">{person.categories[0].name}</span>
                        </div>
                      </div>
                      <div className='flex items-center justify-between mt-2'>
                        <div className="text-xl font-semibold text-gray-400">${formatCurrency(person.categories[0].amount)}</div>
                        <div className="text-2xl font-bold text-gray-600">{person.categories[0].percentage}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Chart Section */}
                  <div className="space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Spending trends</h3>
                    </div>
                    <div className="h-40 relative">
                      <div className="absolute inset-0 rounded-xl"></div>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart 
                          data={person.chartData}
                          margin={{ top: 10, right: 20, left: 20, bottom: 15 }}
                        >
                          <XAxis 
                            dataKey="date" 
                            stroke="#9CA3AF" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            tickFormatter={formatChartDate}
                            interval={0}
                            dy={10}
                            angle={0}
                            textAnchor="middle"
                            height={40}
                          />
                          <YAxis 
                            stroke="#9CA3AF" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                            domain={['dataMin - 5', 'dataMax + 5']}
                            tickFormatter={formatYAxisValue}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#E91E63" 
                            strokeWidth={2}
                            dot={true}
                            activeDot={{ r: 4, fill: "#E91E63" }}
                            isAnimationActive={true}
                            animationDuration={1500}
                            animationEasing="ease"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="flex gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
          <ThumbsUp className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">절약 달인 💪</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-sm font-medium">지출 관리왕 🔥</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium">예산 달성 👍</span>
        </div>
      </div>
    </div>
  );
} 