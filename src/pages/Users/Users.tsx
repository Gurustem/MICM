import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Users as UsersIcon, Plus, Search, Filter, Mail, Phone, UserPlus, Edit, Trash2, Shield, GraduationCap, UserCheck } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { format } from 'date-fns';

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const action = searchParams.get('action');

  // Mock data
  const users = [
    {
      id: '1',
      email: 'thabo.ndlovu@micm.co.za',
      firstName: 'Thabo',
      lastName: 'Ndlovu',
      role: 'student' as const,
      phone: '+27 82 123 4567',
      age: 14,
      instrument: 'Piano',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-12-10'),
      status: 'active' as const,
    },
    {
      id: '2',
      email: 'zanele.mthembu@micm.co.za',
      firstName: 'Zanele',
      lastName: 'Mthembu',
      role: 'student' as const,
      phone: '+27 83 234 5678',
      age: 16,
      instrument: 'Violin',
      createdAt: new Date('2024-02-20'),
      lastLogin: new Date('2024-12-09'),
      status: 'active' as const,
    },
    {
      id: '3',
      email: 'sarah.mkhize@micm.co.za',
      firstName: 'Sarah',
      lastName: 'Mkhize',
      role: 'teacher' as const,
      phone: '+27 84 345 6789',
      instruments: ['Piano', 'Music Theory'],
      createdAt: new Date('2023-06-01'),
      lastLogin: new Date('2024-12-11'),
      status: 'active' as const,
    },
    {
      id: '4',
      email: 'john.doe@micm.co.za',
      firstName: 'John',
      lastName: 'Doe',
      role: 'teacher' as const,
      phone: '+27 85 456 7890',
      instruments: ['Guitar', 'Ensemble'],
      createdAt: new Date('2023-08-15'),
      lastLogin: new Date('2024-12-08'),
      status: 'active' as const,
    },
    {
      id: '5',
      email: 'admin@micm.co.za',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin' as const,
      phone: '+27 86 567 8901',
      createdAt: new Date('2023-01-01'),
      lastLogin: new Date('2024-12-11'),
      status: 'active' as const,
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'teacher':
        return <GraduationCap className="w-4 h-4" />;
      case 'student':
        return <UserCheck className="w-4 h-4" />;
      default:
        return <UsersIcon className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-700',
      teacher: 'bg-blue-100 text-blue-700',
      student: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`badge ${colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700'} flex items-center gap-1`}>
        {getRoleIcon(role)}
        <span className="capitalize">{role}</span>
      </span>
    );
  };

  if (action === 'create') {
    return (
      <div className="space-y-6">
        <BackButton to="/users" />
        <div className="card max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-gray-900">Add New User</h1>
              <p className="text-gray-600">Create a new user account</p>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" className="input-field" placeholder="John" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" className="input-field" placeholder="Doe" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" className="input-field" placeholder="user@micm.co.za" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" className="input-field" placeholder="+27 82 123 4567" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select className="input-field" required>
                <option value="">Select a role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input type="password" className="input-field" placeholder="Enter password" required />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button type="submit" className="btn-primary">Create User</button>
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
          <h1 className="text-3xl font-display font-bold text-gray-900 mt-2 mb-2">User Management</h1>
          <p className="text-gray-600">Manage students, teachers, and administrators</p>
        </div>
        <button
          onClick={() => setSearchParams({ action: 'create' })}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
              className="input-field"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      {filteredUsers.length > 0 ? (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">User</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Details</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Login</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-medium text-sm">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="hidden md:inline">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {user.role === 'student' && (
                        <div className="text-sm text-gray-600">
                          <p>Age: {user.age}</p>
                          <p>Instrument: {user.instrument}</p>
                        </div>
                      )}
                      {user.role === 'teacher' && (
                        <div className="text-sm text-gray-600">
                          <p>Instruments: {user.instruments?.join(', ')}</p>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-600">
                        {user.lastLogin ? format(user.lastLogin, 'MMM d, yyyy') : 'Never'}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card text-center py-12">
          <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No users found</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Students</p>
          <p className="text-2xl font-bold text-green-600">
            {users.filter(u => u.role === 'student').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Teachers</p>
          <p className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'teacher').length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Admins</p>
          <p className="text-2xl font-bold text-red-600">
            {users.filter(u => u.role === 'admin').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Users;

