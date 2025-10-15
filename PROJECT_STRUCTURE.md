# AI Bookkeeping Dashboard - Project Structure

## 📁 Directory Structure

```
src/
├── App.jsx                 # Main application entry point
├── main.jsx               # React root
├── index.css             # Global styles
├── components/           # Reusable UI components
│   ├── index.js         # Component exports
│   ├── layout/          # Layout components
│   │   ├── Sidebar.jsx  # Navigation sidebar
│   │   └── Navbar.jsx   # Top navigation bar
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── MetricCard.jsx      # KPI metric cards
│   │   ├── CashFlowChart.jsx   # Cash flow visualization
│   │   ├── ExpenseBreakdown.jsx # Expense pie chart
│   │   ├── AISummary.jsx       # AI categorization stats
│   │   └── TasksAlerts.jsx     # Tasks and alerts widget
│   └── transactions/    # Transaction-related components
│       └── TransactionsTable.jsx # Transaction data table
├── pages/               # Page components (views)
│   ├── Dashboard.jsx    # Main dashboard page
│   ├── Transactions.jsx # Transactions page
│   └── Settings.jsx     # Settings page
├── data/               # Mock data and constants
│   └── mockData.js     # Sample transaction and chart data
└── utils/              # Helper functions and utilities
    └── calculations.js # Financial calculations and formatters
```

## 🏗️ Architecture Overview

### Component Hierarchy
```
App
├── Sidebar (Layout)
├── Navbar (Layout) 
└── Main Content
    ├── Dashboard (Page)
    │   ├── MetricCard × 4
    │   ├── CashFlowChart
    │   ├── ExpenseBreakdown
    │   ├── AISummary
    │   └── TasksAlerts
    ├── Transactions (Page)
    │   └── TransactionsTable
    └── Settings (Page)
```

### Key Design Principles

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components are designed to be reusable across the application
3. **Maintainability**: Clear folder structure makes it easy to locate and modify code
4. **Scalability**: Easy to add new pages, components, and features

### Data Flow

- **Mock Data**: Centralized in `src/data/mockData.js`
- **Calculations**: Business logic separated into `src/utils/calculations.js`
- **State Management**: Currently using React's built-in state (easy to migrate to Redux/Zustand later)

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔧 Adding New Features

### Adding a New Page
1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`
3. Add navigation item in `src/components/layout/Sidebar.jsx`

### Adding a New Component
1. Create component in appropriate `src/components/` subfolder
2. Export from `src/components/index.js` if reusable
3. Import and use in parent components

### Adding New Data
1. Add mock data to `src/data/mockData.js`
2. Create helper functions in `src/utils/` if needed
3. Import where needed in components

## 📊 Current Features

- **Dashboard**: Financial metrics, charts, AI summary, tasks
- **Transactions**: Sortable transaction table with AI confidence scores
- **Settings**: Placeholder for future configuration options

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Theme**: Dark theme with neon accents
- **Animations**: Framer Motion for smooth interactions
- **Charts**: Recharts library for data visualization

## 🔮 Future Enhancements

- Add React Router for proper routing
- Implement state management (Redux Toolkit/Zustand)
- Add TypeScript for better type safety
- Create custom hooks for data fetching
- Add unit tests (Jest + React Testing Library)
- Implement real API integration
- Add more interactive features
