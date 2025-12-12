import { FaGraduationCap, FaBook, FaClipboardCheck, FaMusic, FaChartLine, FaExclamationTriangle, FaClock, FaBullseye, FaArrowUp, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalStudents: 12,
    activeCourses: 8,
    pendingAssessments: 12,
    borrowedInstruments: 23,
    leaveDays: {
      annual: 11,
      sick: 10,
      familyResponsibility: 5,
      other: 3,
    },
  };

  const recentStudents = [
    { id: '1', name: 'Thabo Ndlovu', instrument: 'Piano', progress: 75, avatar: 'TN' },
    { id: '2', name: 'Zanele Mthembu', instrument: 'Violin', progress: 60, avatar: 'ZM' },
    { id: '3', name: 'Sipho Dlamini', instrument: 'Guitar', progress: 45, avatar: 'SD' },
  ];

  const pendingTasks = [
    { id: '1', type: 'assessment', title: 'Grade Piano Performance - Thabo Ndlovu', due: '2 days', priority: 'high' },
    { id: '2', type: 'assessment', title: 'Review Music Theory Quiz - Class A', due: '3 days', priority: 'medium' },
  ];

  const statCards = [
    {
      label: 'Total Students',
      value: stats.totalStudents,
      icon: FaGraduationCap,
      gradient: 'from-blue-500 to-blue-600',
      path: '/users',
      trend: '+2',
    },
    {
      label: 'Active Courses',
      value: stats.activeCourses,
      icon: FaBook,
      gradient: 'from-teal-500 to-teal-600',
      path: '/courses',
      trend: '+1',
    },
    {
      label: 'Pending Assessments',
      value: stats.pendingAssessments,
      icon: FaClipboardCheck,
      gradient: 'from-orange-500 to-orange-600',
      path: '/assessments',
      trend: '3 new',
    },
    {
      label: 'Borrowed Instruments',
      value: stats.borrowedInstruments,
      icon: FaMusic,
      gradient: 'from-purple-500 to-purple-600',
      path: '/inventory',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <FaBook className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">
              Welcome, {user?.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's your teaching overview</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="card cursor-pointer group border-0 hover:shadow-lg transition-all duration-300"
              onClick={() => navigate(stat.path)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.trend && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-green-100 text-green-700">
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/users')}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View All
              <FaArrowUp className="w-3 h-3 rotate-45" />
            </motion.button>
          </div>
          <div className="space-y-3">
            {recentStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-white to-blue-50/30"
                onClick={() => navigate('/users')}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md"
                  >
                    <span className="text-white font-semibold text-sm">
                      {student.avatar}
                    </span>
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.instrument}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <FaBullseye className="w-4 h-4 text-blue-500" />
                    <p className="text-sm font-semibold text-gray-900">{student.progress}%</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="bg-gradient-to-r from-blue-500 to-teal-500 h-1.5 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FaExclamationTriangle className="w-5 h-5 text-orange-500" />
            </motion.div>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: -4 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-white to-orange-50/30"
                onClick={() => navigate('/assessments')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FaClipboardCheck className="w-4 h-4 text-orange-500" />
                      <p className="font-semibold text-gray-900">{task.title}</p>
                    </div>
                    <span className={`badge ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    } flex items-center gap-1`}>
                      <FaClock className="w-3 h-3" />
                      Due in {task.due}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leave Days Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card bg-gradient-to-r from-blue-50 to-teal-50 border-0 border-l-4 border-blue-400"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <FaCalendarAlt className="w-5 h-5 text-white" />
            </div>
            Leave Balance
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/leave')}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            Manage Leave
            <FaArrowUp className="w-3 h-3 rotate-45" />
          </motion.button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Annual Leave', value: stats.leaveDays.annual, total: 14, color: 'from-blue-500 to-blue-600' },
            { label: 'Sick Leave', value: stats.leaveDays.sick, total: 10, color: 'from-red-500 to-red-600' },
            { label: 'Family Responsibility', value: stats.leaveDays.familyResponsibility, total: 5, color: 'from-purple-500 to-purple-600' },
            { label: 'Other', value: stats.leaveDays.other, total: 3, color: 'from-gray-500 to-gray-600' },
          ].map((leave, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-100"
            >
              <p className="text-xs text-gray-600 mb-2">{leave.label}</p>
              <p className="text-2xl font-bold text-gray-900">{leave.value} / {leave.total}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(leave.value / leave.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                  className={`bg-gradient-to-r ${leave.color} h-1.5 rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card border-0"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: FaBook, label: 'Create New Course', desc: 'Set up a new course', path: '/courses?action=create', gradient: 'from-blue-500 to-blue-600' },
            { icon: FaClipboardCheck, label: 'Create Assessment', desc: 'Add a new assignment', path: '/assessments?action=create', gradient: 'from-teal-500 to-teal-600' },
            { icon: FaChartLine, label: 'View Analytics', desc: 'Check progress reports', path: '/analytics', gradient: 'from-purple-500 to-purple-600' },
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(action.path)}
                className="p-5 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-teal-50 transition-all text-left group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">{action.label}</p>
                  <p className="text-sm text-gray-600">{action.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default TeacherDashboard;
