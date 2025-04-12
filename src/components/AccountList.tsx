import { FC } from 'react'

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

const formatBalance = (balance: number): string => {

  if (balance >= 1000) {
    return `${(balance / 1000).toFixed(1)}K`
  }
  return balance.toString()
}

const AccountList: FC<AccountListProps> = ({ accounts, onDetailsClick }) => {
  return (
    <div className="flex items-center gap-4 mt-8">
      <div className="flex flex-1 gap-2 p-1.5 bg-gray-100 rounded-full">
        {accounts.map((account, index) => (
          <div
            key={account.id}
            className={`flex items-center gap-3 rounded-full py-1.5 px-2 transition-all duration-200 ${
              index === accounts.length - 1
                ? 'bg-transparent'
                : 'bg-white border border-gray-100 shadow-[0px_2px_2px_rgba(0,0,0,0.05)]'
            }`}
            style={{ width: `${account.percentage}%` }}
          >
            {index === accounts.length - 1 ? (
              <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full shadow-md overflow-hidden transition-shadow duration-200 hover:shadow-lg bg-black/90">
                <svg 
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
                  <path d="M2 9v1c0 1.1.9 2 2 2h1" />
                  <path d="M16 11h0" />
                </svg>
              </div>
            ) : (
              <div className="w-8 h-8 shrink-0 rounded-full shadow-md overflow-hidden">
                <img
                  src={account.avatar}
                  alt={account.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="min-w-0 flex-1 flex justify-between items-center">
              <div className={`font-bold truncate ${
                index === accounts.length - 1 
                  ? 'text-gray-500 hover:text-gray-700' 
                  : 'text-gray-700'
              }`}>
                ₩{formatBalance(account.balance)}
              </div>
              {index !== accounts.length - 1 && (
                <div className="font-medium text-gray-400 pr-2">
                  {account.percentage.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onDetailsClick}
        className="px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
      >
        Details
      </button>
    </div>
  )
}

export default AccountList 