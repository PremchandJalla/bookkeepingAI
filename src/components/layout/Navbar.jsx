import React from 'react';
import { ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="bg-dark-card border-b border-dark-border px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Hi Sam! 👋</h1>
        <p className="text-dark-text-secondary">Here's what's happening with your business today</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-dark-bg border border-dark-border rounded-lg px-3 py-2">
          <span className="text-sm">Oct 2025</span>
          <ChevronDown size={16} />
        </div>
        
        <div className="w-10 h-10 bg-neon-teal rounded-full flex items-center justify-center">
          <User size={20} className="text-dark-bg" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
