import { FC } from 'react'
import Logo from './Logo'

interface Account {
  id: number
  name: string
  balance: number
  percentage: number
  avatar: string
}

interface AccountListProps {
  accounts: Account[]
  onDetailsClick?: () => void
}

const formatBalance = (balance: number, isLast: boolean): string => {
  if (balance >= 1000) {
    return `${(balance / 1000).toFixed(1)}K`
  }
  return balance.toString()
}

const AccountList: FC<AccountListProps> = ({ accounts, onDetailsClick }) => {
  return (
    <div className="flex items-center gap-4 mt-8">
      <div className="flex flex-1 gap-2 p-1 bg-gray-100 rounded-full">
        {accounts.map((account, index) => (
          <div
            key={account.id}
            className={`flex items-center gap-2 rounded-full p-1 ${
              index === accounts.length - 1
                ? 'bg-transparent'
                : 'bg-white border border-gray-200 shadow-[rgba(100,100,111,0.2)_0px_2px_4px_0px]'
            }`}
            style={{ width: `${account.percentage}%` }}
          >
            {index === accounts.length - 1 ? (
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                <Logo size="md" />
              </div>
            ) : (
              <img
                src={account.avatar}
                alt={account.name}
                className="w-8 h-8 rounded-full shrink-0"
              />
            )}
            <div className="min-w-0 flex-1 flex justify-between">
              <div className={`font-bold truncate ${index === accounts.length - 1 ? 'text-gray-500' : ''}`}>
                ₩{formatBalance(account.balance, index === accounts.length - 1)}
              </div>
              {index !== accounts.length - 1 && (
                <div className="font-bold text-gray-500 pr-2 opacity-70">
                  {account.percentage.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onDetailsClick}
        className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors"
      >
        Details
      </button>
    </div>
  )
}

export default AccountList 