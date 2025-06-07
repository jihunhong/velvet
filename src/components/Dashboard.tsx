import { format } from 'date-fns';
import { budgets } from '../../tests/budgets';
import AccountList from './AccountList';
import { BudgetCardsList } from './BudgetCardsList';
import BudgetSummaryProgress from './BudgetSummaryProgress';
import ExpenseList from './ExpenseList';
import Header from './Layout/Header';
import Panel from './Layout/Panel';
import Revenue from './Revenue';

interface DashboardProps {
  timeframe: {
    start: Date;
    end: Date;
  };
  onTimeframeChange: (timeframe: { start: Date; end: Date }) => void;
}

const mockData = [
  { date: '1월', revenue: 4500000, leads: 2800000, deals: 1700000 },
  { date: '2월', revenue: 4800000, leads: 3100000, deals: 1700000 },
  { date: '3월', revenue: 4600000, leads: 2900000, deals: 1700000 },
  { date: '4월', revenue: 4700000, leads: 3000000, deals: 1700000 },
];

const sampleAccounts = [
  {
    id: 1,
    name: '카카오뱅크',
    balance: 209633,
    percentage: 39.63,
    avatar:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAclBMVEX/4wAeHh7/////7AD/6gAAAB8VFh5VURuEeBcMEB//5gD/4QAcHR784gHVvwv/+tv/8Jv/5jD//e7/+NEmJB3/6mT/9bv/5SL/5j0ABx9tYxl6bxeyoRHo0Qjv1gZRShvbxgpCPhzNuA1IQhy9qhB1ahheW42sAAABUElEQVRIibWX6XKDMAyE7YBdzkIgXEmbo0nf/xVrQtL4AI/YafcPM4y/kS1kaWGbp4qy2TKvtk1Z/C5nj2fbpX5qUtq1Blj1JOyO9tULrKnUpPoJ1uRwj6D1BFbrsFHVHezXg/0Itis3OiptFdit5xjrNqwAAqqQBSvNN0ngKAxnyJI1Jvd1erN1+DgGDtgwsz7Dg5C2YiEilligXdZhFHNX2bD7tEkSyLmMj35yCeTyOpciAsjFzRtyGZQnN7ULYKakh8yJYLZT0khx9u1VA8U5CJP4RYp3KqgW5jpIjmiCmfAd0QPKPTWrFug/4jI4fHsDLoLDhV7kOij3CQo6F/Kft4onB/8ceAHAJceFt1/9xbWCLzLcOiytaFam0PaINmRwBMwOHWvMRfNjLnfHHDxYCaN87nQlbh5gu4IbJNiS4SYQtp240cWtNW7mgd+HH1LGGrBvedOMAAAAAElFTkSuQmCC',
  },
  {
    id: 2,
    name: '기업',
    balance: 156841,
    percentage: 29.65,
    avatar: 'https://yt3.googleusercontent.com/EdpR22Cv9XXkWrK9aF45lfC8ZhLwm2D_FDc10Sx1lY5bm_IzAGpVwWHf6Muhj52DevWjdlLJuQ=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    id: 3,
    name: '신한',
    balance: 117115,
    percentage: 22.14,
    avatar:
      'https://logo-pick.com/logo/%ED%86%A0%EC%8A%A4/%EC%8B%AC%EB%B3%BC_pr/%ED%86%A0%EC%8A%A4_%EC%8B%AC%EB%B3%BC_pr.webp?w=200&h=200&fit=crop&auto=format',
  },
  {
    id: 4,
    name: '기타',
    balance: 45386,
    percentage: 8.58,
    avatar: '/avatars/4.png',
  },
];

const categoryExpenseData = [
  {
    month: '9월',
    categories: [
      {
        amount: 6901000,
        category: '식비',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      },
      {
        amount: 4500000,
        category: '주거',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1670/1670080.png',
      },
      {
        amount: 3200000,
        category: '교통',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
      },
    ],
  },
  {
    month: '10월',
    categories: [
      {
        amount: 11035000,
        category: '식비',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      },
      {
        amount: 4800000,
        category: '주거',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1670/1670080.png',
      },
      {
        amount: 3500000,
        category: '교통',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
      },
    ],
  },
  {
    month: '11월',
    categories: [
      {
        amount: 9288000,
        category: '식비',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
      },
      {
        amount: 4600000,
        category: '주거',
        avatar: 'https://cdn-icons-png.flaticon.com/512/1670/1670080.png',
      },
      {
        amount: 3300000,
        category: '교통',
        avatar: 'https://cdn-icons-png.flaticon.com/512/3097/3097180.png',
      },
    ],
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard({ timeframe, onTimeframeChange }: DashboardProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 space-y-6 w-full">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-400 opacity-70">New report</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              className="appearance-none px-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm cursor-pointer"
              value={`${format(timeframe.start, 'MMM d')} - ${format(timeframe.end, 'MMM d, yyyy')}`}
              onChange={() => {
                onTimeframeChange(timeframe);
              }}
            >
              <option>
                {format(timeframe.start, 'MMM d')} - {format(timeframe.end, 'MMM d, yyyy')}
              </option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Revenue 컴포넌트 */}
        <Revenue data={mockData} />
      </div>
      <AccountList accounts={sampleAccounts} />
      <div className="grid grid-rows-[362px_362px] grid-cols-4 gap-2 w-full">
        <Panel rowSpan={2} colSpan={2}>
          <div className="flex flex-col gap-0.5">
            <Header level={3} colorClass="bg-blue-500" textClass="text-black text-shadow tracking-tight">
              예산 관리
            </Header>
            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="row-span-2 flex flex-col justify-center py-2 gap-2">
              <p className="text-5xl font-semibold text-gray-900 tracking-tight">
                665,421<span className="text-gray-400 text-4xl">.82</span>
              </p>
              <p className="text-sm text-gray-500 font-semibold">cupidatat non proident</p>
            </div>
            <BudgetCardsList budgets={budgets} />
            <BudgetSummaryProgress budgets={budgets} />
          </div>
        </Panel>
        <Panel rowSpan={2} colSpan={2}>
          <ExpenseList />
        </Panel>
      </div>
    </div>
  );
}
