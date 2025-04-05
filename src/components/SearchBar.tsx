export default function SearchBar() {
  return (
    <div className="rounded-[20px] mb-6">
      <div className="flex items-center justify-between w-full">
        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="거래내역 검색"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-[20px] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 