import { useState, useRef } from 'react';
import { 
  DocumentIcon,
  CloudArrowUpIcon,
  EyeIcon,
  TrashIcon,
  FunnelIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const Documents = () => {
  const fileInputRef = useRef(null);
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      name: 'Office_Supplies_Receipt.jpg',
      size: 2400000, // 2.4MB
      type: 'Receipt',
      uploadDate: '2024-01-15T10:30:00Z',
      linkedTransaction: 'txn-001',
      file: null // In real implementation, would store File object
    },
    {
      id: 'doc-2',
      name: 'Client_Invoice_INV-2024-001.pdf',
      size: 850000, // 850KB
      type: 'Invoice',
      uploadDate: '2024-01-14T14:20:00Z',
      linkedTransaction: 'txn-002',
      file: null
    },
    {
      id: 'doc-3',
      name: 'Bank_Statement_Dec2023.pdf',
      size: 1200000, // 1.2MB
      type: 'Statement',
      uploadDate: '2024-01-10T09:15:00Z',
      linkedTransaction: null,
      file: null
    },
    {
      id: 'doc-4',
      name: 'Equipment_Purchase_Receipt.png',
      size: 1800000, // 1.8MB
      type: 'Receipt',
      uploadDate: '2024-01-08T16:45:00Z',
      linkedTransaction: 'txn-004',
      file: null
    }
  ]);

  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewDocument, setPreviewDocument] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Mock transactions for linking
  const mockTransactions = [
    { id: 'txn-001', description: 'Office Supplies - Staples', amount: '$45.99' },
    { id: 'txn-002', description: 'Consulting Services Invoice', amount: '$2,500.00' },
    { id: 'txn-003', description: 'Marketing Campaign', amount: '$1,200.00' },
    { id: 'txn-004', description: 'Equipment Purchase', amount: '$899.99' },
    { id: 'txn-005', description: 'Monthly Subscription', amount: '$49.99' }
  ];

  const documentTypes = ['All', 'Receipt', 'Invoice', 'Statement'];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Receipt':
        return ReceiptPercentIcon;
      case 'Invoice':
        return DocumentTextIcon;
      case 'Statement':
        return BanknotesIcon;
      default:
        return DocumentIcon;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Receipt':
        return 'neon-lime';
      case 'Invoice':
        return 'neon-teal';
      case 'Statement':
        return 'neon-purple';
      default:
        return 'gray-400';
    }
  };

  const handleFileSelect = (files) => {
    const newDocuments = Array.from(files).map((file, index) => ({
      id: `doc-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: 'Receipt', // Default type, can be changed later
      uploadDate: new Date().toISOString(),
      linkedTransaction: null,
      file: file
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files);
      e.target.value = ''; // Reset input
    }
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleTypeChange = (documentId, newType) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId ? { ...doc, type: newType } : doc
    ));
  };

  const handleTransactionLink = (documentId, transactionId) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId ? { ...doc, linkedTransaction: transactionId } : doc
    ));
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const isImageFile = (filename) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filename);
  };

  const isPdfFile = (filename) => {
    return /\.pdf$/i.test(filename);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dark-text-primary">Documents</h1>
            <p className="text-dark-text-secondary mt-2">Upload and manage receipts, invoices, and statements</p>
          </div>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-neon-teal hover:bg-neon-teal/80 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 text-white"
          >
            <CloudArrowUpIcon className="w-5 h-5" />
            <span>Upload Documents</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Total Documents</p>
                <p className="text-2xl font-bold text-neon-teal">{documents.length}</p>
              </div>
              <DocumentIcon className="w-8 h-8 text-neon-teal" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Receipts</p>
                <p className="text-2xl font-bold text-neon-lime">
                  {documents.filter(d => d.type === 'Receipt').length}
                </p>
              </div>
              <ReceiptPercentIcon className="w-8 h-8 text-neon-lime" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Invoices</p>
                <p className="text-2xl font-bold text-neon-teal">
                  {documents.filter(d => d.type === 'Invoice').length}
                </p>
              </div>
              <DocumentTextIcon className="w-8 h-8 text-neon-teal" />
            </div>
          </div>

          <div className="bg-dark-card p-6 rounded-lg border border-dark-border hover:shadow-neon transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-text-secondary text-sm">Statements</p>
                <p className="text-2xl font-bold text-neon-purple">
                  {documents.filter(d => d.type === 'Statement').length}
                </p>
              </div>
              <BanknotesIcon className="w-8 h-8 text-neon-purple" />
            </div>
          </div>
        </div>

        {/* Upload Dropzone */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver 
              ? 'border-neon-teal bg-neon-teal/10' 
              : 'border-dark-border hover:border-neon-teal/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CloudArrowUpIcon className="w-12 h-12 text-neon-teal mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark-text-primary mb-2">
            Drop documents here or click to upload
          </h3>
          <p className="text-dark-text-secondary mb-4">
            Supports PDF, JPG, PNG files up to 10MB each
          </p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-neon-teal hover:bg-neon-teal/80 px-6 py-2 rounded-lg font-medium transition-colors text-white"
          >
            Choose Files
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-dark-text-secondary" />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-dark-card border border-dark-border rounded-lg px-3 py-2 text-dark-text-primary focus:outline-none focus:border-neon-teal"
              >
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-dark-text-secondary absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg text-dark-text-primary placeholder-dark-text-muted focus:outline-none focus:border-neon-teal"
            />
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-dark-card rounded-lg border border-dark-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="text-left px-6 py-4 text-dark-text-secondary font-medium">Document</th>
                  <th className="text-left px-6 py-4 text-dark-text-secondary font-medium">Type</th>
                  <th className="text-left px-6 py-4 text-dark-text-secondary font-medium">Size</th>
                  <th className="text-left px-6 py-4 text-dark-text-secondary font-medium">Upload Date</th>
                  <th className="text-left px-6 py-4 text-dark-text-secondary font-medium">Linked Transaction</th>
                  <th className="text-left px-6 py-4 text-dark-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredDocuments.map((doc) => {
                  const TypeIcon = getTypeIcon(doc.type);
                  const typeColor = getTypeColor(doc.type);
                  const linkedTransaction = mockTransactions.find(t => t.id === doc.linkedTransaction);
                  
                  return (
                    <tr key={doc.id} className="hover:bg-dark-bg/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-${typeColor}/20`}>
                            <TypeIcon className={`w-5 h-5 text-${typeColor}`} />
                          </div>
                          <div>
                            <p className="font-medium text-dark-text-primary">{doc.name}</p>
                            <p className="text-sm text-dark-text-secondary">
                              {isImageFile(doc.name) ? 'Image' : isPdfFile(doc.name) ? 'PDF' : 'Document'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={doc.type}
                          onChange={(e) => handleTypeChange(doc.id, e.target.value)}
                          className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-sm text-dark-text-primary focus:outline-none focus:border-neon-teal"
                        >
                          <option value="Receipt">Receipt</option>
                          <option value="Invoice">Invoice</option>
                          <option value="Statement">Statement</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-dark-text-secondary">
                        {formatFileSize(doc.size)}
                      </td>
                      <td className="px-6 py-4 text-dark-text-secondary">
                        {formatDate(doc.uploadDate)}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={doc.linkedTransaction || ''}
                          onChange={(e) => handleTransactionLink(doc.id, e.target.value || null)}
                          className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-sm text-dark-text-primary focus:outline-none focus:border-neon-teal"
                        >
                          <option value="">No link</option>
                          {mockTransactions.map(txn => (
                            <option key={txn.id} value={txn.id}>
                              {txn.description} ({txn.amount})
                            </option>
                          ))}
                        </select>
                        {linkedTransaction && (
                          <p className="text-xs text-neon-teal mt-1">
                            Linked to: {linkedTransaction.description}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setPreviewDocument(doc)}
                            className="p-2 text-neon-teal hover:bg-neon-teal/20 rounded-lg transition-colors"
                            title="Preview"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <DocumentIcon className="w-16 h-16 text-dark-text-muted mx-auto mb-4" />
              <p className="text-dark-text-secondary">No documents found matching your criteria.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 text-neon-teal hover:text-neon-teal/80 font-medium"
              >
                Upload your first document
              </button>
            </div>
          )}
        </div>

        {/* Preview Modal */}
        {previewDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-card rounded-lg border border-dark-border w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-glow">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-dark-border">
                <div>
                  <h2 className="text-xl font-bold text-dark-text-primary">{previewDocument.name}</h2>
                  <p className="text-dark-text-secondary text-sm">
                    {previewDocument.type} • {formatFileSize(previewDocument.size)} • {formatDate(previewDocument.uploadDate)}
                  </p>
                </div>
                <button
                  onClick={() => setPreviewDocument(null)}
                  className="text-dark-text-secondary hover:text-neon-teal transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Preview Content */}
              <div className="p-6 max-h-[70vh] overflow-auto flex items-center justify-center bg-dark-bg">
                {isImageFile(previewDocument.name) && previewDocument.file ? (
                  <img 
                    src={URL.createObjectURL(previewDocument.file)} 
                    alt={previewDocument.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                ) : isPdfFile(previewDocument.name) && previewDocument.file ? (
                  <div className="text-center">
                    <DocumentIcon className="w-24 h-24 text-neon-teal mx-auto mb-4" />
                    <p className="text-dark-text-primary mb-4">PDF Preview</p>
                    <p className="text-dark-text-secondary text-sm">
                      PDF files cannot be previewed in this demo.<br/>
                      In a real application, you would use a PDF viewer library.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <DocumentIcon className="w-24 h-24 text-dark-text-muted mx-auto mb-4" />
                    <p className="text-dark-text-secondary">
                      Preview not available for this file type or mock document.
                    </p>
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

export default Documents;
