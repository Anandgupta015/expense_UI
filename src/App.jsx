import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Overview from './pages/Overview'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'

const PAGES = {
  overview:     Overview,
  transactions: Transactions,
  insights:     Insights,
}

export default function App() {
  const [page, setPage] = useState('overview')
  const Page = PAGES[page] || Overview

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <Page />
        </div>
      </main>
    </div>
  )
}
