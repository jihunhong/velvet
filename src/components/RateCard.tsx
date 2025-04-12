import { ChevronUp, ChevronDown } from 'lucide-react';

interface RateCardProps {
  label: string;
  value: string | number;
  rate: number;
  isSelected?: boolean;
}

export default function RateCard({ label, value, rate }: RateCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-gray-200 transition-all duration-100 hover:border-0 hover:shadow-[0_0_0_2px_rgba(236,72,153,1)] min-w-[110px] group">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-xs px-2 py-1 font-semibold text-white rounded-full bg-gray-400 group-hover:bg-pink-600 transition-colors duration-100">{value}</span>
      <span className="flex items-center text-sm text-gray-500">
        <div className="flex items-center gap-1">
          {rate >= 0 ? (
            <ChevronUp className="w-3 h-3 text-gray-500" />
          ) : (
            <ChevronDown className="w-3 h-3 text-gray-500" />
          )} 
          <span>{Math.abs(rate)}%</span>
        </div>
      </span>
    </div>
  );
} 