export const calculateDots = (amount: number): number => {
  if (amount === 0) return 1;

  const ratio = amount / 10;
  const dots = Math.ceil(ratio);
  return dots;
};

export const formatCount = (count: number): string => {
  if (count === 0) return '소비 없음';
  return `${count}건`;
};
