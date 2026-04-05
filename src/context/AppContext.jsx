
import { createContext, useContext, useReducer, useEffect, useState, useRef } from 'react'
import { INITIAL_TRANSACTIONS } from '../data/mockData'

const AppContext = createContext(null)

const LS_KEY = 'findash_transactions'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TXN':
      return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'EDIT_TXN':
      return { ...state, transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t) }
    case 'DELETE_TXN':
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) }
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'SET_ROLE':
      return { ...state, role: action.payload }
    case 'RESET_FILTERS':
      return { ...state, filters: initialFilters }
    default:
      return state
  }
}

const initialFilters = { search: '', type: '', category: '', sortBy: 'date-desc' }

function loadTransactions() {
  try {
    const saved = localStorage.getItem(LS_KEY)
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
  } catch {
    return INITIAL_TRANSACTIONS
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    transactions: loadTransactions(),
    filters: initialFilters,
    role: 'viewer',
  })

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('findash_dark')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state.transactions))
  }, [state.transactions])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('findash_dark', darkMode)
  }, [darkMode])

 const nextId = useRef(Math.max(...state.transactions.map(t => t.id), 0) + 1)

function addTransaction(data) {
  dispatch({ type: 'ADD_TXN', payload: { ...data, id: nextId.current++ } })
}
  function editTransaction(data) {
    dispatch({ type: 'EDIT_TXN', payload: data })
  }
  function deleteTransaction(id) {
    dispatch({ type: 'DELETE_TXN', payload: id })
  }
  function setFilter(filter) {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }
  function setRole(role) {
    dispatch({ type: 'SET_ROLE', payload: role })
  }
  function resetFilters() {
    dispatch({ type: 'RESET_FILTERS' })
  }

  function getFilteredTransactions() {
    const { search, type, category, sortBy } = state.filters
    let list = [...state.transactions]
    if (search) list = list.filter(t =>
      t.desc.toLowerCase().includes(search.toLowerCase()) ||
      t.cat.toLowerCase().includes(search.toLowerCase())
    )
    if (type)     list = list.filter(t => t.type === type)
    if (category) list = list.filter(t => t.cat  === category)
    if (sortBy === 'date-desc')   list.sort((a,b) => b.date.localeCompare(a.date))
    if (sortBy === 'date-asc')    list.sort((a,b) => a.date.localeCompare(b.date))
    if (sortBy === 'amount-desc') list.sort((a,b) => b.amount - a.amount)
    if (sortBy === 'amount-asc')  list.sort((a,b) => a.amount - b.amount)
    return list
  }

  return (
    <AppContext.Provider value={{
      ...state,
      darkMode,
      setDarkMode,
      addTransaction,
      editTransaction,
      deleteTransaction,
      setFilter,
      setRole,
      resetFilters,
      getFilteredTransactions,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
