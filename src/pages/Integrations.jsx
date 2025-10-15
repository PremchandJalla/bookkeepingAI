import { useState } from 'react';
import { 
  BanknotesIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  UsersIcon,
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

const Integrations = () => {
  const [connections, setConnections] = useState([
    {
      id: 'chase-bank',
      name: 'Chase Business Banking',
      type: 'Bank',
      status: 'Connected',
      lastSyncAt: '2 minutes ago',
      icon: BanknotesIcon,
      color: 'neon-teal'
    },
    {
      id: 'shopify-store',
      name: 'Shopify Store',
      type: 'E-commerce',
      status: 'Connected',
      lastSyncAt: '1 hour ago',
      icon: ShoppingBagIcon,
      color: 'neon-lime'
    },
    {
      id: 'paypal-business',
      name: 'PayPal Business',
      type: 'Payment Processor',
      status: 'Needs Attention',
      lastSyncAt: '3 days ago',
      icon: CreditCardIcon,
      color: 'yellow-500'
    },
    {
      id: 'stripe-payments',
      name: 'Stripe Payments',
      type: 'Payment Processor',
      status: 'Connected',
      lastSyncAt: '30 minutes ago',
      icon: CreditCardIcon,
      color: 'neon-purple'
    },
    {
      id: 'gusto-payroll',
      name: 'Gusto Payroll',
      type: 'Payroll',
      status: 'Needs Attention',
      lastSyncAt: '1 week ago',
      icon: UsersIcon,
      color: 'red-500'
    },
    {
      id: 'wells-fargo',
      name: 'Wells Fargo Business',
      type: 'Bank',
      status: 'Connected',
      lastSyncAt: '5 minutes ago',
      icon: BanknotesIcon,
      color: 'neon-cyan'
    },
    {
      id: 'quickbooks-online',
      name: 'QuickBooks Online',
      type: 'Accounting Software',
      status: 'Connected',
      lastSyncAt: '15 minutes ago',
      icon: CloudArrowUpIcon,
      color: 'neon-teal'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [syncingItems, setSyncingItems] = useState(new Set());

  // Available providers for connection
  const availableProviders = [
    { 
      id: 'quickbooks', 
      name: 'QuickBooks Online', 
      type: 'Accounting Software', 
      icon: CloudArrowUpIcon, 
      color: 'neon-teal',
      featured: true,
      description: 'Sync transactions, customers, and financial data'
    },
    { 
      id: 'quickbooks-desktop', 
      name: 'QuickBooks Desktop', 
      type: 'Accounting Software', 
      icon: CloudArrowUpIcon, 
      color: 'neon-teal',
      description: 'Connect your QuickBooks Desktop via Web Connector'
    },
    { id: 'square', name: 'Square', type: 'Payment Processor', icon: CreditCardIcon, color: 'gray-500' },
    { id: 'amazon', name: 'Amazon Business', type: 'E-commerce', icon: ShoppingBagIcon, color: 'yellow-500' },
    { id: 'adp', name: 'ADP Payroll', type: 'Payroll', icon: UsersIcon, color: 'neon-lime' },
    { id: 'bank-america', name: 'Bank of America', type: 'Bank', icon: BanknotesIcon, color: 'red-500' },
    { id: 'venmo', name: 'Venmo Business', type: 'Payment Processor', icon: CreditCardIcon, color: 'neon-cyan' },
    { id: 'etsy', name: 'Etsy Shop', type: 'E-commerce', icon: ShoppingBagIcon, color: 'yellow-500' },
    { id: 'woocommerce', name: 'WooCommerce', type: 'E-commerce', icon: ShoppingBagIcon, color: 'neon-purple' }
  ];

  const filteredProviders = availableProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSync = async (connectionId) => {
    setSyncingItems(prev => new Set([...prev, connectionId]));
    
    // Special handling for QuickBooks connections
    const isQuickBooks = connectionId.includes('quickbooks');
    const syncTime = isQuickBooks ? 3000 : 2000; // QuickBooks takes longer
    
    // Simulate sync process
    setTimeout(() => {
      setSyncingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
      
      // Update last sync time and show sync success
      setConnections(prev => prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, lastSyncAt: 'Just now', status: 'Connected' }
          : conn
      ));

      // Show success notification for QuickBooks
      if (isQuickBooks) {
        console.log('QuickBooks sync completed: Transactions, Customers, and Invoices synced successfully');
      }
    }, syncTime);
  };

  const handleConnect = (provider) => {
    // Simulate connection process
    const newConnection = {
      id: provider.id,
      name: provider.name,
      type: provider.type,
      status: 'Connected',
      lastSyncAt: 'Just now',
      icon: provider.icon,
      color: provider.color
    };

    setConnections(prev => [...prev, newConnection]);
    setIsModalOpen(false);
    setSearchTerm('');
  };

  const getStatusBadge = (status) => {
    if (status === 'Connected') {
      return (
        <div className="flex items-center space-x-1">
          <CheckCircleIcon className="w-4 h-4 text-neon-lime" />
          <span className="text-neon-lime font-medium">Connected</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1">
          <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-medium">Needs Attention</span>
        </div>
      );
    }
  };

  const getHealthBadge = (status) => {
    if (status === 'Connected') {
      return (
        <span className="inline-block w-2 h-2 bg-neon-lime rounded-full shadow-neon"></span>
      );
    } else {
      return (
        <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full"></span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-text-primary">Integrations</h1>
            <p className="text-dark-text-secondary mt-2">Manage your connected accounts and data sources</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-neon-teal hover:bg-neon-teal/80 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 text-white"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Connect New</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Total Connections</p>
                <p className="text-2xl font-bold text-neon-teal">{connections.length}</p>
              </div>
              <LinkIcon className="w-8 h-8 text-neon-teal" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Active Connections</p>
                <p className="text-2xl font-bold text-neon-lime">
                  {connections.filter(c => c.status === 'Connected').length}
                </p>
              </div>
              <CheckCircleIcon className="w-8 h-8 text-neon-lime" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Need Attention</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {connections.filter(c => c.status === 'Needs Attention').length}
                </p>
              </div>
              <ExclamationTriangleIcon className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const IconComponent = connection.icon;
            const isSyncing = syncingItems.has(connection.id);
            
            const getColorClasses = (color) => {
              const colorMap = {
                'neon-teal': { bg: 'bg-neon-teal/20', text: 'text-neon-teal' },
                'neon-lime': { bg: 'bg-neon-lime/20', text: 'text-neon-lime' },
                'neon-purple': { bg: 'bg-neon-purple/20', text: 'text-neon-purple' },
                'neon-cyan': { bg: 'bg-neon-cyan/20', text: 'text-neon-cyan' },
                'yellow-500': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
                'red-500': { bg: 'bg-red-500/20', text: 'text-red-400' },
                'gray-500': { bg: 'bg-gray-500/20', text: 'text-gray-400' }
              };
              return colorMap[color] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
            };
            
            const colorClasses = getColorClasses(connection.color);
            
            return (
              <div key={connection.id} className="bg-dark-card p-6 rounded-lg border border-dark-border hover:border-neon-teal/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{connection.name}</h3>
                      <p className="text-dark-text-secondary text-sm">{connection.type}</p>
                    </div>
                  </div>
                  {getHealthBadge(connection.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-text-secondary text-sm">Status</span>
                    {getStatusBadge(connection.status)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-dark-text-secondary text-sm">Last Sync</span>
                    <span className="text-dark-text-primary text-sm">{connection.lastSyncAt}</span>
                  </div>

                  <button
                    onClick={() => handleSync(connection.id)}
                    disabled={isSyncing}
                    className="w-full bg-dark-border hover:bg-neon-teal/20 disabled:bg-dark-border disabled:opacity-50 p-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-neon-teal hover:text-white"
                  >
                    <ArrowPathIcon className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>
                      {isSyncing 
                        ? connection.id.includes('quickbooks') 
                          ? 'Syncing QB Data...' 
                          : 'Syncing...'
                        : 'Sync Now'
                      }
                    </span>
                  </button>
                  
                  {/* QuickBooks-specific sync details */}
                  {connection.id.includes('quickbooks') && (
                    <div className="mt-2 p-2 bg-neon-teal/10 rounded border border-neon-teal/20">
                      <p className="text-xs text-neon-teal font-medium">QuickBooks API Connected</p>
                      <p className="text-xs text-dark-text-muted">
                        Syncs: Transactions, Customers, Invoices, Chart of Accounts
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Connect New Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-card rounded-lg border border-dark-border w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-glow">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <div>
                  <h2 className="text-xl font-bold text-dark-text-primary">Connect New Integration</h2>
                  <p className="text-dark-text-secondary text-sm">Choose from available providers</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-dark-text-secondary hover:text-neon-teal transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Search */}
              <div className="p-6 border-b border-dark-border">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-dark-text-secondary absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
                  />
                </div>
              </div>

              {/* Providers List */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Featured Integrations */}
                {filteredProviders.some(p => p.featured) && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-dark-text-primary mb-3">Featured</h3>
                    <div className="space-y-3">
                      {filteredProviders.filter(provider => provider.featured).map((provider) => {
                        const IconComponent = provider.icon;
                        const isAlreadyConnected = connections.some(conn => conn.id === provider.id);
                        
                        const getProviderColorClasses = (color) => {
                          const colorMap = {
                            'neon-teal': { bg: 'bg-neon-teal/20', text: 'text-neon-teal' },
                            'neon-lime': { bg: 'bg-neon-lime/20', text: 'text-neon-lime' },
                            'neon-purple': { bg: 'bg-neon-purple/20', text: 'text-neon-purple' },
                            'neon-cyan': { bg: 'bg-neon-cyan/20', text: 'text-neon-cyan' },
                            'yellow-500': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
                            'red-500': { bg: 'bg-red-500/20', text: 'text-red-400' },
                            'gray-500': { bg: 'bg-gray-500/20', text: 'text-gray-400' }
                          };
                          return colorMap[color] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
                        };
                        
                        const providerColorClasses = getProviderColorClasses(provider.color);
                        
                        return (
                          <div key={provider.id} className="p-4 bg-dark-bg rounded-lg border border-neon-teal/30 hover:border-neon-teal/60 transition-colors shadow-glow">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${providerColorClasses.bg}`}>
                                  <IconComponent className={`w-5 h-5 ${providerColorClasses.text}`} />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-medium text-dark-text-primary">{provider.name}</h3>
                                    <span className="px-2 py-0.5 text-xs bg-neon-teal/20 text-neon-teal rounded-full">
                                      Featured
                                    </span>
                                  </div>
                                  <p className="text-dark-text-secondary text-sm">{provider.type}</p>
                                  {provider.description && (
                                    <p className="text-dark-text-muted text-xs mt-1">{provider.description}</p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => handleConnect(provider)}
                                disabled={isAlreadyConnected}
                                className="bg-neon-teal hover:bg-neon-teal/80 disabled:bg-dark-border disabled:text-dark-text-muted px-4 py-2 rounded-lg font-medium transition-colors text-white"
                              >
                                {isAlreadyConnected ? 'Connected' : 'Connect'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* All Integrations */}
                <div>
                  <h3 className="text-lg font-semibold text-dark-text-primary mb-3">All Integrations</h3>
                  <div className="space-y-3">
                    {filteredProviders.filter(provider => !provider.featured).map((provider) => {
                      const IconComponent = provider.icon;
                      const isAlreadyConnected = connections.some(conn => conn.id === provider.id);
                      
                      const getProviderColorClasses = (color) => {
                        const colorMap = {
                          'neon-teal': { bg: 'bg-neon-teal/20', text: 'text-neon-teal' },
                          'neon-lime': { bg: 'bg-neon-lime/20', text: 'text-neon-lime' },
                          'neon-purple': { bg: 'bg-neon-purple/20', text: 'text-neon-purple' },
                          'neon-cyan': { bg: 'bg-neon-cyan/20', text: 'text-neon-cyan' },
                          'yellow-500': { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
                          'red-500': { bg: 'bg-red-500/20', text: 'text-red-400' },
                          'gray-500': { bg: 'bg-gray-500/20', text: 'text-gray-400' }
                        };
                        return colorMap[color] || { bg: 'bg-gray-500/20', text: 'text-gray-400' };
                      };
                      
                      const providerColorClasses = getProviderColorClasses(provider.color);
                      
                      return (
                        <div key={provider.id} className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border hover:border-neon-teal/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${providerColorClasses.bg}`}>
                              <IconComponent className={`w-5 h-5 ${providerColorClasses.text}`} />
                            </div>
                            <div>
                              <h3 className="font-medium text-dark-text-primary">{provider.name}</h3>
                              <p className="text-dark-text-secondary text-sm">{provider.type}</p>
                              {provider.description && (
                                <p className="text-dark-text-muted text-xs mt-1">{provider.description}</p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleConnect(provider)}
                            disabled={isAlreadyConnected}
                            className="bg-neon-teal hover:bg-neon-teal/80 disabled:bg-dark-border disabled:text-dark-text-muted px-4 py-2 rounded-lg font-medium transition-colors text-white"
                          >
                            {isAlreadyConnected ? 'Connected' : 'Connect'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {filteredProviders.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-dark-text-secondary">No integrations found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Integrations;
