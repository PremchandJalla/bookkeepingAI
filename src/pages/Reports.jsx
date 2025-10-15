import React, { useState } from 'react';
import { 
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// 🧾 MOCK DATA
const profitLossData = {
  monthlyData: [
    { month: 'Jan', income: 85000, expenses: 62000 },
    { month: 'Feb', income: 92000, expenses: 68000 },
    { month: 'Mar', income: 78000, expenses: 65000 },
    { month: 'Apr', income: 105000, expenses: 72000 },
    { month: 'May', income: 98000, expenses: 69000 },
    { month: 'Jun', income: 115000, expenses: 78000 },
    { month: 'Jul', income: 122000, expenses: 82000 },
    { month: 'Aug', income: 118000, expenses: 79000 },
    { month: 'Sep', income: 125000, expenses: 85000 },
    { month: 'Oct', income: 132000, expenses: 88000 }
  ],
  categories: [
    { category: 'Product Sales', amount: 950000, percentage: 72.3 },
    { category: 'Service Revenue', amount: 280000, percentage: 21.3 },
    { category: 'Other Income', amount: 85000, percentage: 6.4 }
  ],
  expenseCategories: [
    { category: 'Payroll & Benefits', amount: 450000, percentage: 58.2 },
    { category: 'Marketing & Advertising', amount: 120000, percentage: 15.5 },
    { category: 'Operations', amount: 85000, percentage: 11.0 },
    { category: 'Software & Technology', amount: 65000, percentage: 8.4 },
    { category: 'Office & Facilities', amount: 53000, percentage: 6.9 }
  ]
};

const balanceSheetData = {
  assets: {
    currentAssets: [
      { account: 'Cash & Cash Equivalents', amount: 485000 },
      { account: 'Accounts Receivable', amount: 125000 },
      { account: 'Inventory', amount: 85000 },
      { account: 'Prepaid Expenses', amount: 25000 }
    ],
    fixedAssets: [
      { account: 'Equipment', amount: 150000 },
      { account: 'Furniture & Fixtures', amount: 45000 },
      { account: 'Accumulated Depreciation', amount: -35000 }
    ]
  },
  liabilities: {
    currentLiabilities: [
      { account: 'Accounts Payable', amount: 95000 },
      { account: 'Accrued Expenses', amount: 35000 },
      { account: 'Current Portion of Debt', amount: 25000 }
    ],
    longTermLiabilities: [
      { account: 'Long-term Debt', amount: 180000 },
      { account: 'Deferred Tax Liability', amount: 15000 }
    ]
  },
  equity: [
    { account: 'Common Stock', amount: 250000 },
    { account: 'Retained Earnings', amount: 355000 }
  ]
};

const generalLedgerData = [
  { id: 1, date: '2024-10-14', account: 'Cash', description: 'Shopify Payment', debit: 8920.00, credit: 0, balance: 485920 },
  { id: 2, date: '2024-10-14', account: 'Revenue', description: 'Shopify Payment', debit: 0, credit: 8920.00, balance: 132000 },
  { id: 3, date: '2024-10-13', account: 'Marketing Expense', description: 'Facebook Ads', debit: 1200.00, credit: 0, balance: 12200 },
  { id: 4, date: '2024-10-13', account: 'Cash', description: 'Facebook Ads', debit: 0, credit: 1200.00, balance: 477000 },
  { id: 5, date: '2024-10-12', account: 'Payroll Expense', description: 'Gusto Payroll', debit: 15600.00, credit: 0, balance: 156000 },
  { id: 6, date: '2024-10-12', account: 'Cash', description: 'Gusto Payroll', debit: 0, credit: 15600.00, balance: 478200 },
  { id: 7, date: '2024-10-11', account: 'Office Supplies', description: 'Office Supplies Co', debit: 340.50, credit: 0, balance: 3405 },
  { id: 8, date: '2024-10-11', account: 'Cash', description: 'Office Supplies Co', debit: 0, credit: 340.50, balance: 493800 }
];

const journalData = [
  { 
    id: 'JE-001', 
    date: '2024-10-14', 
    lines: 2, 
    amount: 8920.00, 
    source: 'Bank Sync',
    entries: [
      { account: 'Cash', debit: 8920.00, credit: 0 },
      { account: 'Revenue', debit: 0, credit: 8920.00 }
    ]
  },
  { 
    id: 'JE-002', 
    date: '2024-10-13', 
    lines: 2, 
    amount: 1200.00, 
    source: 'Manual Entry',
    entries: [
      { account: 'Marketing Expense', debit: 1200.00, credit: 0 },
      { account: 'Cash', debit: 0, credit: 1200.00 }
    ]
  },
  { 
    id: 'JE-003', 
    date: '2024-10-12', 
    lines: 2, 
    amount: 15600.00, 
    source: 'Payroll Integration',
    entries: [
      { account: 'Payroll Expense', debit: 15600.00, credit: 0 },
      { account: 'Cash', debit: 0, credit: 15600.00 }
    ]
  }
];

const payeesData = [
  { id: 1, name: 'John Smith Consulting', ein: '***-**-1234', totalPaid: 15600, requires1099: true, status: 'Active' },
  { id: 2, name: 'Marketing Agency LLC', ein: '12-***7890', totalPaid: 8400, requires1099: true, status: 'Active' },
  { id: 3, name: 'Office Cleaning Service', ein: '***-**-5678', totalPaid: 2400, requires1099: true, status: 'Active' },
  { id: 4, name: 'Jane Doe Freelancer', ein: '***-**-9012', totalPaid: 4200, requires1099: true, status: 'Active' },
  { id: 5, name: 'Tech Support Co', ein: '34-***5678', totalPaid: 1800, requires1099: true, status: 'Active' },
  { id: 6, name: 'Legal Services Inc', ein: '***-**-3456', totalPaid: 450, requires1099: false, status: 'Inactive' }
];

// Tab component
const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition-all ${
      active 
        ? 'bg-neon-teal text-dark-bg font-medium' 
        : 'text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-border'
    }`}
  >
    {Icon && <Icon size={18} className="mr-2" />}
    {children}
  </button>
);

// Date Range Selector
const DateRangeSelector = ({ selectedRange, setSelectedRange }) => (
  <div className="flex items-center space-x-2 bg-dark-card border border-dark-border rounded-lg px-3 py-2">
    <Calendar size={16} className="text-dark-text-secondary" />
    <select 
      value={selectedRange}
      onChange={(e) => setSelectedRange(e.target.value)}
      className="bg-transparent text-sm focus:outline-none"
    >
      <option value="30">Last 30 Days</option>
      <option value="90">Last 90 Days</option>
      <option value="ytd">Year to Date</option>
      <option value="custom">Custom Range</option>
    </select>
  </div>
);

// Profit & Loss Tab
const ProfitLossTab = () => {
  const totalIncome = profitLossData.categories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalExpenses = profitLossData.expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm">Total Income</p>
              <p className="text-2xl font-bold text-neon-lime">${(totalIncome / 1000).toFixed(0)}k</p>
            </div>
            <TrendingUp className="text-neon-lime" size={24} />
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm">Total Expenses</p>
              <p className="text-2xl font-bold text-red-400">${(totalExpenses / 1000).toFixed(0)}k</p>
            </div>
            <TrendingDown className="text-red-400" size={24} />
          </div>
        </div>
        
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-dark-text-secondary text-sm">Net Profit</p>
              <p className="text-2xl font-bold text-neon-teal">${(netProfit / 1000).toFixed(0)}k</p>
            </div>
            <DollarSign className="text-neon-teal" size={24} />
          </div>
        </div>
      </div>

      {/* Income vs Expenses Chart */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={profitLossData.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="income" 
              stackId="1" 
              stroke="#84CC16" 
              fill="#84CC16" 
              fillOpacity={0.8}
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stackId="1" 
              stroke="#EF4444" 
              fill="#EF4444" 
              fillOpacity={0.8}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Income and Expense Breakdown Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Breakdown */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Income Breakdown</h3>
          <div className="space-y-3">
            {profitLossData.categories.map((cat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-dark-text-secondary">{cat.category}</span>
                <div className="text-right">
                  <span className="font-medium">${(cat.amount / 1000).toFixed(0)}k</span>
                  <span className="text-sm text-dark-text-muted ml-2">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            {profitLossData.expenseCategories.map((cat, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-dark-text-secondary">{cat.category}</span>
                <div className="text-right">
                  <span className="font-medium">${(cat.amount / 1000).toFixed(0)}k</span>
                  <span className="text-sm text-dark-text-muted ml-2">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Balance Sheet Tab
const BalanceSheetTab = () => {
  const totalCurrentAssets = balanceSheetData.assets.currentAssets.reduce((sum, item) => sum + item.amount, 0);
  const totalFixedAssets = balanceSheetData.assets.fixedAssets.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;
  
  const totalCurrentLiabilities = balanceSheetData.liabilities.currentLiabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalLongTermLiabilities = balanceSheetData.liabilities.longTermLiabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;
  
  const totalEquity = balanceSheetData.equity.reduce((sum, item) => sum + item.amount, 0);
  const liabilitiesAndEquity = totalLiabilities + totalEquity;

  return (
    <div className="space-y-6">
      {/* Balance Check */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Balance Sheet Equation</h3>
          <div className="flex justify-center items-center space-x-4 text-lg">
            <span className="text-neon-lime font-bold">${(totalAssets / 1000).toFixed(0)}k Assets</span>
            <span>=</span>
            <span className="text-red-400 font-bold">${(totalLiabilities / 1000).toFixed(0)}k Liabilities</span>
            <span>+</span>
            <span className="text-neon-teal font-bold">${(totalEquity / 1000).toFixed(0)}k Equity</span>
          </div>
          <div className="mt-2">
            <span className={`text-sm ${totalAssets === liabilitiesAndEquity ? 'text-neon-lime' : 'text-red-400'}`}>
              {totalAssets === liabilitiesAndEquity ? '✓ Balanced' : '⚠ Unbalanced'}
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Assets</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-neon-lime mb-2">Current Assets</h4>
              {balanceSheetData.assets.currentAssets.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-dark-text-secondary">{item.account}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-dark-border pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total Current Assets</span>
                  <span>${totalCurrentAssets.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-neon-lime mb-2">Fixed Assets</h4>
              {balanceSheetData.assets.fixedAssets.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-dark-text-secondary">{item.account}</span>
                  <span className={item.amount < 0 ? 'text-red-400' : ''}>
                    ${item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t border-dark-border pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total Fixed Assets</span>
                  <span>${totalFixedAssets.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-neon-lime pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL ASSETS</span>
                <span>${totalAssets.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liabilities & Equity */}
        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Liabilities & Equity</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-red-400 mb-2">Current Liabilities</h4>
              {balanceSheetData.liabilities.currentLiabilities.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-dark-text-secondary">{item.account}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-dark-border pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total Current Liabilities</span>
                  <span>${totalCurrentLiabilities.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-red-400 mb-2">Long-term Liabilities</h4>
              {balanceSheetData.liabilities.longTermLiabilities.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-dark-text-secondary">{item.account}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-dark-border pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total Long-term Liabilities</span>
                  <span>${totalLongTermLiabilities.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-neon-teal mb-2">Equity</h4>
              {balanceSheetData.equity.map((item, index) => (
                <div key={index} className="flex justify-between py-1">
                  <span className="text-dark-text-secondary">{item.account}</span>
                  <span>${item.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-dark-border pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total Equity</span>
                  <span>${totalEquity.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-neon-teal pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span>${liabilitiesAndEquity.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// General Ledger Tab
const GeneralLedgerTab = () => {
  const [accountFilter, setAccountFilter] = useState('all');
  
  const filteredEntries = accountFilter === 'all' 
    ? generalLedgerData 
    : generalLedgerData.filter(entry => entry.account.toLowerCase().includes(accountFilter.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-4">
        <select 
          value={accountFilter}
          onChange={(e) => setAccountFilter(e.target.value)}
          className="bg-dark-card border border-dark-border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-teal"
        >
          <option value="all">All Accounts</option>
          <option value="cash">Cash</option>
          <option value="revenue">Revenue</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* General Ledger Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Account</th>
                <th className="text-left p-4 font-medium">Description</th>
                <th className="text-right p-4 font-medium">Debit</th>
                <th className="text-right p-4 font-medium">Credit</th>
                <th className="text-right p-4 font-medium">Balance</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-dark-border hover:bg-dark-bg">
                  <td className="p-4 text-dark-text-secondary">{entry.date}</td>
                  <td className="p-4 font-medium">{entry.account}</td>
                  <td className="p-4 text-dark-text-secondary">{entry.description}</td>
                  <td className="p-4 text-right font-mono">
                    {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}
                  </td>
                  <td className="p-4 text-right font-mono">
                    {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}
                  </td>
                  <td className="p-4 text-right font-mono font-medium">
                    ${entry.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Journal List Tab
const JournalListTab = () => {
  const [expandedJournal, setExpandedJournal] = useState(null);

  return (
    <div className="space-y-6">
      {/* Journal Entries Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="text-left p-4 font-medium">Journal ID</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-center p-4 font-medium">Lines</th>
                <th className="text-right p-4 font-medium">Amount</th>
                <th className="text-left p-4 font-medium">Source</th>
                <th className="text-center p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {journalData.map((journal) => (
                <React.Fragment key={journal.id}>
                  <tr className="border-b border-dark-border hover:bg-dark-bg">
                    <td className="p-4 font-medium text-neon-teal">{journal.id}</td>
                    <td className="p-4 text-dark-text-secondary">{journal.date}</td>
                    <td className="p-4 text-center">{journal.lines}</td>
                    <td className="p-4 text-right font-mono">${journal.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        journal.source === 'Bank Sync' ? 'bg-neon-lime bg-opacity-20 text-neon-lime' :
                        journal.source === 'Manual Entry' ? 'bg-neon-purple bg-opacity-20 text-neon-purple' :
                        'bg-neon-teal bg-opacity-20 text-neon-teal'
                      }`}>
                        {journal.source}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setExpandedJournal(expandedJournal === journal.id ? null : journal.id)}
                        className="text-neon-teal hover:text-neon-lime transition-colors"
                      >
                        {expandedJournal === journal.id ? 'Collapse' : 'Expand'}
                      </button>
                    </td>
                  </tr>
                  {expandedJournal === journal.id && (
                    <tr>
                      <td colSpan="6" className="p-0">
                        <div className="bg-dark-bg p-4 border-t border-dark-border">
                          <h4 className="font-medium mb-2">Journal Entry Details</h4>
                          <div className="space-y-1">
                            {journal.entries.map((entry, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-dark-text-secondary">{entry.account}</span>
                                <div className="flex space-x-4">
                                  <span className="w-20 text-right">
                                    {entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : '-'}
                                  </span>
                                  <span className="w-20 text-right">
                                    {entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : '-'}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 1099 Payees Tab
const PayeesTab = () => {
  const handleExportCSV = () => {
    // Mock CSV export
    console.log('Exporting 1099 payees to CSV...');
  };

  return (
    <div className="space-y-6">
      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={handleExportCSV}
          className="flex items-center px-4 py-2 bg-neon-teal text-dark-bg rounded-lg hover:bg-opacity-80 transition-colors"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </button>
      </div>

      {/* 1099 Payees Table */}
      <div className="bg-dark-card border border-dark-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-bg border-b border-dark-border">
              <tr>
                <th className="text-left p-4 font-medium">Payee</th>
                <th className="text-left p-4 font-medium">EIN/SSN</th>
                <th className="text-right p-4 font-medium">Total Paid (YTD)</th>
                <th className="text-center p-4 font-medium">Requires 1099?</th>
                <th className="text-center p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {payeesData.map((payee) => (
                <tr 
                  key={payee.id} 
                  className={`border-b border-dark-border hover:bg-dark-bg ${
                    payee.totalPaid > 600 ? 'bg-yellow-500 bg-opacity-5' : ''
                  }`}
                >
                  <td className="p-4 font-medium">{payee.name}</td>
                  <td className="p-4 text-dark-text-secondary font-mono">{payee.ein}</td>
                  <td className="p-4 text-right font-mono">
                    <span className={payee.totalPaid > 600 ? 'text-yellow-400 font-bold' : ''}>
                      ${payee.totalPaid.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payee.requires1099 
                        ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' 
                        : 'bg-gray-500 bg-opacity-20 text-gray-400'
                    }`}>
                      {payee.requires1099 ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payee.status === 'Active' 
                        ? 'bg-neon-lime bg-opacity-20 text-neon-lime' 
                        : 'bg-red-500 bg-opacity-20 text-red-400'
                    }`}>
                      {payee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 1099 Threshold Notice */}
      <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <div className="text-yellow-400 mt-1">⚠️</div>
          <div>
            <h4 className="font-medium text-yellow-400 mb-1">1099 Threshold Alert</h4>
            <p className="text-sm text-dark-text-secondary">
              Payees with total payments over $600 are highlighted and may require 1099-NEC forms for tax reporting.
              {' '}
              <span className="text-yellow-400 font-medium">
                {payeesData.filter(p => p.totalPaid > 600).length} payees
              </span>
              {' '}currently meet this threshold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Reports Component
const Reports = () => {
  const [activeTab, setActiveTab] = useState('profit-loss');
  const [dateRange, setDateRange] = useState('ytd');

  const tabs = [
    { id: 'profit-loss', label: 'Profit & Loss', icon: TrendingUp },
    { id: 'balance-sheet', label: 'Balance Sheet', icon: BarChart3 },
    { id: 'general-ledger', label: 'General Ledger', icon: FileText },
    { id: 'journal-list', label: 'Journal List', icon: FileText },
    { id: '1099-payees', label: '1099 Payees', icon: Users },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profit-loss':
        return <ProfitLossTab />;
      case 'balance-sheet':
        return <BalanceSheetTab />;
      case 'general-ledger':
        return <GeneralLedgerTab />;
      case 'journal-list':
        return <JournalListTab />;
      case '1099-payees':
        return <PayeesTab />;
      default:
        return <ProfitLossTab />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-dark-text-secondary">Comprehensive financial reporting and analysis</p>
        </div>
        <DateRangeSelector selectedRange={dateRange} setSelectedRange={setDateRange} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-dark-border pb-4">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            icon={tab.icon}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default Reports;
