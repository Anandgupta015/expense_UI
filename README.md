# FinDash — Finance Dashboard UI

A clean, interactive finance dashboard built with **React + Vite + Tailwind CSS + Recharts**.

## Live Preview
> After running locally: `http://localhost:5173`

---

## Features

### Dashboard Overview
- Summary cards: Total Balance, Income, Expenses, Savings Rate
- Area chart: 6-month balance trend
- Donut chart: Spending breakdown by category
- Recent transactions list

### Transactions
- Full transaction table with Date, Description, Category, Type, Amount
- Search by description or category
- Filter by type (income/expense) and category
- Sort by date or amount
- **Admin only:** Add, Edit, Delete transactions via modal

### Insights
- 6 insight cards: top spending category, savings rate, expense-to-income ratio, peak month, net savings, category count
- Monthly income vs expenses bar chart
- Top 5 spending categories horizontal bar chart
- Category breakdown with progress bars

### Role-Based UI
| Feature | Viewer | Admin |
|---|---|---|
| View all data | ✅ | ✅ |
| Filter & search | ✅ | ✅ |
| Add transactions | ❌ | ✅ |
| Edit transactions | ❌ | ✅ |
| Delete transactions | ❌ | ✅ |

Switch roles using the **Viewer / Admin toggle** in the sidebar.

### State Management
- React Context + `useReducer` for centralized state
- State: `transactions`, `filters`, `role`
- **Data persistence** via `localStorage` — transactions survive page refresh

### Dark Mode
- System preference auto-detected on first load
- Toggle via sidebar button
- Persisted in `localStorage`

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Styling |
| Recharts | Charts (Area, Bar, Pie) |
| Lucide React | Icons |

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/expense_UI.git
cd expense_UI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
findash/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Navigation + role toggle + dark mode
│   │   ├── SummaryCards.jsx     # 4 metric cards
│   │   ├── Charts.jsx           # TrendChart, SpendingDonut, MonthlyCompare, TopCategories
│   │   └── TransactionModal.jsx # Add/Edit modal (admin only)
│   ├── context/
│   │   └── AppContext.jsx       # Global state (Context + useReducer)
│   ├── data/
│   │   └── mockData.js          # Static transactions + helper functions
│   ├── pages/
│   │   ├── Overview.jsx         # Main dashboard page
│   │   ├── Transactions.jsx     # Transactions table + filters
│   │   └── Insights.jsx         # Analytics and charts
│   ├── App.jsx                  # Root component + routing
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind + custom styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## Assumptions Made

1. **No backend required** — all data is mock/static, persisted in localStorage
2. **Role switching is frontend-only** — simulated via dropdown for demo purposes
3. **Date range** — mock data spans Jul–Dec 2025 (6 months)
4. **Currency** — INR (₹) with Indian number formatting
5. **Responsiveness** — tested at 375px (mobile), 768px (tablet), 1280px (desktop)

---

## Optional Enhancements Implemented
- ✅ Dark mode with persistence
- ✅ Data persistence (localStorage)
- ✅ Responsive layout (mobile-first)

---

*Built for Zorvyn Frontend Developer Intern Assignment — Apr 2026*
