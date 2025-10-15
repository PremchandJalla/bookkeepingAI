import React, { useState } from 'react';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

// Page Components  
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary flex">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1">
        <Navbar />
        
        <main className="p-6">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'transactions' && <Transactions />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;
