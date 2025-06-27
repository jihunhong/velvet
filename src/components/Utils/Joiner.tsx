import React from 'react';

export interface JoinerProps {
  children: React.ReactNode;
  separator?: React.ReactNode;
}

const Joiner: React.FC<JoinerProps> = ({ children, separator }) => {
  const items = React.Children.toArray(children);
  return (
    <>
      {items.map((child, idx) => (
        <React.Fragment key={idx}>
          {child}
          {idx < items.length - 1 && separator && separator}
        </React.Fragment>
      ))}
    </>
  );
};

export default Joiner;
