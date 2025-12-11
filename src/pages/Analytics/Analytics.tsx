import { BarChart3, TrendingUp, Users, BookOpen, Music, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  // Mock data
  const stats = {
    totalStudents: 340,
    activeStudents: 285,
    totalCourses: 48,
    completionRate: 72,
    averagePracticeHours: 8.5,
  };

  const progressData = [
    { level: 'Beginner', count: 120 },
    { level: 'Intermediate', count: 150 },
    { level: 'Advanced', count: 70 },
  ];

  const instrumentData = [
    { instrument: 'Piano', count: 85 },
    { instrument: 'Guitar', count: 65 },
    { instrument: 'Violin', count: 45 },
    { instrument: 'Drums', count: 40 },
    { instrument: 'Saxophone', count: 35 },
    { instrument: 'Other', count: 70 },
  ];

  const COLORS = ['#0073e6', '#00a68c', '#ffa41a', '#ef4444', '#8b5cf6', '#ec4899'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Insights into student progress and engagement</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Students</p>
            <Users className="w-5 h-5 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Active Students</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Courses</p>
            <BookOpen className="w-5 h-5 text-secondary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalCourses}</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Completion Rate</p>
            <BarChart3 className="w-5 h-5 text-accent-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Avg Practice Hours</p>
            <Music className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.averagePracticeHours}h</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress by Level */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Students by Level</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0073e6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Instrument Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Instrument Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={instrumentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ instrument, percent }) => `${instrument}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {instrumentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Reports */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900 mb-1">Student Progress Report</h3>
            <p className="text-sm text-gray-600">View individual student progress</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900 mb-1">Attendance Report</h3>
            <p className="text-sm text-gray-600">Track student attendance</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left">
            <h3 className="font-medium text-gray-900 mb-1">Inventory Usage</h3>
            <p className="text-sm text-gray-600">Instrument borrowing statistics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

