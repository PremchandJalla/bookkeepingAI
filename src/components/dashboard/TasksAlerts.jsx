import React from 'react';
import { AlertTriangle, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { calculateMetrics } from '../../utils/calculations';

const TasksAlerts = () => {
  const metrics = calculateMetrics();

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <AlertTriangle size={20} className="mr-2 text-yellow-400" />
        Tasks & Alerts
      </h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-center">
            <Eye size={16} className="mr-2 text-yellow-400" />
            <span className="text-sm">Transactions Need Review</span>
          </div>
          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">
            {metrics.reviewCount + metrics.manualCount}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="flex items-center">
            <FileText size={16} className="mr-2 text-blue-400" />
            <span className="text-sm">Documents Requested</span>
          </div>
          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs">3</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="flex items-center">
            <CheckCircle2 size={16} className="mr-2 text-green-400" />
            <span className="text-sm">Taxes Ready for Signature</span>
          </div>
          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Ready</span>
        </div>
      </div>
    </div>
  );
};

export default TasksAlerts;
