// - percent < 50%: "절약을 잘 하고 계시네요."
// - 50% ≤ percent < 90%: "계획대로 잘 지출하고 계시네요."
// - 90% ≤ percent < 100%: "예산 한도에 가까워지고 있어요."
// - percent ≥ 100%: "예산을 초과했어요!"

export const generateSubTitle = (percent: number) => {
  if (percent < 50) return '절약을 잘 하고 계시네요.';
  if (percent < 90) return '계획대로 잘 지출하고 계시네요.';
  if (percent < 100) return '예산 한도에 가까워지고 있어요.';
  return '예산을 초과했어요!';
};

export const getStatusStyles = (percent: number) => {
  if (percent >= 100) return { status: 'Over', txt: 'text-red-400', bg: 'bg-red-400' };
  if (percent > 90) return { status: 'High', txt: 'text-orange-400', bg: 'bg-orange-400' };
  if (percent > 80) return { status: 'Medium', txt: 'text-amber-400', bg: 'bg-amber-400' };
  return { status: 'Low', txt: 'text-emerald-400', bg: 'bg-emerald-400' };
};
