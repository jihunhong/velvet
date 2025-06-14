import { useEffect, useRef, useState } from 'react';
import { generateTicks } from './generateTicks';

interface TicksProps {
  spacing?: number;
  sectionWidth?: number;
  isFirst?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Ticks: React.FC<TicksProps> = ({ spacing = 14, sectionWidth = 200, className = '', children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(150);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height: newHeight } = entry.contentRect;
        setHeight(newHeight);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full h-full absolute inset-0`} style={{ width: sectionWidth }}>
      <svg width={sectionWidth} height={height} className="w-full h-full" style={{ overflow: 'visible' }} fill="currentColor">
        {generateTicks({ sectionWidth, spacing, height })}
      </svg>
      {children}
    </div>
  );
};

export default Ticks;
