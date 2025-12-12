import { Users, BookOpen, ClipboardCheck, Music, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalStudents: 12,
    activeCourses: 8,
    pendingAssessments: 12,
    borrowedInstruments: 23,
  };

  const recentStudents = [
    { id: '1', name: 'Thabo Ndlovu', instrument: 'Piano', progress: 75 },
    { id: '2', name: 'Zanele Mthembu', instrument: 'Violin', progress: 60 },
    { id: '3', name: 'Sipho Dlamini', instrument: 'Guitar', progress: 45 },
  ];

  const pendingTasks = [
    { id: '1', type: 'assessment', title: 'Grade Piano Performance - Thabo Ndlovu', due: '2 days' },
    { id: '2', type: 'assessment', title: 'Review Music Theory Quiz - Class A', due: '3 days' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Welcome, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600">Here's your teaching overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCourses}</p>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/assessments')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingAssessments}</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/inventory')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Borrowed Instruments</p>
              <p className="text-2xl font-bold text-gray-900">{stats.borrowedInstruments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
            <button
              onClick={() => navigate('/users')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-medium text-sm">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.instrument}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                  <p className="text-xs text-gray-500">Progress</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
            <AlertCircle className="w-5 h-5 text-accent-500" />
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                onClick={() => navigate('/assessments')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-1">{task.title}</p>
                    <span className="badge bg-accent-100 text-accent-700">
                      Due in {task.due}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/courses?action=create')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <BookOpen className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">Create New Course</p>
            <p className="text-sm text-gray-600 mt-1">Set up a new course</p>
          </button>
          <button
            onClick={() => navigate('/assessments?action=create')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <ClipboardCheck className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">Create Assessment</p>
            <p className="text-sm text-gray-600 mt-1">Add a new assignment</p>
          </button>
          <button
            onClick={() => navigate('/analytics')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left"
          >
            <TrendingUp className="w-6 h-6 text-primary-600 mb-2" />
            <p className="font-medium text-gray-900">View Analytics</p>
            <p className="text-sm text-gray-600 mt-1">Check progress reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

