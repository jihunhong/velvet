import React from 'react';

export interface PanelProps {
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ rowSpan = 1, colSpan = 1, className, children }) => {
  const gridClass = ['flex flex-col gap-4', `row-span-${rowSpan}`, `col-span-${colSpan}`, className].filter(Boolean).join(' ');

  return <section className={gridClass}>{children}</section>;
};

export default Panel;
