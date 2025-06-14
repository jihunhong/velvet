import { food, health, hobby, housing, others, saving, transportation } from '../common/constants/expenseCategory';
import { BudgetCardProps } from './BudgetCard';
import WeeklyDotChart from './WeeklyDotChart';

interface BudgetSummaryProgressProps {
  budgets: BudgetCardProps[];
}

export default function BudgetSummaryProgress({ budgets }: BudgetSummaryProgressProps) {
  return (
    <section className="w-full grid grid-rows-[repeat(6,60px)] gap-2 bg-white">
      <div className="row-span-2 flex items-center justify-start gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide">
        <WeeklyDotChart weeks={[2, 34, 26, 5, 13]} dotColor={housing} />
        <WeeklyDotChart weeks={[2, 7, 6, 5, 3]} dotColor={food} />
        <WeeklyDotChart weeks={[2, 0, 6, 5, 0]} dotColor={transportation} />
        <WeeklyDotChart weeks={[12, 14, 30, 11, 38]} dotColor={health} />
        <WeeklyDotChart weeks={[32, 24, 6, 25, 17]} dotColor={hobby} />
        <WeeklyDotChart weeks={[2, 6, 18, 27, 0]} dotColor={saving} />
        <WeeklyDotChart weeks={[10, 8, 6, 4, 2]} dotColor="#4F8A8B" />
        <WeeklyDotChart weeks={[5, 15, 10, 20, 8]} dotColor="#3A86FF" />
        <WeeklyDotChart weeks={[12, 9, 14, 7, 11]} dotColor="#FFBE0B" />
        <WeeklyDotChart weeks={[3, 6, 9, 12, 15]} dotColor="#8338EC" />
        <WeeklyDotChart weeks={[20, 18, 16, 14, 12]} dotColor="#FF006E" />
        <WeeklyDotChart weeks={[24, 11, 7, 11, 43]} dotColor={others} />
      </div>

      <div className="row-span-2 flex flex-col justify-end">
        <p className="text-sm text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <p className="text-sm text-gray-500">excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
      </div>
    </section>
  );
}
