import React from 'react';

export interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  colorClass: string; // 예: 'blue-500', 'red-400'
  children: React.ReactNode;
  textClass?: string;
}

const Header = ({ level, colorClass, children, textClass }: Props) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  const headingClass = ['font-bold text-lg sm:text-xl md:text-2xl', textClass].filter(Boolean).join(' ');

  return (
    <header className="flex items-center">
      <span className={`h-[66%] w-1.5 ${colorClass} mr-2`} aria-hidden="true" />
      {React.createElement(HeadingTag, { className: headingClass }, children)}
    </header>
  );
};

export default Header;
