interface DotProps {
  dotColor: string;
  dotClassName?: string;
}

const Dot: React.FC<DotProps> = ({ dotColor, dotClassName }) => (
  <div
    style={{
      backgroundColor: dotColor,
      boxShadow: `0 0px 6px ${dotColor}66`,
    }}
    className={`${dotClassName} w-[12px] h-[12px] rounded-sm transition-all duration-300 hover:scale-110`}
  />
);

export default Dot;
