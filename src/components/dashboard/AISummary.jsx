import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { calculateMetrics } from '../../utils/calculations';

const AISummary = () => {
  const metrics = calculateMetrics();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <CheckCircle2 size={20} className="mr-2 text-neon-teal" />
        AI Categorization Summary
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-dark-text-secondary">Total Transactions</span>
          <span className="font-semibold">{metrics.totalTransactions}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-dark-text-secondary">Auto-Categorized</span>
          <span className="font-semibold text-green-400">{metrics.autoCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-dark-text-secondary">Needs Review</span>
          <span className="font-semibold text-yellow-400">{metrics.reviewCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-dark-text-secondary">Manual Required</span>
          <span className="font-semibold text-red-400">{metrics.manualCount}</span>
        </div>
        <div className="border-t border-dark-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-dark-text-secondary">AI Accuracy</span>
            <span className="font-semibold text-neon-teal">{metrics.accuracy}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISummary;
