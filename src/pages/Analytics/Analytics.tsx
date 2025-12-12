import { useState } from 'react';
import { TrendingUp, Users, BookOpen, Music, Download, Calendar, Award, Clock, Target, ArrowUp, ArrowDown, Activity, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, AreaChart, Area, Legend } from 'recharts';
import { motion } from 'framer-motion';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock data
  const stats = {
    totalStudents: 340,
    activeStudents: 285,
    totalCourses: 48,
    completionRate: 72,
    averagePracticeHours: 8.5,
    newStudentsThisMonth: 12,
    practiceHoursGrowth: 15,
    attendanceRate: 88,
  };

  const progressData = [
    { level: 'Beginner', count: 120, color: '#0073e6' },
    { level: 'Intermediate', count: 150, color: '#00a68c' },
    { level: 'Advanced', count: 70, color: '#ffa41a' },
  ];

  const instrumentData = [
    { instrument: 'Piano', count: 85, percentage: 25 },
    { instrument: 'Guitar', count: 65, percentage: 19 },
    { instrument: 'Violin', count: 45, percentage: 13 },
    { instrument: 'Drums', count: 40, percentage: 12 },
    { instrument: 'Saxophone', count: 35, percentage: 10 },
    { instrument: 'Other', count: 70, percentage: 21 },
  ];

  const monthlyProgress = [
    { month: 'Jan', students: 280, practice: 6.2, completion: 65 },
    { month: 'Feb', students: 295, practice: 7.1, completion: 68 },
    { month: 'Mar', students: 310, practice: 7.8, completion: 70 },
    { month: 'Apr', students: 325, practice: 8.2, completion: 71 },
    { month: 'May', students: 340, practice: 8.5, completion: 72 },
  ];

  const attendanceData = [
    { day: 'Mon', attendance: 92 },
    { day: 'Tue', attendance: 88 },
    { day: 'Wed', attendance: 85 },
    { day: 'Thu', attendance: 90 },
    { day: 'Fri', attendance: 87 },
    { day: 'Sat', attendance: 95 },
  ];

  const COLORS = ['#0073e6', '#00a68c', '#ffa41a', '#ef4444', '#8b5cf6', '#ec4899'];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      primary: { bg: 'bg-primary-100', text: 'text-primary-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      accent: { bg: 'bg-accent-100', text: 'text-accent-600' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    };
    return colorMap[color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend, 
    trendValue,
    subtitle 
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    trend?: 'up' | 'down';
    trendValue?: string;
    subtitle?: string;
  }) => {
    const colorClasses = getColorClasses(color);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
              <Icon className={`w-5 h-5 ${colorClasses.text}`} />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && trendValue && (
              <div className={`flex items-center gap-1 text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      </motion.div>
    );
  };

  const ProgressBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">{label}</span>
          <span className="text-gray-600">{value} ({percentage.toFixed(0)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Comprehensive insights into student progress and engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {(['week', 'month', 'year'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedPeriod === period
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="primary"
          trend="up"
          trendValue="+12 this month"
          subtitle="340 enrolled students"
        />
        <StatCard
          title="Active Students"
          value={stats.activeStudents}
          icon={Activity}
          color="green"
          trend="up"
          trendValue="84% active"
          subtitle="285 currently active"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={Target}
          color="accent"
          trend="up"
          trendValue="+2% this month"
          subtitle="72% course completion"
        />
        <StatCard
          title="Avg Practice Hours"
          value={`${stats.averagePracticeHours}h`}
          icon={Clock}
          color="purple"
          trend="up"
          trendValue={`+${stats.practiceHoursGrowth}%`}
          subtitle="8.5 hours per week"
        />
      </div>

      {/* Key Metrics Infographic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Total Courses</p>
              <p className="text-4xl font-bold">{stats.totalCourses}</p>
            </div>
            <BookOpen className="w-12 h-12 opacity-80" />
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <TrendingUp className="w-4 h-4" />
            <span>5 new courses this month</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="card bg-gradient-to-br from-secondary-500 to-secondary-600 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Attendance Rate</p>
              <p className="text-4xl font-bold">{stats.attendanceRate}%</p>
            </div>
            <Calendar className="w-12 h-12 opacity-80" />
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Zap className="w-4 h-4" />
            <span>Excellent engagement</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="card bg-gradient-to-br from-accent-500 to-accent-600 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">New Students</p>
              <p className="text-4xl font-bold">+{stats.newStudentsThisMonth}</p>
            </div>
            <Users className="w-12 h-12 opacity-80" />
          </div>
          <div className="flex items-center gap-2 text-sm opacity-90">
            <ArrowUp className="w-4 h-4" />
            <span>This month</span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Students by Level - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Students by Level</h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4 mb-6">
            {progressData.map((item) => (
              <ProgressBar
                key={item.level}
                label={item.level}
                value={item.count}
                max={340}
                color={item.color}
              />
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="level" tick={{ fill: '#6b7280', fontSize: 12 }} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Instrument Distribution - Enhanced */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Instrument Distribution</h2>
            <Music className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {instrumentData.map((item, index) => (
              <div
                key={item.instrument}
                className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.instrument}</span>
                  <span className="text-xs text-gray-500">{item.percentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-2 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={instrumentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percentage }) => `${percentage}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="count"
                animationBegin={0}
                animationDuration={1000}
              >
                {instrumentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number, _name: string, props: any) => [
                  `${value} students (${props.payload.percentage}%)`,
                  props.payload.instrument,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Monthly Progress Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Monthly Progress Trends</h2>
            <p className="text-sm text-gray-600">Track growth over the past 5 months</p>
          </div>
          <TrendingUp className="w-6 h-6 text-primary-600" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyProgress}>
            <defs>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0073e6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0073e6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPractice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00a68c" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00a68c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Legend />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="students"
              stroke="#0073e6"
              fillOpacity={1}
              fill="url(#colorStudents)"
              name="Active Students"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="practice"
              stroke="#00a68c"
              fillOpacity={1}
              fill="url(#colorPractice)"
              name="Avg Practice Hours"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="completion"
              stroke="#ffa41a"
              strokeWidth={2}
              name="Completion Rate %"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Weekly Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Weekly Attendance</h2>
            <p className="text-sm text-gray-600">Average attendance by day of week</p>
          </div>
          <Calendar className="w-6 h-6 text-primary-600" />
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 12 }} />
            <YAxis domain={[80, 100]} tick={{ fill: '#6b7280', fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number) => [`${value}%`, 'Attendance']}
            />
            <Bar dataKey="attendance" radius={[8, 8, 0, 0]}>
              {attendanceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.attendance >= 90 ? '#00a68c' : entry.attendance >= 85 ? '#0073e6' : '#ffa41a'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Enhanced Quick Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Reports & Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="group p-5 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Student Progress Report</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">View individual student progress and performance metrics</p>
            <span className="text-xs text-primary-600 font-medium">Generate Report →</span>
          </button>
          <button className="group p-5 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-secondary-100 rounded-lg group-hover:bg-secondary-200 transition-colors">
                <Calendar className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Attendance Report</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Track student attendance patterns and trends</p>
            <span className="text-xs text-primary-600 font-medium">View Report →</span>
          </button>
          <button className="group p-5 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors">
                <Music className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Inventory Usage</h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">Instrument borrowing statistics and utilization rates</p>
            <span className="text-xs text-primary-600 font-medium">View Analytics →</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;

