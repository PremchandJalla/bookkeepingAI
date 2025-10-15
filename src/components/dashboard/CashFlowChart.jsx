import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line
} from 'recharts';
import { cashFlowData } from '../../data/mockData';

const CashFlowChart = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Cash Flow Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cashFlowData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2533" />
          <XAxis dataKey="month" stroke="#8B949E" />
          <YAxis stroke="#8B949E" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #1E2533',
              borderRadius: '8px'
            }} 
          />
          <Bar dataKey="incoming" fill="#00D9FF" name="Incoming" />
          <Bar dataKey="outgoing" fill="#EF4444" name="Outgoing" />
          <Line 
            type="monotone" 
            dataKey="net" 
            stroke="#84CC16" 
            strokeWidth={3}
            name="Net"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowChart;
