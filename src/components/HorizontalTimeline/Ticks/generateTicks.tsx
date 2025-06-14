// SVG 틱 생성 (하단 40% 영역에만)
export const generateTicks = ({
  sectionWidth,
  spacing,
  height,
  tickWidth = 2,
}: {
  sectionWidth: number;
  spacing: number;
  height: number;
  tickWidth?: number;
}) => {
  const ticks = [];
  const totalCount = Math.round(sectionWidth / spacing);
  const containerHeight = height * 0.4; // 하단 40% 영역
  const tickAreaY = height * 0.6; // 상단 60% 이후부터 시작

  for (let i = 0; i < totalCount; i++) {
    const x = i * spacing;

    // 첫 번째 틱은 전체 높이, 나머지는 40% 영역 내에서만
    const isFirstTick = i === 0;
    const tickHeight = isFirstTick ? height : containerHeight * 0.8; // 40% 영역의 80%
    const y = isFirstTick ? 0 : tickAreaY + (containerHeight - tickHeight);

    ticks.push(<rect key={i} x={x} y={y} width={tickWidth} height={tickHeight} fill="currentColor" opacity={0.8} filter="url(#tickShadow)" />);
  }

  return ticks;
};
