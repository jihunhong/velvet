import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="rounded-[20px] mb-6">
      <div className="flex items-center justify-between w-full">
        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Search transactions"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[20px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
} 