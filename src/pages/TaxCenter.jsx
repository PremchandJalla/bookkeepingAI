import { useState } from 'react';
import { 
  CalendarDaysIcon, 
  CheckCircleIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const TaxCenter = () => {
  const [checkedTasks, setCheckedTasks] = useState({
    reconcile: false,
    flaggedTransactions: false,
    uploadDocs: false,
    confirmInfo: false
  });

  // Mock data for KPIs
  const taxMetrics = {
    estimatedLiability: 18500,
    deductionsIdentified: 12300,
    filingStatus: 'S-Corp',
    deadline: 'March 15, 2026'
  };

  // Progress calculation
  const completedTasks = Object.values(checkedTasks).filter(Boolean).length;
  const totalTasks = Object.keys(checkedTasks).length;
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  // Checklist items
  const checklistItems = [
    {
      id: 'reconcile',
      title: 'Reconcile all bank accounts',
      description: 'Ensure all transactions are categorized and matched',
      status: '12/12 accounts completed',
      icon: DocumentCheckIcon
    },
    {
      id: 'flaggedTransactions',
      title: 'Review flagged transactions',
      description: 'Review and categorize 8 flagged transactions',
      status: '3/8 reviewed',
      icon: ExclamationTriangleIcon
    },
    {
      id: 'uploadDocs',
      title: 'Upload W-9s / 1099 confirmations',
      description: 'Upload tax documents and forms',
      status: '2/5 documents uploaded',
      icon: DocumentTextIcon
    },
    {
      id: 'confirmInfo',
      title: 'Confirm business info & signatures',
      description: 'Verify business details and authorize signatures',
      status: 'Pending review',
      icon: UserIcon
    }
  ];

  // Forms and exports
  const exportForms = [
    { name: 'Profit & Loss Statement', fileName: 'P&L_2025.pdf' },
    { name: 'Balance Sheet', fileName: 'Balance_Sheet_2025.pdf' },
    { name: 'Trial Balance', fileName: 'Trial_Balance_2025.pdf' },
    { name: '1099 CSV Export', fileName: '1099_Data_2025.csv' }
  ];

  // Questions for accountant
  const accountantQuestions = [
    "Are there any new deductions I should consider for 2025?",
    "Should I elect S-Corp status for tax year 2026?",
    "What's the best strategy for quarterly estimated payments?",
    "Are there any tax credits I might be eligible for?",
    "Should I accelerate or defer any income/expenses?"
  ];

  // Timeline dates
  const timeline = [
    { date: 'Jan 15, 2026', event: 'Q4 2025 Estimated Taxes Due', type: 'deadline' },
    { date: 'Mar 15, 2026', event: 'S-Corp Tax Return Due', type: 'critical' },
    { date: 'Apr 15, 2026', event: 'Individual Tax Return Due', type: 'deadline' },
    { date: 'Jun 15, 2026', event: 'Q1 2026 Estimated Taxes Due', type: 'upcoming' }
  ];

  const handleTaskToggle = (taskId) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleExport = (fileName) => {
    // Mock download action
    console.log(`Downloading ${fileName}`);
    alert(`Mock download started: ${fileName}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Tax Center</h1>
            <p className="text-gray-400 mt-2">Manage your tax preparation and filing requirements</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors">
            Prepare Tax Package
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Estimated Tax Liability</p>
                <p className="text-2xl font-bold text-red-400">${taxMetrics.estimatedLiability.toLocaleString()}</p>
              </div>
              <CurrencyDollarIcon className="w-8 h-8 text-red-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Deductions Identified</p>
                <p className="text-2xl font-bold text-green-400">${taxMetrics.deductionsIdentified.toLocaleString()}</p>
              </div>
              <DocumentTextIcon className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Filing Status</p>
                <span className="inline-block bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                  {taxMetrics.filingStatus}
                </span>
              </div>
              <UserIcon className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Filing Deadline</p>
                <p className="text-lg font-bold text-orange-400">{taxMetrics.deadline}</p>
              </div>
              <CalendarDaysIcon className="w-8 h-8 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Bar */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Tax Package Readiness</h2>
                <span className="text-2xl font-bold text-blue-400">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>

            {/* Checklist */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Tax Preparation Checklist</h2>
              <div className="space-y-4">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-750 rounded-lg border border-gray-600">
                    <div className="flex-shrink-0 mt-1">
                      <input
                        type="checkbox"
                        checked={checkedTasks[item.id]}
                        onChange={() => handleTaskToggle(item.id)}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-blue-400" />
                        <h3 className={`font-semibold ${checkedTasks[item.id] ? 'line-through text-gray-500' : 'text-white'}`}>
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                      <span className="inline-block bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs mt-2">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forms & Exports */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Forms & Exports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exportForms.map((form, index) => (
                  <button
                    key={index}
                    onClick={() => handleExport(form.fileName)}
                    className="flex items-center justify-between p-4 bg-gray-750 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">{form.name}</span>
                    </div>
                    <ArrowDownTrayIcon className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Questions for Accountant */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Questions for Your Accountant</h2>
              <div className="space-y-3">
                {accountantQuestions.map((question, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-750 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-300">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail - Timeline */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h2 className="text-xl font-bold mb-6">Key Tax Dates</h2>
              <div className="space-y-4">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-2 ${
                      item.type === 'critical' ? 'bg-red-500' :
                      item.type === 'deadline' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-white">{item.date}</p>
                      <p className="text-sm text-gray-400">{item.event}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                        item.type === 'critical' ? 'bg-red-900 text-red-300' :
                        item.type === 'deadline' ? 'bg-orange-900 text-orange-300' : 'bg-blue-900 text-blue-300'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-medium transition-colors">
                  Schedule Accountant Meeting
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-medium transition-colors">
                  View Tax Documents
                </button>
                <button className="w-full bg-gray-700 hover:bg-gray-600 p-3 rounded-lg font-medium transition-colors">
                  Set Deadline Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCenter;
