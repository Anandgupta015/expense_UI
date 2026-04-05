export const CATEGORIES = [
  'Salary', 'Freelance', 'Food', 'Transport',
  'Shopping', 'Utilities', 'Entertainment', 'Healthcare', 'Other',
]

export const CATEGORY_COLORS = {
  Salary:        '#2563eb',
  Freelance:     '#16a34a',
  Food:          '#ea580c',
  Transport:     '#d97706',
  Shopping:      '#db2777',
  Utilities:     '#7c3aed',
  Entertainment: '#0891b2',
  Healthcare:    '#059669',
  Other:         '#6b7280',
}

let _id = 1
const tx = (date, desc, cat, type, amount) => ({ id: _id++, date, desc, cat, type, amount })

export const INITIAL_TRANSACTIONS = [
  tx('2025-07-01', 'Monthly Salary',        'Salary',        'income',  85000),
  tx('2025-07-03', 'Zomato Order',          'Food',          'expense',   680),
  tx('2025-07-05', 'Metro Card Recharge',   'Transport',     'expense',   500),
  tx('2025-07-08', 'Amazon Shopping',       'Shopping',      'expense',  2800),
  tx('2025-07-12', 'Electricity Bill',      'Utilities',     'expense',  1700),
  tx('2025-07-15', 'Freelance Project A',   'Freelance',     'income',  18000),
  tx('2025-07-18', 'Netflix + Spotify',     'Entertainment', 'expense',   849),
  tx('2025-07-20', 'Swiggy Lunch',          'Food',          'expense',   390),
  tx('2025-07-24', 'Cab Ride',              'Transport',     'expense',   320),
  tx('2025-07-28', 'Grocery Store',         'Food',          'expense',  1900),

  tx('2025-08-01', 'Monthly Salary',        'Salary',        'income',  85000),
  tx('2025-08-04', 'Dining Out',            'Food',          'expense',  1100),
  tx('2025-08-07', 'Petrol',               'Transport',     'expense',  2200),
  tx('2025-08-11', 'Myntra Order',          'Shopping',      'expense',  4200),
  tx('2025-08-14', 'Internet Bill',         'Utilities',     'expense',   999),
  tx('2025-08-17', 'Freelance Project B',   'Freelance',     'income',  22000),
  tx('2025-08-21', 'Movie Tickets',         'Entertainment', 'expense',   600),
  tx('2025-08-26', 'Grocery Run',           'Food',          'expense',  1700),
  tx('2025-08-29', 'Doctor Visit',          'Healthcare',    'expense',   800),

  tx('2025-09-01', 'Monthly Salary',        'Salary',        'income',  85000),
  tx('2025-09-03', 'Uber Eats',             'Food',          'expense',   550),
  tx('2025-09-06', 'Bus Pass',              'Transport',     'expense',   450),
  tx('2025-09-10', 'New Sneakers',          'Shopping',      'expense',  3600),
  tx('2025-09-15', 'Water + Gas Bill',      'Utilities',     'expense',  1350),
  tx('2025-09-19', 'Concert Ticket',        'Entertainment', 'expense',  1200),
  tx('2025-09-24', 'Freelance Bonus',       'Freelance',     'income',  28000),
  tx('2025-09-27', 'Pharmacy',              'Healthcare',    'expense',   450),
  tx('2025-09-29', 'Weekly Groceries',      'Food',          'expense',  2100),

  tx('2025-10-01', 'Monthly Salary',        'Salary',        'income',  85000),
  tx('2025-10-04', 'Restaurant Dinner',     'Food',          'expense',  1400),
  tx('2025-10-07', 'Ola Cab',               'Transport',     'expense',   280),
  tx('2025-10-11', 'Flipkart Sale',         'Shopping',      'expense',  5500),
  tx('2025-10-14', 'Mobile Recharge',       'Utilities',     'expense',   599),
  tx('2025-10-17', 'Freelance Project C',   'Freelance',     'income',  15000),
  tx('2025-10-22', 'IPL Streaming',         'Entertainment', 'expense',   399),
  tx('2025-10-27', 'Supermarket',           'Food',          'expense',  2400),

  tx('2025-11-01', 'Monthly Salary',        'Salary',        'income',  85000),
  tx('2025-11-03', 'Blinkit Order',         'Food',          'expense',   720),
  tx('2025-11-06', 'Auto Fare',             'Transport',     'expense',   210),
  tx('2025-11-10', 'Diwali Shopping',       'Shopping',      'expense',  8000),
  tx('2025-11-13', 'Electricity Bill',      'Utilities',     'expense',  1900),
  tx('2025-11-16', 'Freelance Design',      'Freelance',     'income',  20000),
  tx('2025-11-20', 'Amazon Prime',          'Entertainment', 'expense',   299),
  tx('2025-11-25', 'Weekly Groceries',      'Food',          'expense',  2200),
  tx('2025-11-28', 'Health Checkup',        'Healthcare',    'expense',  1200),

  tx('2025-12-01', 'Monthly Salary',        'Salary',        'income',  85000),
  tx('2025-12-04', 'Uber Eats',             'Food',          'expense',   680),
  tx('2025-12-07', 'Metro Pass',            'Transport',     'expense',   500),
  tx('2025-12-12', 'Christmas Gifts',       'Shopping',      'expense',  6500),
  tx('2025-12-15', 'Internet + Cable',      'Utilities',     'expense',  1499),
  tx('2025-12-18', 'Year-end Freelance',    'Freelance',     'income',  35000),
  tx('2025-12-22', 'New Year Party',        'Entertainment', 'expense',  2500),
  tx('2025-12-26', 'Grocery Store',         'Food',          'expense',  2800),
  tx('2025-12-29', 'Pharmacy',              'Healthcare',    'expense',   380),
]

export const MONTHS = ['Jul','Aug','Sep','Oct','Nov','Dec']

export function getMonthStats(transactions) {
  const map = {}
  MONTHS.forEach(m => { map[m] = { income: 0, expense: 0 } })
  const mIdx = { '07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec' }
  transactions.forEach(t => {
    const mo = mIdx[t.date.split('-')[1]]
    if (!mo) return
    if (t.type === 'income')  map[mo].income  += t.amount
    else                       map[mo].expense += t.amount
  })
  return map
}

export function getCategoryBreakdown(transactions) {
  const map = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    map[t.cat] = (map[t.cat] || 0) + t.amount
  })
  return Object.entries(map).sort((a, b) => b[1] - a[1])
}

export function getSummary(transactions) {
  const income  = transactions.filter(t => t.type === 'income').reduce((s,t) => s + t.amount, 0)
  const expense = transactions.filter(t => t.type === 'expense').reduce((s,t) => s + t.amount, 0)
  return { income, expense, balance: income - expense, savingsRate: income > 0 ? Math.round((income - expense) / income * 100) : 0 }
}
