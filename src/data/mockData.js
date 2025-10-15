// Mock data for the application
export const mockTransactions = [
  { id: 1, date: '2024-10-14', vendor: 'Amazon AWS', amount: -2450.00, category: 'Business Operations', confidence: 0.95, status: 'auto' },
  { id: 2, date: '2024-10-13', vendor: 'Shopify Payment', amount: 8920.00, category: 'Revenue', confidence: 0.98, status: 'auto' },
  { id: 3, date: '2024-10-13', vendor: 'Facebook Ads', amount: -1200.00, category: 'Marketing', confidence: 0.92, status: 'auto' },
  { id: 4, date: '2024-10-12', vendor: 'Gusto Payroll', amount: -15600.00, category: 'Payroll', confidence: 0.97, status: 'auto' },
  { id: 5, date: '2024-10-12', vendor: 'Office Supplies Co', amount: -340.50, category: 'Office Expenses', confidence: 0.78, status: 'review' },
  { id: 6, date: '2024-10-11', vendor: 'Starbucks', amount: -45.80, category: 'Meals & Entertainment', confidence: 0.85, status: 'review' },
  { id: 7, date: '2024-10-11', vendor: 'Unknown Vendor LLC', amount: -890.00, category: 'Uncategorized', confidence: 0.45, status: 'manual' },
  { id: 8, date: '2024-10-10', vendor: 'PayPal Transfer', amount: 3200.00, category: 'Revenue', confidence: 0.89, status: 'review' },
  { id: 9, date: '2024-10-10', vendor: 'Google Workspace', amount: -180.00, category: 'Software', confidence: 0.94, status: 'auto' },
  { id: 10, date: '2024-10-09', vendor: 'Stripe Processing', amount: 12500.00, category: 'Revenue', confidence: 0.96, status: 'auto' },
];

export const cashFlowData = [
  { month: 'Jul', incoming: 45000, outgoing: -32000, net: 13000 },
  { month: 'Aug', incoming: 52000, outgoing: -38000, net: 14000 },
  { month: 'Sep', incoming: 48000, outgoing: -35000, net: 13000 },
  { month: 'Oct', incoming: 58000, outgoing: -42000, net: 16000 },
];

export const expenseCategories = [
  { name: 'Payroll', value: 45000, color: '#00D9FF' },
  { name: 'Marketing', value: 12000, color: '#8B5CF6' },
  { name: 'Operations', value: 8500, color: '#84CC16' },
  { name: 'Software', value: 5200, color: '#F59E0B' },
  { name: 'Other', value: 3800, color: '#EF4444' },
];
