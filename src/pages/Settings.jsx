import { useState } from 'react';
import { 
  BuildingOfficeIcon,
  CogIcon,
  PaintBrushIcon,
  CreditCardIcon,
  CheckIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const Settings = () => {
  // Company Profile State
  const [companyProfile, setCompanyProfile] = useState({
    name: 'Acme Business Solutions',
    ein: '12-3456789',
    address: {
      street: '123 Business Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102'
    },
    fiscalYearStart: 'January'
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    defaultCurrency: 'USD',
    timezone: 'America/Los_Angeles',
    numberFormat: 'US',
    emailNotifications: {
      weeklyReports: true,
      transactionAlerts: false,
      systemUpdates: true,
      taxReminders: true
    }
  });

  // Appearance State (locked to dark)
  const [appearance, setAppearance] = useState({
    theme: 'dark'
  });

  // Toast state
  const [showToast, setShowToast] = useState(false);

  const fiscalYearOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currencyOptions = [
    { code: 'USD', name: 'US Dollar ($)' },
    { code: 'EUR', name: 'Euro (€)' },
    { code: 'GBP', name: 'British Pound (£)' },
    { code: 'CAD', name: 'Canadian Dollar (C$)' },
    { code: 'JPY', name: 'Japanese Yen (¥)' }
  ];

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' },
    { value: 'UTC', label: 'UTC' }
  ];

  const numberFormatOptions = [
    { value: 'US', label: 'US (1,234.56)' },
    { value: 'EU', label: 'European (1.234,56)' },
    { value: 'IN', label: 'Indian (1,23,456.78)' }
  ];

  const maskEIN = (ein) => {
    return ein.replace(/\d(?=\d{4})/g, '*');
  };

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCompanyProfileChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setCompanyProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCompanyProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handlePreferencesChange = (field, value) => {
    if (field.startsWith('emailNotifications.')) {
      const notificationType = field.split('.')[1];
      setPreferences(prev => ({
        ...prev,
        emailNotifications: {
          ...prev.emailNotifications,
          [notificationType]: value
        }
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-dark-text-primary">Settings</h1>
          <p className="text-dark-text-secondary mt-2">Manage your company profile and preferences</p>
        </div>

        {/* Company Profile Section */}
        <div className="bg-dark-card rounded-lg border border-dark-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-neon-teal/20">
              <BuildingOfficeIcon className="w-6 h-6 text-neon-teal" />
            </div>
            <h2 className="text-xl font-semibold text-dark-text-primary">Company Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={companyProfile.name}
                onChange={(e) => handleCompanyProfileChange('name', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                EIN/TIN
              </label>
              <input
                type="text"
                value={maskEIN(companyProfile.ein)}
                readOnly
                className="w-full px-4 py-2 bg-dark-bg/50 border border-dark-border rounded-lg text-dark-text-secondary cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={companyProfile.address.street}
                onChange={(e) => handleCompanyProfileChange('address.street', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                City
              </label>
              <input
                type="text"
                value={companyProfile.address.city}
                onChange={(e) => handleCompanyProfileChange('address.city', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                State
              </label>
              <input
                type="text"
                value={companyProfile.address.state}
                onChange={(e) => handleCompanyProfileChange('address.state', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={companyProfile.address.zipCode}
                onChange={(e) => handleCompanyProfileChange('address.zipCode', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                Fiscal Year Start
              </label>
              <select
                value={companyProfile.fiscalYearStart}
                onChange={(e) => handleCompanyProfileChange('fiscalYearStart', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary focus:outline-none focus:border-neon-teal"
              >
                {fiscalYearOptions.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-dark-card rounded-lg border border-dark-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-neon-lime/20">
              <CogIcon className="w-6 h-6 text-neon-lime" />
            </div>
            <h2 className="text-xl font-semibold text-dark-text-primary">Preferences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                Default Currency
              </label>
              <select
                value={preferences.defaultCurrency}
                onChange={(e) => handlePreferencesChange('defaultCurrency', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary focus:outline-none focus:border-neon-teal"
              >
                {currencyOptions.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                Timezone
              </label>
              <select
                value={preferences.timezone}
                onChange={(e) => handlePreferencesChange('timezone', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary focus:outline-none focus:border-neon-teal"
              >
                {timezoneOptions.map(timezone => (
                  <option key={timezone.value} value={timezone.value}>
                    {timezone.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-dark-text-primary mb-2">
                Number Format
              </label>
              <select
                value={preferences.numberFormat}
                onChange={(e) => handlePreferencesChange('numberFormat', e.target.value)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-dark-text-primary focus:outline-none focus:border-neon-teal"
              >
                {numberFormatOptions.map(format => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-dark-text-primary mb-4 flex items-center space-x-2">
              <BellIcon className="w-5 h-5 text-neon-teal" />
              <span>Email Notifications</span>
            </h3>
            <div className="space-y-4">
              {Object.entries(preferences.emailNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-text-primary capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="text-sm text-dark-text-secondary">
                      {key === 'weeklyReports' && 'Receive weekly financial summaries'}
                      {key === 'transactionAlerts' && 'Get notified of new transactions'}
                      {key === 'systemUpdates' && 'Important system and feature updates'}
                      {key === 'taxReminders' && 'Tax deadline and filing reminders'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePreferencesChange(`emailNotifications.${key}`, !value)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-neon-teal' : 'bg-dark-border'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-dark-card rounded-lg border border-dark-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-neon-purple/20">
              <PaintBrushIcon className="w-6 h-6 text-neon-purple" />
            </div>
            <h2 className="text-xl font-semibold text-dark-text-primary">Appearance</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-text-primary mb-4">
              Theme
            </label>
            <div className="flex items-center justify-between p-4 bg-dark-bg rounded-lg border border-dark-border">
              <div className="flex items-center space-x-3">
                <MoonIcon className="w-5 h-5 text-neon-purple" />
                <div>
                  <p className="text-dark-text-primary">Dark Mode</p>
                  <p className="text-sm text-dark-text-secondary">Currently active theme</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-dark-text-secondary">Light</span>
                <button
                  disabled
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-neon-purple cursor-not-allowed"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </button>
                <span className="text-sm text-neon-purple font-medium">Dark</span>
              </div>
            </div>
            <p className="text-xs text-dark-text-muted mt-2">
              Light mode coming soon. Dark mode is currently the only available theme.
            </p>
          </div>
        </div>

        {/* Billing Information (Readonly) */}
        <div className="bg-dark-card rounded-lg border border-dark-border p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg bg-neon-yellow/20">
              <CreditCardIcon className="w-6 h-6 text-neon-yellow" />
            </div>
            <h2 className="text-xl font-semibold text-dark-text-primary">Billing Information</h2>
          </div>

          <div className="bg-dark-bg rounded-lg p-4 border border-dark-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
              <div>
                <p className="text-sm text-dark-text-secondary">Current Plan</p>
                <p className="text-lg font-semibold text-neon-yellow">Starter</p>
              </div>
              <div>
                <p className="text-sm text-dark-text-secondary">Seats</p>
                <p className="text-lg font-semibold text-dark-text-primary">3</p>
              </div>
              <div>
                <p className="text-sm text-dark-text-secondary">Next Billing</p>
                <p className="text-lg font-semibold text-dark-text-primary">Nov 15, 2025</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-dark-border">
              <p className="text-sm text-dark-text-secondary">
                To upgrade your plan or modify billing settings, please contact our support team.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-neon-teal hover:bg-neon-teal/80 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 text-white"
          >
            <CheckIcon className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-4 right-4 bg-neon-teal text-white px-6 py-3 rounded-lg shadow-glow flex items-center space-x-2 z-50">
            <CheckIcon className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
