import React from 'react';
import { TrendingUp, DollarSign, Clock } from 'lucide-react';
import MetricCard from '../components/dashboard/MetricCard';
import CashFlowChart from '../components/dashboard/CashFlowChart';
import ExpenseBreakdown from '../components/dashboard/ExpenseBreakdown';
import AISummary from '../components/dashboard/AISummary';
import TasksAlerts from '../components/dashboard/TasksAlerts';
import { calculateMetrics } from '../utils/calculations';

const Dashboard = () => {
  const metrics = calculateMetrics();
  
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Net Cash Flow"
          value={`$${(metrics.netCashFlow / 1000).toFixed(0)}k`}
          change="+12.5%"
          icon={TrendingUp}
          color="neon-lime"
        />
        <MetricCard
          title="Current Cash Balance"
          value="$485k"
          change="+8.2%"
          icon={DollarSign}
          color="neon-teal"
        />
        <MetricCard
          title="Free Cash Flow"
          value="$142k"
          change="+15.3%"
          icon={TrendingUp}
          color="neon-purple"
        />
        <MetricCard
          title="Runway"
          value={`${metrics.runway} Months`}
          change="-2 months"
          icon={Clock}
          color="neon-cyan"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CashFlowChart />
        <ExpenseBreakdown />
      </div>

      {/* AI Summary and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AISummary />
        <TasksAlerts />
      </div>
    </div>
  );
};

export default Dashboard;
