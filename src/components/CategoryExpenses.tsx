import { ShoppingBag } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';

interface CategoryExpensesProps {
  data: {
    month: string;
    categories: {
      amount: number;
      category: string;
      avatar: string;
    }[];
  }[];
}

const CategoryExpenses = ({ data }: CategoryExpensesProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl p-4 pb-0 pl-0">
      <div className="flex items-center gap-4 pl-4">
        <div>
          <ShoppingBag size={30} className="text-green-500" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-500">카테고리별 지출</h3>
          <span className="text-sm font-semibold">쇼핑</span>
        </div>
      </div>
      <div className="flex items-end gap-4">
        <div className="px-2 py-6 bg-pink-500 w-[200px] h-max rounded-tr-3xl rounded-bl-3xl">
          <div className="grid grid-row-1 grid-cols-[52px_1fr_1fr] items-center gap-2 h-full">
            <div className="row-span-1 col-span-1 h-full flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <span className="absolute text-white opacity-80 font-medium transform -rotate-90 whitespace-nowrap origin-center">
                  Monthly Reports
                </span>
              </div>
            </div>
            <div className="row-span-1 col-span-2 grid grid-rows-3 grid-cols-1 gap-1 h-full">
              <div className="row-span-1 col-span-1">
                <span className="text-white/80 text-sm">Expense</span>
                <div className="text-white font-bold">₩103,335</div>
              </div>
              <div className="row-span-1 col-span-1">
                <span className="text-white/80 text-sm">Transactions</span>
                <div className="text-white font-bold">12</div>
              </div>
              <div className="row-span-1 col-span-1">
                <span className="text-white/80 text-sm">Contribution</span>
                <div className="text-white font-bold">43%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[calc(100%-200px)] h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fff" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12, transform: 'translate(0, 18)' }} />

              {data[0]?.categories.map((category, index) => (
                <Bar
                  key={index}
                  dataKey={`categories[${index}].amount`}
                  fill={index === 0 ? '#d6d6d6db' : '#f3f4f6'}
                  opacity={0.8}
                  radius={4}
                  label={{
                    position: 'top',
                    content: (props: any) => {
                      const { x, y, width, height, value } = props;
                      const xPos = Number(x || 0) + Number(width || 0) / 2;
                      const yPos = Number(y || 0) + Number(height || 0) - 10;
                      return (
                        <>
                          {index === 0 && (
                            <foreignObject x={xPos - 40} y={Number(y || 0) - 20} width={80} height={30}>
                              <div className="flex items-center justify-center">
                                <span className="p-1 text-xs font-sm bg-pink-500 text-white rounded">
                                  ₩{Math.round(Math.random() * 1000000).toLocaleString()}
                                </span>
                              </div>
                            </foreignObject>
                          )}
                          <g transform={`translate(${xPos},${yPos})`}>
                            <defs>
                              <clipPath id={`clip-${index}`}>
                                <circle cx={0} cy={12} r={12} />
                              </clipPath>
                            </defs>
                            <image
                              x={-12}
                              y={0}
                              width={24}
                              height={24}
                              href={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdag_u_IjKGPpfGRlBphyjKrDWQi35BSZdzQ&s'}
                              clipPath={`url(#clip-${index})`}
                            />
                          </g>
                        </>
                      );
                    },
                  }}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CategoryExpenses;
