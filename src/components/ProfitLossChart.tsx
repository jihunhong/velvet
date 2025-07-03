import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { month: 'Jan', profit: 15000, loss: 20000 },
  { month: 'Feb', profit: 22000, loss: 18000 },
  { month: 'Mar', profit: 18000, loss: 15000 },
  { month: 'Apr', profit: 20000, loss: 17000 },
  { month: 'May', profit: 24000, loss: 16000 },
  { month: 'Jun', profit: 27000, loss: 22000 },
  { month: 'Jul', profit: 21000, loss: 18000 },
  { month: 'Aug', profit: 17000, loss: 12000 },
];

// Custom shape for profit bar (위쪽에 gap을 줌)
const ProfitBarWithGap = (props: any) => {
  const { x, y, width, height, fill, radius } = props;
  const gap = 4;
  return <rect x={x} y={y + gap} width={width} height={height - gap} fill={fill} rx={radius?.[0] || 0} ry={radius?.[1] || 0} />;
};

const ProfitLossChart = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
    <h3 className="text-xl font-bold text-gray-900 mb-1">Total Income</h3>
    <p className="text-sm text-gray-500 mb-4">View your income in a certain period of time</p>
    <div className="bg-gray-50 rounded-lg p-4">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Legend iconType="rect" wrapperStyle={{ fontSize: 13 }} />
          <Bar
            dataKey="profit"
            name="Profit"
            fill="#c42272"
            stackId="a"
            barSize={20}
            radius={[4, 4, 4, 4]}
            shape={<ProfitBarWithGap />}
            isAnimationActive={false}
          />
          <Bar dataKey="loss" name="Loss" fill="#222" stackId="a" barSize={20} radius={[4, 4, 4, 4]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default ProfitLossChart;
