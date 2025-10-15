import React from 'react';
import { motion } from 'framer-motion';
import { mockTransactions } from '../../data/mockData';
import { getStatusBadge, getStatusColor, formatCurrency, formatDate } from '../../utils/calculations';

const TransactionsTable = () => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-dark-text-secondary">Showing {mockTransactions.length} transactions</span>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 font-medium text-dark-text-secondary">Date</th>
              <th className="text-left py-3 px-4 font-medium text-dark-text-secondary">Vendor</th>
              <th className="text-right py-3 px-4 font-medium text-dark-text-secondary">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-dark-text-secondary">Category</th>
              <th className="text-center py-3 px-4 font-medium text-dark-text-secondary">Confidence</th>
              <th className="text-center py-3 px-4 font-medium text-dark-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((transaction, index) => {
              const statusBadge = getStatusBadge(transaction.confidence);
              return (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-dark-border hover:bg-dark-card/50 transition-colors"
                >
                  <td className="py-3 px-4 text-dark-text-primary">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 px-4 text-dark-text-primary font-medium">
                    {transaction.vendor}
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="py-3 px-4 text-dark-text-secondary">
                    {transaction.category}
                  </td>
                  <td className={`py-3 px-4 text-center font-mono ${getStatusColor(transaction.confidence)}`}>
                    {(transaction.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={statusBadge.class}>{statusBadge.text}</span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
