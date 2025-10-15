import { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon,
  PaperClipIcon,
  ArrowUpIcon,
  TrashIcon,
  CalendarIcon,
  SparklesIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

// 🧾 MOCK DATA (could be imported from ../data/mockData)
const mockTransactions = [
  { id: 1024, date: '2025-10-10', vendor: 'Office Supplies Co', amount: -245.67, category: 'Office Expenses', confidence: 45, status: 'pending' },
  { id: 1025, date: '2025-10-12', vendor: 'Client Payment ABC', amount: 2500.00, category: 'Revenue', confidence: 95, status: 'approved' },
  { id: 1026, date: '2025-10-13', vendor: 'Software License', amount: -99.99, category: 'Software', confidence: 30, status: 'pending' },
  { id: 1027, date: '2025-10-14', vendor: 'Marketing Agency', amount: -750.00, category: 'Marketing', confidence: 85, status: 'approved' },
  { id: 1028, date: '2025-10-14', vendor: 'Coffee Shop', amount: -12.45, category: 'Meals & Entertainment', confidence: 25, status: 'pending' }
];

const mockKPIs = {
  netCashFlow: 1392.89,
  cashBalance: 45678.90,
  freeCashFlow: 3245.67,
  runwayMonths: 18,
  totalTxns: 156,
  autoCount: 98,
  reviewCount: 58,
  accuracy: 87.5
};

const mockCategories = [
  { name: 'Revenue', amount: 12500.00 },
  { name: 'Office Expenses', amount: -2345.67 },
  { name: 'Software', amount: -899.99 },
  { name: 'Marketing', amount: -1750.00 },
  { name: 'Meals & Entertainment', amount: -234.56 }
];

const Chatbot = () => {
  // 🗂️ STATE
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      role: 'assistant',
      content: "Hi! I'm your bookkeeping assistant. I can help you analyze transactions, generate reports, and answer questions about your finances. Try one of the suggested prompts below or type a command like `/help`.",
      type: 'text',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [period, setPeriod] = useState('30'); // days
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // 📜 SCROLL TO BOTTOM
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ⌨️ KEYBOARD SHORTCUTS
  useEffect(() => {
    const handleKeyboard = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  // 🧠 INTENT HANDLERS
  const handleSummary = (periodDays = period) => {
    const filteredTxns = mockTransactions.filter(t => {
      const txnDate = new Date(t.date);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - parseInt(periodDays));
      return txnDate >= cutoff;
    });

    const totalRevenue = filteredTxns.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = filteredTxns.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const netIncome = totalRevenue - totalExpenses;

    return {
      type: 'text',
      content: `## Financial Summary (Last ${periodDays} Days)

**Key Metrics:**
- **Total Revenue:** $${totalRevenue.toLocaleString()}
- **Total Expenses:** $${totalExpenses.toLocaleString()}
- **Net Income:** $${netIncome.toLocaleString()}
- **Cash Balance:** $${mockKPIs.cashBalance.toLocaleString()}
- **Runway:** ${mockKPIs.runwayMonths} months

**Transaction Activity:**
- ${filteredTxns.length} transactions processed
- ${filteredTxns.filter(t => t.status === 'pending').length} need review
- ${Math.round((filteredTxns.filter(t => t.confidence > 80).length / filteredTxns.length) * 100)}% categorization accuracy`
    };
  };

  const handleNeedsReview = () => {
    const needsReview = mockTransactions
      .filter(t => t.confidence < 80 || t.status === 'pending')
      .slice(0, 5);

    return {
      type: 'table',
      content: {
        title: `${needsReview.length} Transactions Need Review`,
        headers: ['Date', 'Vendor', 'Amount', 'Category', 'Confidence'],
        rows: needsReview.map(t => [
          t.date,
          t.vendor,
          `$${Math.abs(t.amount).toLocaleString()}`,
          t.category,
          `${t.confidence}%`
        ])
      }
    };
  };

  const handleShowReport = (type, periodDays = period) => {
    const reportTypes = {
      'pl': 'Profit & Loss',
      'bs': 'Balance Sheet', 
      'gl': 'General Ledger'
    };

    return {
      type: 'text',
      content: `## ${reportTypes[type] || 'Financial'} Report (Last ${periodDays} Days)

**Available Reports:**
- 📊 **Profit & Loss Statement**
- 💰 **Balance Sheet** 
- 📋 **General Ledger**
- 📈 **Cash Flow Statement**

*Note: This is a demo environment. In production, these would generate downloadable PDF reports with your actual financial data.*

**Quick Actions:**
- Export to PDF
- Schedule email delivery
- Compare with previous period`
    };
  };

  const handleExplainTransaction = (txnId) => {
    const transaction = mockTransactions.find(t => t.id === parseInt(txnId));
    
    if (!transaction) {
      return {
        type: 'text',
        content: `❌ Transaction #${txnId} not found. Try one of these IDs: ${mockTransactions.map(t => t.id).join(', ')}`
      };
    }

    return {
      type: 'text',
      content: `## Transaction #${transaction.id} Analysis

**Details:**
- **Date:** ${transaction.date}
- **Vendor:** ${transaction.vendor}
- **Amount:** $${Math.abs(transaction.amount).toLocaleString()} ${transaction.amount < 0 ? '(Expense)' : '(Income)'}
- **Category:** ${transaction.category}
- **Confidence:** ${transaction.confidence}% ${transaction.confidence < 80 ? '⚠️ Low confidence' : '✅ High confidence'}
- **Status:** ${transaction.status}

**AI Analysis:**
This transaction appears to be a ${transaction.amount < 0 ? 'business expense' : 'revenue item'}. ${
  transaction.confidence < 80 
    ? `The categorization confidence is low (${transaction.confidence}%). Consider reviewing the vendor name and amount to ensure proper classification.`
    : 'The categorization looks accurate based on the vendor and amount patterns.'
}

**Suggested Actions:**
${transaction.status === 'pending' ? '- Approve or reject this transaction\n- Update category if needed' : '- Transaction already processed'}`
    };
  };

  const handleExportCSV = (filter = 'all') => {
    const csvHeaders = ['Date', 'Vendor', 'Amount', 'Category', 'Confidence', 'Status'];
    const csvData = mockTransactions.map(t => [
      t.date,
      t.vendor,
      t.amount,
      t.category,
      t.confidence,
      t.status
    ]);

    const csvContent = [csvHeaders, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    return {
      type: 'text',
      content: `📥 **Export Complete**

Downloaded: \`transactions-${new Date().toISOString().split('T')[0]}.csv\`

**File Contains:**
- ${mockTransactions.length} transactions
- All columns: Date, Vendor, Amount, Category, Confidence, Status
- Compatible with Excel, Google Sheets, and other spreadsheet applications

*The download should have started automatically. Check your Downloads folder.*`
    };
  };

  const handleHelp = () => {
    return {
      type: 'text',
      content: `## 🤖 Assistant Commands

**Financial Analysis:**
- \`/summary\` - Get financial overview for current period
- \`/summary 7\` - Summary for last 7 days
- \`/review\` - Show transactions needing review

**Reports:**
- \`/reports pl\` - Profit & Loss statement
- \`/reports bs\` - Balance Sheet
- \`/reports gl\` - General Ledger

**Transaction Help:**
- \`/explain 1024\` - Explain specific transaction
- \`/export\` - Download CSV of all transactions

**Quick Questions:**
- "What's my cash flow this month?"
- "Show expense breakdown"
- "Which categories need attention?"

**Keyboard Shortcuts:**
- \`Cmd/Ctrl + K\` - Focus input
- \`Enter\` - Send message
- \`Shift + Enter\` - New line

Try clicking the suggested prompts above or type any command!`
    };
  };

  // 🎯 MESSAGE ROUTER
  const processMessage = async (userInput) => {
    let response;

    // Route based on slash commands or keywords
    if (userInput.startsWith('/summary')) {
      const periodMatch = userInput.match(/\/summary\s+(\d+)/);
      const days = periodMatch ? periodMatch[1] : period;
      response = handleSummary(days);
    } else if (userInput.startsWith('/review')) {
      response = handleNeedsReview();
    } else if (userInput.startsWith('/reports')) {
      const typeMatch = userInput.match(/\/reports\s+(pl|bs|gl)/);
      const reportType = typeMatch ? typeMatch[1] : 'pl';
      response = handleShowReport(reportType);
    } else if (userInput.startsWith('/explain')) {
      const idMatch = userInput.match(/\/explain\s+(\d+)/);
      const txnId = idMatch ? idMatch[1] : null;
      response = txnId ? handleExplainTransaction(txnId) : {
        type: 'text',
        content: '❌ Please specify a transaction ID. Example: `/explain 1024`'
      };
    } else if (userInput.startsWith('/export')) {
      response = handleExportCSV();
    } else if (userInput.startsWith('/help')) {
      response = handleHelp();
    } else if (userInput.toLowerCase().includes('cash flow')) {
      response = handleSummary();
    } else if (userInput.toLowerCase().includes('expense breakdown')) {
      response = {
        type: 'kpi',
        content: {
          title: 'Expense Breakdown',
          items: mockCategories.filter(c => c.amount < 0).map(c => ({
            label: c.name,
            value: `$${Math.abs(c.amount).toLocaleString()}`,
            trend: Math.random() > 0.5 ? 'up' : 'down'
          }))
        }
      };
    } else {
      // Fallback
      response = {
        type: 'text',
        content: `I'm a demo assistant and didn't understand that command. Try one of these:

**Quick Commands:**
- \`/help\` - Show all available commands
- \`/summary\` - Financial overview
- \`/review\` - Transactions needing attention

Or click one of the suggested prompts above! 💡`
      };
    }

    return response;
  };

  // 📨 SEND MESSAGE
  const sendMessage = async (messageText = input.trim()) => {
    if (!messageText || isStreaming) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      type: 'text',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    // Process and get response
    const response = await processMessage(messageText);

    // Simulate streaming for text responses
    if (response.type === 'text') {
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '',
        type: 'text',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Stream character by character
      const chars = response.content.split('');
      for (let i = 0; i < chars.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 15));
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessage.id 
            ? { ...msg, content: response.content.slice(0, i + 1) }
            : msg
        ));
      }
    } else {
      // Instant display for structured responses
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        ...response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }

    setIsStreaming(false);
  };

  // 🎪 SUGGESTED PROMPTS
  const suggestedPrompts = [
    "Give me a summary for this month",
    "Which transactions need review?", 
    "Show expense breakdown",
    "Export a CSV of last 30 days",
    "Explain transaction #1024"
  ];

  // 🏗️ RENDER HELPERS
  const renderMessage = (message) => {
    if (message.type === 'kpi') {
      return (
        <div className="space-y-3">
          <h3 className="font-semibold text-dark-text-primary">{message.content.title}</h3>
          <div className="grid grid-cols-1 gap-2">
            {message.content.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-dark-bg rounded-lg border border-dark-border">
                <span className="text-dark-text-secondary">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-dark-text-primary">{item.value}</span>
                  {item.trend === 'up' && <span className="text-red-400">↗️</span>}
                  {item.trend === 'down' && <span className="text-green-400">↘️</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (message.type === 'table') {
      return (
        <div className="space-y-3">
          <h3 className="font-semibold text-dark-text-primary flex items-center space-x-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-neon-yellow" />
            <span>{message.content.title}</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  {message.content.headers.map((header, idx) => (
                    <th key={idx} className="text-left py-2 px-3 font-medium text-dark-text-secondary">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {message.content.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b border-dark-border/50">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="py-2 px-3 text-dark-text-primary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // Default text with basic markdown
    return (
      <div 
        className="prose prose-sm max-w-none prose-invert"
        dangerouslySetInnerHTML={{ 
          __html: message.content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="bg-dark-border px-1 py-0.5 rounded text-neon-teal">$1</code>')
            .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-dark-text-primary mb-2 mt-4 first:mt-0">$1</h2>')
            .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
            .replace(/\n/g, '<br>')
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary">
      <div className="max-w-4xl mx-auto">
        {/* 📋 HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-neon-teal/20">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-neon-teal" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-dark-text-primary">AI Assistant</h1>
              <p className="text-dark-text-secondary">Your bookkeeping companion</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-sm text-dark-text-primary focus:outline-none focus:border-neon-teal"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button
              onClick={() => setMessages([messages[0]])}
              className="flex items-center space-x-2 px-3 py-2 bg-dark-card border border-dark-border rounded-lg hover:bg-dark-border transition-colors text-sm"
            >
              <TrashIcon className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* 💡 SUGGESTED PROMPTS */}
        <div className="p-6 border-b border-dark-border">
          <div className="flex items-center space-x-2 mb-3">
            <SparklesIcon className="w-5 h-5 text-neon-purple" />
            <h3 className="font-medium text-dark-text-primary">Suggested Prompts</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(prompt)}
                disabled={isStreaming}
                className="px-3 py-2 bg-dark-card border border-dark-border rounded-lg hover:border-neon-teal transition-colors text-sm text-dark-text-secondary hover:text-dark-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* 💬 MESSAGES */}
        <div className="flex-1 p-6 space-y-6 max-h-[600px] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-indigo-700 text-white'
                    : 'bg-slate-800 border border-cyan-500/30 text-dark-text-primary shadow-lg shadow-cyan-500/10'
                }`}
              >
                {renderMessage(message)}
                {message.role === 'assistant' && (
                  <div className="mt-2 text-xs text-dark-text-muted">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isStreaming && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-dark-text-muted">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 🔢 QUICK ACTIONS */}
        <div className="px-6 py-3 border-t border-dark-border">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-dark-text-muted">Quick:</span>
            {['/help', '/summary', '/review', '/reports', '/export'].map(cmd => (
              <button
                key={cmd}
                onClick={() => sendMessage(cmd)}
                disabled={isStreaming}
                className="px-2 py-1 bg-dark-card border border-dark-border rounded hover:border-neon-teal transition-colors text-dark-text-secondary hover:text-dark-text-primary disabled:opacity-50"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* ✍️ COMPOSER */}
        <div className="p-6">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask about your finances, transactions, or type /help for commands... (Cmd+K to focus)"
                className="w-full bg-dark-card border border-dark-border rounded-lg px-4 py-3 pr-20 text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal resize-none"
                rows={input.includes('\n') ? Math.min(input.split('\n').length, 4) : 1}
                disabled={isStreaming}
              />
              <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                <PaperClipIcon className="w-5 h-5 text-dark-text-muted opacity-50" />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isStreaming}
                  className="p-1.5 bg-neon-teal rounded-lg hover:bg-neon-teal/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUpIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs text-dark-text-muted">
            Press Enter to send • Shift+Enter for new line • Cmd/Ctrl+K to focus
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
