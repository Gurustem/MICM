import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaMusic, FaSearch, FaFilter, FaPlus, FaExclamationTriangle, FaClock, FaCalendarAlt, FaSync, FaUser, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { format, addDays, addYears, differenceInDays, isAfter } from 'date-fns';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';
import toast from 'react-hot-toast';
import { LoanType, Instrument } from '@/types';

const Inventory = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'borrowed' | 'loaned' | 'maintenance'>('all');
  const [loanTypeFilter, setLoanTypeFilter] = useState<'all' | 'borrowed' | 'loaned'>('all');
  const action = searchParams.get('action');
  const borrowAction = searchParams.get('borrow');
  const loanAction = searchParams.get('loan');
  const instrumentId = searchParams.get('id');

  // Mock data
  const [instruments, setInstruments] = useState<Instrument[]>([
    {
      id: '1',
      name: 'Yamaha Piano Keyboard',
      type: 'Keyboard',
      brand: 'Yamaha',
      condition: 'excellent' as const,
      status: 'borrowed' as const,
      loanType: 'borrowed' as LoanType,
      borrowedBy: 'Thabo Ndlovu',
      borrowedByStudentId: 'student-1',
      borrowedAt: new Date(),
      dueDate: new Date(), // Same day return
      location: 'Room A',
    },
    {
      id: '2',
      name: 'Violin - Student Model',
      type: 'String',
      brand: 'Stentor',
      condition: 'good' as const,
      status: 'available' as const,
      location: 'Storage Room',
    },
    {
      id: '3',
      name: 'Acoustic Guitar',
      type: 'Guitar',
      brand: 'Fender',
      condition: 'good' as const,
      status: 'loaned' as const,
      loanType: 'loaned' as LoanType,
      borrowedBy: 'Zanele Mthembu',
      borrowedByStudentId: 'student-2',
      borrowedAt: new Date(Date.now() - 86400000 * 300), // ~10 months ago
      loanStartDate: new Date(Date.now() - 86400000 * 300),
      loanEndDate: new Date(Date.now() + 86400000 * 65), // 2 months remaining
      renewalDate: new Date(Date.now() + 86400000 * 65),
      parentGuardianName: 'Mary Mthembu',
      parentGuardianContact: '+27 83 234 5678',
      location: 'Off-site',
    },
    {
      id: '4',
      name: 'Saxophone',
      type: 'Woodwind',
      brand: 'Yamaha',
      condition: 'fair' as const,
      status: 'loaned' as const,
      loanType: 'loaned' as LoanType,
      borrowedBy: 'Sipho Dlamini',
      borrowedByStudentId: 'student-3',
      borrowedAt: new Date(Date.now() - 86400000 * 365), // 1 year ago - needs renewal
      loanStartDate: new Date(Date.now() - 86400000 * 365),
      loanEndDate: new Date(Date.now() - 86400000 * 1), // Overdue for renewal
      renewalDate: new Date(Date.now() - 86400000 * 1),
      parentGuardianName: 'John Dlamini',
      parentGuardianContact: '+27 84 345 6789',
      location: 'Off-site',
    },
    {
      id: '5',
      name: 'Flute',
      type: 'Woodwind',
      brand: 'Yamaha',
      condition: 'excellent' as const,
      status: 'available' as const,
      location: 'Storage Room',
    },
  ]);

  const filteredInstruments = instruments.filter((instrument) => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instrument.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || instrument.status === statusFilter;
    const matchesLoanType = loanTypeFilter === 'all' || instrument.loanType === loanTypeFilter;
    return matchesSearch && matchesStatus && matchesLoanType;
  });

  const canManage = user?.role === 'teacher' || user?.role === 'admin';
  const isStudent = user?.role === 'student';

  const getStatusBadge = (status: string, loanType?: LoanType, renewalDate?: Date) => {
    if (status === 'available') {
      return <span className="badge bg-green-100 text-green-700 flex items-center gap-1">
        <FaCheckCircle className="w-3 h-3" />
        Available
      </span>;
    }
    if (status === 'maintenance') {
      return <span className="badge bg-yellow-100 text-yellow-700 flex items-center gap-1">
        <FaExclamationTriangle className="w-3 h-3" />
        Maintenance
      </span>;
    }
    if (loanType === 'borrowed') {
      return <span className="badge bg-blue-100 text-blue-700 flex items-center gap-1">
        <FaClock className="w-3 h-3" />
        Borrowed (Same Day)
      </span>;
    }
    if (loanType === 'loaned') {
      const needsRenewal = renewalDate && (isAfter(new Date(), renewalDate) || differenceInDays(renewalDate, new Date()) <= 30);
      if (needsRenewal) {
        return <span className="badge bg-red-100 text-red-700 flex items-center gap-1">
          <FaExclamationTriangle className="w-3 h-3" />
          Needs Renewal
        </span>;
      }
      return <span className="badge bg-purple-100 text-purple-700 flex items-center gap-1">
        <FaCalendarAlt className="w-3 h-3" />
        Loaned
      </span>;
    }
    return null;
  };

  // Borrow form state (same day)
  const [borrowStudentName, setBorrowStudentName] = useState('');
  const [borrowStudentId, setBorrowStudentId] = useState('');

  // Loan form state (long-term)
  const [loanStudentName, setLoanStudentName] = useState('');
  const [loanStudentId, setLoanStudentId] = useState('');
  const [loanDuration, setLoanDuration] = useState('12'); // months
  const [parentGuardianName, setParentGuardianName] = useState('');
  const [parentGuardianContact, setParentGuardianContact] = useState('');

  const handleBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!borrowStudentName || !borrowStudentId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const instrument = instruments.find(i => i.id === instrumentId);
    if (!instrument) return;

    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of day

    const updatedInstruments = instruments.map(i => 
      i.id === instrumentId
        ? {
            ...i,
            status: 'borrowed' as const,
            loanType: 'borrowed' as LoanType,
            borrowedBy: borrowStudentName,
            borrowedByStudentId: borrowStudentId,
            borrowedAt: new Date(),
            dueDate: today,
          }
        : i
    );

    setInstruments(updatedInstruments);
    toast.success('Instrument borrowed successfully. Must be returned by end of day.');
    setSearchParams({});
  };

  const handleLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loanStudentName || !loanStudentId || !parentGuardianName || !parentGuardianContact) {
      toast.error('Please fill in all required fields');
      return;
    }

    const instrument = instruments.find(i => i.id === instrumentId);
    if (!instrument) return;

    const startDate = new Date();
    const months = parseInt(loanDuration);
    const endDate = addDays(startDate, months * 30); // Approximate months to days
    const renewalDate = endDate;

    const updatedInstruments = instruments.map(i => 
      i.id === instrumentId
        ? {
            ...i,
            status: 'loaned' as const,
            loanType: 'loaned' as LoanType,
            borrowedBy: loanStudentName,
            borrowedByStudentId: loanStudentId,
            borrowedAt: startDate,
            loanStartDate: startDate,
            loanEndDate: endDate,
            renewalDate: renewalDate,
            parentGuardianName,
            parentGuardianContact,
            location: 'Off-site',
          }
        : i
    );

    setInstruments(updatedInstruments);
    toast.success(`Instrument loaned successfully for ${months} months. Renewal required after ${format(endDate, 'MMM d, yyyy')}.`);
    setSearchParams({});
  };

  const handleReturn = (instrumentId: string) => {
    const updatedInstruments = instruments.map(i => 
      i.id === instrumentId
        ? {
            ...i,
            status: 'available' as const,
            loanType: undefined,
            borrowedBy: undefined,
            borrowedByStudentId: undefined,
            borrowedAt: undefined,
            dueDate: undefined,
            loanStartDate: undefined,
            loanEndDate: undefined,
            renewalDate: undefined,
            parentGuardianName: undefined,
            parentGuardianContact: undefined,
            location: i.location === 'Off-site' ? 'Storage Room' : i.location,
          }
        : i
    );

    setInstruments(updatedInstruments);
    toast.success('Instrument returned successfully');
  };

  const handleRenewal = (instrumentId: string) => {
    const instrument = instruments.find(i => i.id === instrumentId);
    if (!instrument || !instrument.loanEndDate) return;

    const newEndDate = addYears(instrument.loanEndDate, 1);
    const updatedInstruments = instruments.map(i => 
      i.id === instrumentId
        ? {
            ...i,
            loanEndDate: newEndDate,
            renewalDate: newEndDate,
          }
        : i
    );

    setInstruments(updatedInstruments);
    toast.success(`Loan renewed successfully. New renewal date: ${format(newEndDate, 'MMM d, yyyy')}`);
  };

  if (action === 'add') {
    return (
      <div className="space-y-6">
        <BackButton to="/inventory" />
        <div className="card max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaPlus className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">Add New Instrument</h1>
              <p className="text-gray-600">Register a new instrument to the inventory</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instrument Name</label>
              <input type="text" className="input-field" placeholder="e.g., Yamaha Piano Keyboard" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="input-field" required>
                  <option value="">Select type</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="String">String</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Woodwind">Woodwind</option>
                  <option value="Brass">Brass</option>
                  <option value="Percussion">Percussion</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <input type="text" className="input-field" placeholder="e.g., Yamaha" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input type="text" className="input-field" placeholder="Model number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serial Number</label>
                <input type="text" className="input-field" placeholder="Serial number" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select className="input-field" required>
                  <option value="">Select condition</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="needs-repair">Needs Repair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" className="input-field" placeholder="e.g., Storage Room, Room A" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                className="input-field"
                rows={3}
                placeholder="Additional notes about the instrument..."
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button type="submit" className="btn-primary">Add Instrument</button>
              <button type="button" onClick={() => setSearchParams({})} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (borrowAction === 'true' && instrumentId) {
    const instrument = instruments.find(i => i.id === instrumentId);
    return (
      <div className="space-y-6">
        <BackButton to="/inventory" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaClock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">Borrow Instrument</h1>
              <p className="text-gray-600">{instrument?.name} - Same day use only (cannot leave premises)</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Borrowing Rules:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Instrument must be returned by end of day</li>
                  <li>Student cannot leave school premises with borrowed instrument</li>
                  <li>Instrument is for use during school hours only</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleBorrow} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={borrowStudentName}
                onChange={(e) => setBorrowStudentName(e.target.value)}
                className="input-field"
                placeholder="Enter student name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={borrowStudentId}
                onChange={(e) => setBorrowStudentId(e.target.value)}
                className="input-field"
                placeholder="Enter student ID"
                required
              />
            </div>
            <div className="flex items-center gap-4 pt-4">
              <button type="submit" className="btn-primary">Borrow Instrument</button>
              <button type="button" onClick={() => setSearchParams({})} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loanAction === 'true' && instrumentId) {
    const instrument = instruments.find(i => i.id === instrumentId);
    return (
      <div className="space-y-6">
        <BackButton to="/inventory" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaCalendarAlt className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold gradient-text">Loan Instrument</h1>
              <p className="text-gray-600">{instrument?.name} - Long-term loan (up to 1 year, renewable)</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-purple-800">
                <p className="font-medium mb-1">Loan Agreement Terms:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Maximum loan period: 1 year</li>
                  <li>Parent/Guardian must sign loan agreement form</li>
                  <li>Renewal required after loan period expires</li>
                  <li>Student can take instrument home</li>
                </ul>
              </div>
            </div>
          </div>

          <form onSubmit={handleLoan} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={loanStudentName}
                onChange={(e) => setLoanStudentName(e.target.value)}
                className="input-field"
                placeholder="Enter student name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={loanStudentId}
                onChange={(e) => setLoanStudentId(e.target.value)}
                className="input-field"
                placeholder="Enter student ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Duration (Months) <span className="text-red-500">*</span>
              </label>
              <select
                value={loanDuration}
                onChange={(e) => setLoanDuration(e.target.value)}
                className="input-field"
                required
              >
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months (Maximum)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={parentGuardianName}
                onChange={(e) => setParentGuardianName(e.target.value)}
                className="input-field"
                placeholder="Enter parent/guardian name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={parentGuardianContact}
                onChange={(e) => setParentGuardianContact(e.target.value)}
                className="input-field"
                placeholder="Enter contact number"
                required
              />
            </div>
            <div className="flex items-center gap-4 pt-4">
              <button type="submit" className="btn-primary">Create Loan Agreement</button>
              <button type="button" onClick={() => setSearchParams({})} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <BackButton to="/dashboard" />
          <div className="flex items-center gap-4 mt-2 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaMusic className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">Instrument Inventory</h1>
              <p className="text-gray-600">Manage, borrow, and loan musical instruments</p>
            </div>
          </div>
        </div>
        {canManage && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSearchParams({ action: 'add' })}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus className="w-5 h-5" />
            Add Instrument
          </motion.button>
        )}
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-0"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="loaned">Loaned</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          {(statusFilter === 'borrowed' || statusFilter === 'loaned' || statusFilter === 'all') && (
            <select
              value={loanTypeFilter}
              onChange={(e) => setLoanTypeFilter(e.target.value as typeof loanTypeFilter)}
              className="input-field"
            >
              <option value="all">All Types</option>
              <option value="borrowed">Borrowed (Same Day)</option>
              <option value="loaned">Loaned (Long-term)</option>
            </select>
          )}
        </div>
      </motion.div>

      {/* Instruments Grid */}
      {filteredInstruments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => {
            const isOverdue = instrument.dueDate && instrument.dueDate < new Date();
            const needsRenewal = instrument.renewalDate && (isAfter(new Date(), instrument.renewalDate) || differenceInDays(instrument.renewalDate, new Date()) <= 30);
            const daysUntilRenewal = instrument.renewalDate ? differenceInDays(instrument.renewalDate, new Date()) : null;

            return (
              <motion.div
                key={instrument.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card hover:shadow-lg transition-shadow ${
                  needsRenewal ? 'border-l-4 border-red-500' : isOverdue ? 'border-l-4 border-orange-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                    <FaMusic className="w-7 h-7 text-white" />
                  </div>
                  {getStatusBadge(instrument.status, instrument.loanType, instrument.renewalDate)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{instrument.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p><span className="font-medium">Type:</span> {instrument.type}</p>
                  {instrument.brand && (
                    <p><span className="font-medium">Brand:</span> {instrument.brand}</p>
                  )}
                  <p><span className="font-medium">Condition:</span> 
                    <span className="capitalize ml-1">{instrument.condition}</span>
                  </p>
                  <p><span className="font-medium">Location:</span> {instrument.location}</p>
                  
                  {instrument.borrowedBy && (
                    <>
                      <p className="flex items-center gap-2">
                        <FaUser className="w-4 h-4 text-gray-400" />
                        <span><span className="font-medium">Borrowed/Loaned by:</span> {instrument.borrowedBy}</span>
                      </p>
                      {instrument.loanType === 'borrowed' && instrument.dueDate && (
                        <p className={`flex items-center gap-2 ${isOverdue ? 'text-red-600 font-medium' : 'text-blue-600'}`}>
                          <FaClock className="w-4 h-4" />
                          <span><span className="font-medium">Return by:</span> {format(instrument.dueDate, 'MMM d, yyyy • h:mm a')} (End of day)</span>
                        </p>
                      )}
                      {instrument.loanType === 'loaned' && (
                        <>
                          {instrument.loanEndDate && (
                            <p className="flex items-center gap-2">
                              <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                              <span><span className="font-medium">Loan ends:</span> {format(instrument.loanEndDate, 'MMM d, yyyy')}</span>
                            </p>
                          )}
                          {instrument.parentGuardianName && (
                            <p className="flex items-center gap-2">
                              <FaUser className="w-4 h-4 text-gray-400" />
                              <span><span className="font-medium">Parent/Guardian:</span> {instrument.parentGuardianName}</span>
                            </p>
                          )}
                          {needsRenewal && (
                            <p className="text-red-600 font-medium flex items-center gap-2">
                              <FaExclamationTriangle className="w-4 h-4" />
                              <span>{daysUntilRenewal !== null && daysUntilRenewal > 0
                                ? `Renewal due in ${daysUntilRenewal} days`
                                : 'Renewal overdue'}</span>
                            </p>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                      {isStudent && instrument.status === 'available' && (
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchParams({ borrow: 'true', id: instrument.id })}
                        className="btn-primary flex-1 text-sm flex items-center justify-center gap-2"
                      >
                        <FaClock className="w-4 h-4" />
                        Borrow (Same Day)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchParams({ loan: 'true', id: instrument.id })}
                        className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2"
                      >
                        <FaCalendarAlt className="w-4 h-4" />
                        Loan (Long-term)
                      </motion.button>
                    </div>
                  )}
                  {canManage && (
                    <>
                      {instrument.status === 'available' && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSearchParams({ borrow: 'true', id: instrument.id })}
                            className="btn-primary flex-1 text-sm flex items-center justify-center gap-2"
                          >
                            <FaClock className="w-4 h-4" />
                            Record Borrow
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSearchParams({ loan: 'true', id: instrument.id })}
                            className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2"
                          >
                            <FaCalendarAlt className="w-4 h-4" />
                            Record Loan
                          </motion.button>
                        </div>
                      )}
                      {(instrument.status === 'borrowed' || instrument.status === 'loaned') && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleReturn(instrument.id)}
                            className="btn-secondary flex-1 text-sm flex items-center justify-center gap-2"
                          >
                            <FaCheckCircle className="w-4 h-4" />
                            Return
                          </motion.button>
                          {instrument.loanType === 'loaned' && needsRenewal && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleRenewal(instrument.id)}
                              className="btn-primary text-sm flex items-center justify-center gap-2"
                            >
                              <FaSync className="w-4 h-4" />
                              Renew Loan
                            </motion.button>
                          )}
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-secondary text-sm w-full"
                      >
                        View Details
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12 border-0"
        >
          <FaMusic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No instruments found</p>
        </motion.div>
      )}

      {/* Summary Stats */}
      {canManage && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Total Instruments</p>
            <p className="text-2xl font-bold text-gray-900">{instruments.length}</p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Available</p>
            <p className="text-2xl font-bold text-green-600">
              {instruments.filter(i => i.status === 'available').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Borrowed (Same Day)</p>
            <p className="text-2xl font-bold text-blue-600">
              {instruments.filter(i => i.loanType === 'borrowed').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Loaned (Long-term)</p>
            <p className="text-2xl font-bold text-purple-600">
              {instruments.filter(i => i.loanType === 'loaned').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Needs Renewal</p>
            <p className="text-2xl font-bold text-red-600">
              {instruments.filter(i => i.renewalDate && (isAfter(new Date(), i.renewalDate) || differenceInDays(i.renewalDate, new Date()) <= 30)).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
