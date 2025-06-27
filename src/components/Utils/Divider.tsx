import React from 'react';

export interface DividerProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

const Divider: React.FC<DividerProps> = ({ className = '', direction = 'horizontal' }) => {
  const base = 'bg-gray-400 rounded-full';
  const size = direction === 'vertical' ? 'w-[1.5px] h-3' : 'w-3 h-[1.5px]';
  return <div className={`${size} ${base} ${className}`.trim()} aria-hidden="true" />;
};

export default Divider;
