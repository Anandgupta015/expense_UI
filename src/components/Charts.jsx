import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { useApp } from '../context/AppContext'
import { getMonthStats, getCategoryBreakdown, MONTHS, CATEGORY_COLORS } from '../data/mockData'

function fmt(v) { return '₹' + Math.round(v / 1000) + 'k' }
function fmtFull(v) { return '₹' + Math.abs(v).toLocaleString('en-IN') }

const BALANCE_DATA = [
  { month: 'Jul', balance: 118000 },
  { month: 'Aug', balance: 131000 },
  { month: 'Sep', balance: 145000 },
  { month: 'Oct', balance: 158000 },
  { month: 'Nov', balance: 163000 },
  { month: 'Dec', balance: 189000 },
]

export function TrendChart() {
  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Balance Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={BALANCE_DATA} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false}/>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
          <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={45}/>
          <Tooltip formatter={v => fmtFull(v)} labelStyle={{ fontSize: 12 }} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}/>
          <Area type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2} fill="url(#balGrad)" dot={{ r: 3, fill: '#2563eb' }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function SpendingDonut() {
  const { transactions } = useApp()
  const data = getCategoryBreakdown(transactions).slice(0, 6).map(([cat, value]) => ({ cat, value }))
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Spending by Category</h3>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="cat" cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2}>
              {data.map(({ cat }) => (
                <Cell key={cat} fill={CATEGORY_COLORS[cat] || '#9ca3af'}/>
              ))}
            </Pie>
            <Tooltip formatter={v => fmtFull(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-1.5">
          {data.map(({ cat, value }) => (
            <div key={cat} className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[cat] }}/>
                <span className="text-xs text-gray-600 dark:text-gray-400">{cat}</span>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{Math.round(value / total * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MonthlyCompareChart() {
  const { transactions } = useApp()
  const stats = getMonthStats(transactions)
  const data = MONTHS.map(m => ({ month: m, income: stats[m].income, expense: stats[m].expense }))

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Income vs Expenses</h3>
        <div className="flex gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-500 inline-block"/><span>Income</span></span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-400 inline-block"/><span>Expense</span></span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barGap={4} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false}/>
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
          <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={45}/>
          <Tooltip formatter={v => fmtFull(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}/>
          <Bar dataKey="income"  fill="#3b82f6" radius={[4,4,0,0]} maxBarSize={28}/>
          <Bar dataKey="expense" fill="#f87171" radius={[4,4,0,0]} maxBarSize={28}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function TopCategoriesBar() {
  const { transactions } = useApp()
  const data = getCategoryBreakdown(transactions).slice(0, 5).map(([cat, value]) => ({ cat, value }))

  return (
    <div className="card p-5">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Top Spending Categories</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false}/>
          <XAxis type="number" tickFormatter={fmt} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false}/>
          <YAxis type="category" dataKey="cat" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={80}/>
          <Tooltip formatter={v => fmtFull(v)} contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}/>
          <Bar dataKey="value" radius={[0,4,4,0]} maxBarSize={20}>
            {data.map(({ cat }) => (
              <Cell key={cat} fill={CATEGORY_COLORS[cat] || '#9ca3af'}/>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
