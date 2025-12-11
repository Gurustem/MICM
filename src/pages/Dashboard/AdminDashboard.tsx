import { Users, BookOpen, Music, TrendingUp, AlertCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalStudents: 340,
    totalTeachers: 16,
    activeCourses: 48,
    totalInstruments: 120,
    overdueInstruments: 5,
  };

  const systemAlerts = [
    { id: '1', type: 'warning', message: '5 instruments overdue for return', action: 'View Inventory' },
    { id: '2', type: 'info', message: '3 new student registrations pending approval', action: 'Review' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">System overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/users')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/users')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Teachers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTeachers}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/inventory')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Instruments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInstruments}</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/inventory?filter=overdue')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overdue</p>
              <p className="text-2xl font-bold text-red-600">{stats.overdueInstruments}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="card border-l-4 border-accent-500">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-accent-500" />
            <h2 className="text-xl font-semibold text-gray-900">System Alerts</h2>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
              >
                <p className="text-gray-700">{alert.message}</p>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  {alert.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => navigate('/users?action=create')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <Users className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">Add User</p>
            <p className="text-sm text-gray-600 mt-1">Create new account</p>
          </button>
          <button
            onClick={() => navigate('/inventory?action=add')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <Music className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">Add Instrument</p>
            <p className="text-sm text-gray-600 mt-1">Register new item</p>
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <TrendingUp className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">View Reports</p>
            <p className="text-sm text-gray-600 mt-1">Analytics & insights</p>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <Settings className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">Settings</p>
            <p className="text-sm text-gray-600 mt-1">System configuration</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

