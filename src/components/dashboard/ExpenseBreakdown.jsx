import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { expenseCategories } from '../../data/mockData';

const ExpenseBreakdown = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={expenseCategories}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
          >
            {expenseCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#161B22', 
              border: '1px solid #1E2533',
              borderRadius: '8px'
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {expenseCategories.map((category) => (
          <div key={category.name} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-dark-text-secondary">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
