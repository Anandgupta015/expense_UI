import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import { getSummary } from '../data/mockData'
import { useApp } from '../context/AppContext'

function fmt(v) {
  return '₹' + Math.abs(v).toLocaleString('en-IN')
}

export default function SummaryCards() {
  const { transactions } = useApp()
  const { income, expense, balance, savingsRate } = getSummary(transactions)

  const cards = [
    {
      label: 'Total Balance',
      value: fmt(balance),
      sub: balance >= 0 ? 'Positive cash flow' : 'Negative cash flow',
      icon: Wallet,
      color: balance >= 0 ? 'text-blue-600' : 'text-red-500',
      bg: balance >= 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-red-50 dark:bg-red-900/20',
    },
    {
      label: 'Total Income',
      value: fmt(income),
      sub: 'All-time earnings',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Total Expenses',
      value: fmt(expense),
      sub: 'All-time spending',
      icon: TrendingDown,
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      sub: savingsRate >= 20 ? '▲ Healthy (>20%)' : '▼ Below target (20%)',
      icon: PiggyBank,
      color: savingsRate >= 20 ? 'text-emerald-600' : 'text-amber-500',
      bg: savingsRate >= 20 ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-amber-50 dark:bg-amber-900/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(({ label, value, sub, icon: Icon, color, bg }) => (
        <div key={label} className="card p-4 fade-in">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{label}</p>
            <div className={`p-1.5 rounded-lg ${bg}`}>
              <Icon size={14} className={color} />
            </div>
          </div>
          <p className={`text-2xl font-semibold tracking-tight ${color}`}>{value}</p>
          <p className="text-xs text-gray-400 mt-1">{sub}</p>
        </div>
      ))}
    </div>
  )
}
