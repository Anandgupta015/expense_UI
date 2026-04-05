import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { CATEGORIES } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function TransactionModal({ txn, onClose }) {
  const { addTransaction, editTransaction } = useApp()
  const isEdit = Boolean(txn)

  const [form, setForm] = useState({
    desc:   txn?.desc   || '',
    amount: txn?.amount || '',
    cat:    txn?.cat    || 'Food',
    type:   txn?.type   || 'expense',
    date:   txn?.date   || new Date().toISOString().split('T')[0],
  })
  const [error, setError] = useState('')

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.desc.trim()) return setError('Description is required.')
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError('Enter a valid amount.')
    if (!form.date) return setError('Date is required.')

    const data = { ...form, amount: Number(form.amount) }

    if (isEdit) editTransaction({ ...txn, ...data })
    else addTransaction(data)

    onClose()
  }

  // Close on Escape
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-12 sm:pt-16 p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 w-full max-w-sm shadow-xl fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} className="text-gray-500"/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {error && (
            <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Description
            </label>
            <input
              className="input"
              value={form.desc}
              onChange={e => set('desc', e.target.value)}
              placeholder="e.g. Grocery shopping"
            />
          </div>

          {/* Amount + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Amount (₹)
              </label>
              <input
                className="input"
                type="number"
                min="1"
                value={form.amount}
                onChange={e => set('amount', e.target.value)}
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                Date
              </label>
              <input
                className="input"
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Category
            </label>
            <select
              className="input"
              value={form.cat}
              onChange={e => set('cat', e.target.value)}
            >
              {CATEGORIES.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Type
            </label>
            <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {['income','expense'].map(t => (
                <button
                  type="button"
                  key={t}
                  onClick={() => set('type', t)}
                  className={`flex-1 py-2 text-sm font-medium transition-colors capitalize ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-green-600 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-ghost border border-gray-200 dark:border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              {isEdit ? 'Save changes' : 'Add transaction'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}