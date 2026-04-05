import { useState } from 'react'
import { Search, Plus, Pencil, Trash2, SlidersHorizontal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData'
import TransactionModal from '../components/TransactionModal'

function fmt(v) { return '₹' + Math.abs(v).toLocaleString('en-IN') }

export default function Transactions() {
  const { role, filters, setFilter, resetFilters, getFilteredTransactions, deleteTransaction } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [editTxn, setEditTxn] = useState(null)
  const list = getFilteredTransactions()

  function confirmDelete(id) {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id)
  }

  return (
    <div className="fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{list.length} entries</p>
        </div>
        {role === 'admin' && (
          <button onClick={() => { setEditTxn(null); setModalOpen(true) }} className="btn-primary flex items-center gap-2">
            <Plus size={14}/> Add Transaction
          </button>
        )}
      </div>

      <div className="card p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input
              className="input pl-8"
              placeholder="Search..."
              value={filters.search}
              onChange={e => setFilter({ search: e.target.value })}
            />
          </div>
          <select className="input w-auto" value={filters.type} onChange={e => setFilter({ type: e.target.value })}>
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="input w-auto" value={filters.category} onChange={e => setFilter({ category: e.target.value })}>
            <option value="">All categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="input w-auto" value={filters.sortBy} onChange={e => setFilter({ sortBy: e.target.value })}>
            <option value="date-desc">Date ↓</option>
            <option value="date-asc">Date ↑</option>
            <option value="amount-desc">Amount ↓</option>
            <option value="amount-asc">Amount ↑</option>
          </select>
          {(filters.search || filters.type || filters.category) && (
            <button onClick={resetFilters} className="btn-ghost text-xs">Clear filters</button>
          )}
        </div>
      </div>

      <div className="card overflow-hidden">
        {list.length === 0 ? (
          <div className="text-center py-16">
            <SlidersHorizontal size={28} className="mx-auto text-gray-300 mb-3"/>
            <p className="text-sm text-gray-400">No transactions match your filters.</p>
            <button onClick={resetFilters} className="btn-ghost mt-3 text-xs">Reset filters</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {['Date','Description','Category','Type','Amount', ...(role === 'admin' ? [''] : [])].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {list.map(t => (
                  <tr key={t.id} className="border-b border-gray-50 dark:border-gray-800/60 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 last:border-0">
                    <td className="px-4 py-3 text-xs text-gray-400 font-mono whitespace-nowrap">{t.date}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 max-w-[180px] truncate">{t.desc}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: (CATEGORY_COLORS[t.cat] || '#9ca3af') + '22', color: CATEGORY_COLORS[t.cat] || '#9ca3af' }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLORS[t.cat] || '#9ca3af' }}/>
                        {t.cat}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={t.type === 'income' ? 'badge-income' : 'badge-expense'}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-semibold whitespace-nowrap ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {t.type === 'income' ? '+' : '-'}{fmt(t.amount)}
                    </td>
                    {role === 'admin' && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <button onClick={() => { setEditTxn(t); setModalOpen(true) }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-blue-600 transition-colors">
                            <Pencil size={13}/>
                          </button>
                          <button onClick={() => confirmDelete(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={13}/>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <TransactionModal txn={editTxn} onClose={() => { setModalOpen(false); setEditTxn(null) }}/>
      )}
    </div>
  )
}