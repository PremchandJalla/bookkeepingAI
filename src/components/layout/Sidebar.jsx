import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  FolderOpen,
  Settings,
  BarChart3,
  Calculator,
  Cable
} from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FolderOpen },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'tax-center', label: 'Tax Center', icon: Calculator },
    { id: 'integrations', label: 'Integrations', icon: Cable },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-dark-card border-r border-dark-border h-screen p-6"
    >
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neon-teal">AI Bookkeeping</h2>
        <p className="text-dark-text-muted text-sm">Dashboard v2.0</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <IconComponent size={20} className="mr-3" />
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="text-xs text-dark-text-muted text-center">
          Prototype Demo — AI Bookkeeping Dashboard (Dark Theme)
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
