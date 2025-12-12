import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Music, Search, Filter, Plus, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import BackButton from '@/components/BackButton';

const Inventory = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'borrowed' | 'maintenance'>('all');
  const action = searchParams.get('action');

  // Mock data
  const instruments = [
    {
      id: '1',
      name: 'Yamaha Piano Keyboard',
      type: 'Keyboard',
      brand: 'Yamaha',
      condition: 'excellent' as const,
      status: 'borrowed' as const,
      borrowedBy: 'Thabo Ndlovu',
      borrowedAt: new Date(Date.now() - 86400000 * 5),
      dueDate: new Date(Date.now() + 86400000 * 25),
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
      status: 'borrowed' as const,
      borrowedBy: 'Zanele Mthembu',
      borrowedAt: new Date(Date.now() - 86400000 * 10),
      dueDate: new Date(Date.now() - 86400000 * 2), // Overdue
      location: 'Room B',
    },
    {
      id: '4',
      name: 'Saxophone',
      type: 'Woodwind',
      brand: 'Yamaha',
      condition: 'fair' as const,
      status: 'maintenance' as const,
      location: 'Repair Shop',
    },
  ];

  const filteredInstruments = instruments.filter((instrument) => {
    const matchesSearch = instrument.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instrument.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || instrument.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const canManage = user?.role === 'teacher' || user?.role === 'admin';
  const isStudent = user?.role === 'student';

  const getStatusBadge = (status: string, dueDate?: Date) => {
    const isOverdue = dueDate && dueDate < new Date();
    if (isOverdue) {
      return (
        <span className="badge bg-red-100 text-red-700 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Overdue
        </span>
      );
    }
    switch (status) {
      case 'available':
        return <span className="badge bg-green-100 text-green-700">Available</span>;
      case 'borrowed':
        return <span className="badge bg-blue-100 text-blue-700">Borrowed</span>;
      case 'maintenance':
        return <span className="badge bg-yellow-100 text-yellow-700">Maintenance</span>;
      default:
        return null;
    }
  };

  if (action === 'add') {
    return (
      <div className="space-y-6">
        <BackButton to="/inventory" />
        <div className="card max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Add New Instrument</h1>
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <BackButton to="/dashboard" />
          <h1 className="text-3xl font-display font-bold text-gray-900 mt-2 mb-2">Instrument Inventory</h1>
          <p className="text-gray-600">Manage and borrow musical instruments</p>
        </div>
        {canManage && (
          <button 
            onClick={() => setSearchParams({ action: 'add' })}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Instrument
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search instruments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Instruments Grid */}
      {filteredInstruments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstruments.map((instrument) => {
            const isOverdue = instrument.dueDate && instrument.dueDate < new Date();
            return (
              <div
                key={instrument.id}
                className={`card hover:shadow-lg transition-shadow ${
                  isOverdue ? 'border-l-4 border-red-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Music className="w-6 h-6 text-primary-600" />
                  </div>
                  {getStatusBadge(instrument.status, instrument.dueDate)}
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
                    <p><span className="font-medium">Borrowed by:</span> {instrument.borrowedBy}</p>
                  )}
                  {instrument.dueDate && (
                    <p className={isOverdue ? 'text-red-600 font-medium' : ''}>
                      <span className="font-medium">Due:</span>{' '}
                      {format(instrument.dueDate, 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  {isStudent && instrument.status === 'available' && (
                    <button className="btn-primary flex-1 text-sm">Borrow</button>
                  )}
                  {canManage && (
                    <>
                      <button className="btn-secondary flex-1 text-sm">View Details</button>
                      {instrument.status === 'borrowed' && (
                        <button className="btn-secondary text-sm">Return</button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12">
          <Music className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No instruments found</p>
        </div>
      )}

      {/* Summary Stats */}
      {canManage && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <p className="text-sm text-gray-600 mb-1">Borrowed</p>
            <p className="text-2xl font-bold text-blue-600">
              {instruments.filter(i => i.status === 'borrowed').length}
            </p>
          </div>
          <div className="card">
            <p className="text-sm text-gray-600 mb-1">Overdue</p>
            <p className="text-2xl font-bold text-red-600">
              {instruments.filter(i => i.dueDate && i.dueDate < new Date()).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;

