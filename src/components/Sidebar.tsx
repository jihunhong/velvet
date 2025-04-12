import { LayoutGrid, BarChart3, CircleDollarSign, Wallet, FileBarChart } from 'lucide-react';
import Logo from './Logo'

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 p-6">
      {/* Logo */}
      <Logo className="mb-8" withText size="lg" />

      {/* Navigation */}
      <nav className="space-y-1">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg">
          <LayoutGrid className="w-5 h-5" />
          Dashboard
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <BarChart3 className="w-5 h-5" />
          Transactions
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <CircleDollarSign className="w-5 h-5" />
          Budget
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Wallet className="w-5 h-5" />
          Savings
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <FileBarChart className="w-5 h-5" />
          Reports
        </a>
      </nav>
    </div>
  );
} 