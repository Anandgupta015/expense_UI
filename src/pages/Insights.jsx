import { MonthlyCompareChart, TopCategoriesBar } from '../components/Charts'
import { useApp } from '../context/AppContext'
import { getSummary, getCategoryBreakdown, getMonthStats, MONTHS, CATEGORY_COLORS } from '../data/mockData'

function fmt(v) { return '₹' + Math.abs(v).toLocaleString('en-IN') }

export default function Insights() {
  const { transactions } = useApp()
  const { income, expense, balance, savingsRate } = getSummary(transactions)
  const breakdown = getCategoryBreakdown(transactions)
  const topCat = breakdown[0] || null
  const stats = getMonthStats(transactions)

  // Month with highest expense
  const monthExpenses = MONTHS.map(m => ({ m, exp: stats[m].expense }))
  const peakMonth = monthExpenses.sort((a,b) => b.exp - a.exp)[0]

  // Income vs expense ratio
  const ratio = income > 0 ? ((expense / income) * 100).toFixed(1) : 0

  const insights = [
    {
      label: 'Top spending category',
      value: topCat ? topCat[0] : '—',
      desc: topCat ? `${fmt(topCat[1])} spent across all months` : 'No expense data',
      color: topCat ? CATEGORY_COLORS[topCat[0]] : '#9ca3af',
    },
    {
      label: 'Savings rate',
      value: `${savingsRate}%`,
      desc: savingsRate >= 20 ? 'Great! Above 20% target.' : `${20 - savingsRate}% below the 20% target`,
      color: savingsRate >= 20 ? '#16a34a' : '#f59e0b',
    },
    {
      label: 'Expense-to-income ratio',
      value: `${ratio}%`,
      desc: ratio <= 70 ? 'Healthy spend ratio (<70%)' : 'High ratio — consider reducing expenses',
      color: ratio <= 70 ? '#2563eb' : '#dc2626',
    },
    {
      label: 'Peak expense month',
      value: peakMonth?.m || '—',
      desc: peakMonth ? `${fmt(peakMonth.exp)} in expenses` : '—',
      color: '#7c3aed',
    },
    {
      label: 'Total net savings',
      value: fmt(balance),
      desc: balance >= 0 ? 'Positive cash flow' : 'Spending exceeds income',
      color: balance >= 0 ? '#16a34a' : '#dc2626',
    },
    {
      label: 'Unique categories',
      value: breakdown.length.toString(),
      desc: `Spending across ${breakdown.length} categories`,
      color: '#0891b2',
    },
  ]

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Insights</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Patterns and observations from your financial data</p>
      </div>

      {/* Insight cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {insights.map(({ label, value, desc, color }) => (
          <div key={label} className="card p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-xl font-semibold" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <MonthlyCompareChart />
        <TopCategoriesBar />
      </div>

      {/* Category breakdown table */}
      <div className="card p-5">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Category Breakdown</h3>
        <div className="space-y-3">
          {breakdown.map(([cat, value]) => {
            const pct = expense > 0 ? Math.round(value / expense * 100) : 0
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_COLORS[cat] || '#9ca3af' }}/>
                    {cat}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{pct}%</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{fmt(value)}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat] || '#9ca3af' }}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
