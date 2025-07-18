import { paymentData } from '../../tests/regularPayments';
import AccountList from './AccountList';
import BudgetsInsights from './BudgetsInsights';
import ExpenseList from './ExpenseList';
import Panel from './Layout/Panel';
import ProfitLossChart from './ProfitLossChart';
import RegularPayment from './RegularPayment';
import Revenue from './Revenue';
import SpentLimit from './SpentLimit';
import Totally from './Totally';

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
    avatar: 'https://static.toss.im/png-icons/securities/icn-sec-fill-024110.png',
  },
  {
    id: 3,
    name: '신한',
    balance: 117115,
    percentage: 22.14,
    avatar: 'https://image.shinhan.com/rib2017/images/any/img_mobile_logo.png?dt=1751558018095',
  },
  {
    id: 4,
    name: '기타',
    balance: 45386,
    percentage: 8.58,
    avatar: '/avatars/4.png',
  },
];

export default function Dashboard({ timeframe, onTimeframeChange }: DashboardProps) {
  return (
    <div className="bg-white rounded-[20px] p-9 space-y-6 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-400 opacity-70">New Report</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <Revenue data={mockData} />
      </div>

      <AccountList accounts={sampleAccounts} />
      <div className="grid grid-cols-6 grid-rows-[340px_50px_1fr_1fr] gap-x-4 gap-y-4 h-screen max-h-[900px]">
        <Panel rowSpan={2} colSpan={2} className="py-2 relative h-[324px] justify-center">
          <BudgetsInsights />
        </Panel>

        <Panel rowSpan={2} colSpan={2}>
          <section className="grid grid-rows-2 grid-cols-2 gap-3 h-[360px]">
            <Totally />
          </section>
        </Panel>
        <Panel rowSpan={2} colSpan={2} className="h-full">
          <ProfitLossChart />
        </Panel>
        <Panel rowSpan={2} colSpan={2}>
          <div className="flex flex-col gap-4 h-full">
            <SpentLimit />
            <div className="flex-1 min-h-0">
              <RegularPayment items={paymentData} />
            </div>
          </div>
        </Panel>
        {/* TODO :: colspan-4 issue */}
        <Panel rowSpan={2} colSpan={4} className="col-start-3 col-end-7">
          <ExpenseList />
        </Panel>
      </div>
    </div>
  );
}
