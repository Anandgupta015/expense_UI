import { LayoutDashboard, ArrowLeftRight, Lightbulb, Sun, Moon, ShieldCheck, Eye } from 'lucide-react'
import { useApp } from '../context/AppContext'

const NAV = [
  { id: 'overview',     label: 'Overview',      Icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions',   Icon: ArrowLeftRight  },
  { id: 'insights',     label: 'Insights',       Icon: Lightbulb       },
]

export default function Sidebar({ page, setPage }) {
  const { role, setRole, darkMode, setDarkMode } = useApp()

  return (
    <aside className="flex flex-col w-56 shrink-0 h-screen border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-800">
        <span className="text-lg font-semibold tracking-tight">
          <span className="text-blue-600">fin</span>dash
        </span>
        <p className="text-xs text-gray-400 mt-0.5">Personal Finance</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setPage(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              page === id
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {/* Role switcher */}
      <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Role</p>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {['viewer','admin'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium transition-all ${
                role === r
                  ? 'bg-blue-600 text-white'
                  : 'bg-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {r === 'admin' ? <ShieldCheck size={12}/> : <Eye size={12}/>}
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(d => !d)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          {darkMode ? <Sun size={14}/> : <Moon size={14}/>}
          {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  )
}
