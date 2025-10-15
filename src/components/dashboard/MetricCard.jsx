import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, color = 'neon-teal' }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="metric-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-dark-text-secondary text-sm font-medium">{title}</h3>
        <Icon size={20} className={`text-${color}`} />
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      {change && (
        <div className={`text-sm flex items-center ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
          {change.startsWith('+') ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
          {change}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
