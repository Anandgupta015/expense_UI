import SummaryCards from '../components/SummaryCards'
import { TrendChart, SpendingDonut } from '../components/Charts'
import { useApp } from '../context/AppContext'
import { CATEGORY_COLORS } from '../data/mockData'

function fmt(v) { return '₹' + Math.abs(v).toLocaleString('en-IN') }

export default function Overview() {
  const { transactions, role } = useApp()

  // Recent 5 transactions
  const recent = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5)

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {role === 'admin'
            ? 'Admin view — you can add and edit transactions'
            : 'Viewer mode — read-only access'}
        </p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-3"><TrendChart /></div>
        <div className="lg:col-span-2"><SpendingDonut /></div>
      </div>

      {/* Recent transactions */}
      <div className="card p-5">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Recent Transactions</h3>
        {recent.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No transactions yet.</p>
        ) : (
          <div className="space-y-1">
            {recent.map(t => (
              <div key={t.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[t.cat] || '#9ca3af' }}/>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.desc}</p>
                    <p className="text-xs text-gray-400">{t.date} · {t.cat}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
