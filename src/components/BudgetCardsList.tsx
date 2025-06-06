import React from 'react';

import { BudgetCard, BudgetCardProps } from './BudgetCard';

interface BudgetCardsListProps {
  budgets: BudgetCardProps[];
}

export const BudgetCardsList: React.FC<BudgetCardsListProps> = ({ budgets }) => (
  <div className="pb-2 flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory gap-2 scrollbar-hide">
    {budgets.map((b, idx) => (
      <BudgetCard key={b.title} title={b.title} amount={b.amount} percent={(b.amount / b.budget) * 100} category={b.category} budget={b.budget} />
    ))}
  </div>
);
