import { mockTransactions } from '../data/mockData';

/**
 * Calculate key financial metrics from transaction data
 */
export const calculateMetrics = () => {
  const totalIncoming = mockTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalOutgoing = mockTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netCashFlow = totalIncoming - totalOutgoing;
  const currentBalance = 485000; // Mock balance
  const monthlyBurn = totalOutgoing;
  const runway = Math.floor(currentBalance / monthlyBurn);
  
  const autoCount = mockTransactions.filter(t => t.confidence >= 0.9).length;
  const reviewCount = mockTransactions.filter(t => t.confidence >= 0.6 && t.confidence < 0.9).length;
  const manualCount = mockTransactions.filter(t => t.confidence < 0.6).length;
  const accuracy = ((autoCount / mockTransactions.length) * 100).toFixed(1);
  
  return {
    netCashFlow,
    currentBalance,
    runway,
    totalTransactions: mockTransactions.length,
    autoCount,
    reviewCount,
    manualCount,
    accuracy
  };
};

/**
 * Get status badge based on confidence level
 */
export const getStatusBadge = (confidence) => {
  if (confidence >= 0.9) return { text: 'Auto', class: 'badge-auto' };
  if (confidence >= 0.6) return { text: 'Needs Review', class: 'badge-review' };
  return { text: 'Manual', class: 'badge-manual' };
};

/**
 * Get status color based on confidence level
 */
export const getStatusColor = (confidence) => {
  if (confidence >= 0.9) return 'text-green-400';
  if (confidence >= 0.6) return 'text-yellow-400';
  return 'text-red-400';
};

/**
 * Format currency values
 */
export const formatCurrency = (amount) => {
  return `$${Math.abs(amount).toLocaleString()}`;
};

/**
 * Format date strings
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};
