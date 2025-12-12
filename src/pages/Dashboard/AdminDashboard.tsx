import { FaUsers, FaBook, FaMusic, FaChartLine, FaExclamationTriangle, FaCog, FaGraduationCap, FaUserCheck, FaArrowUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalStudents: 155,
    internalStudents: 155,
    externalStudents: 300,
    totalTeachers: 16,
    activeCourses: 48,
    totalInstruments: 120,
    overdueInstruments: 5,
  };

  const systemAlerts = [
    { id: '1', type: 'warning', message: '5 instruments overdue for return', action: 'View Inventory' },
    { id: '2', type: 'info', message: '3 new student registrations pending approval', action: 'Review' },
  ];

  const statCards = [
    {
      label: 'Internal Students',
      value: stats.internalStudents,
      icon: FaGraduationCap,
      gradient: 'from-blue-500 to-blue-600',
      path: '/users?type=internal',
      trend: '+12%',
    },
    {
      label: 'External Students',
      value: stats.externalStudents,
      icon: FaGraduationCap,
      gradient: 'from-teal-500 to-teal-600',
      path: '/users?type=external',
      trend: '+25',
    },
    {
      label: 'Teachers',
      value: stats.totalTeachers,
      icon: FaUserCheck,
      gradient: 'from-green-500 to-green-600',
      path: '/users?role=teacher',
      trend: '+2',
    },
    {
      label: 'Active Courses',
      value: stats.activeCourses,
      icon: FaBook,
      gradient: 'from-purple-500 to-purple-600',
      path: '/courses',
      trend: '+5',
    },
    {
      label: 'Instruments',
      value: stats.totalInstruments,
      icon: FaMusic,
      gradient: 'from-pink-500 to-pink-600',
      path: '/inventory',
      trend: '+8',
    },
    {
      label: 'Overdue',
      value: stats.overdueInstruments,
      icon: FaExclamationTriangle,
      gradient: 'from-red-500 to-red-600',
      path: '/inventory?filter=overdue',
      trend: '-2',
    },
  ];

  const quickActions = [
    { icon: FaUsers, label: 'Add User', desc: 'Create new account', path: '/users?action=create', gradient: 'from-blue-500 to-blue-600' },
    { icon: FaMusic, label: 'Add Instrument', desc: 'Register new item', path: '/inventory?action=add', gradient: 'from-teal-500 to-teal-600' },
    { icon: FaChartLine, label: 'View Reports', desc: 'Analytics & insights', path: '/analytics', gradient: 'from-purple-500 to-purple-600' },
    { icon: FaCog, label: 'Settings', desc: 'System configuration', path: '/settings', gradient: 'from-gray-500 to-gray-600' },
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
            <FaChartLine className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">System overview and management</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
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
                  <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                    stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
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

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-l-4 border-orange-400 bg-gradient-to-r from-orange-50 to-amber-50 border-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">System Alerts</h2>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 bg-white rounded-xl flex items-center justify-between border border-orange-100 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  if (alert.action === 'View Inventory') navigate('/inventory?filter=overdue');
                  else if (alert.action === 'Review') navigate('/users');
                }}
              >
                <p className="text-gray-700 font-medium">{alert.message}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                >
                  {alert.action}
                  <FaArrowUp className="w-3 h-3 rotate-45" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card border-0"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
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

export default AdminDashboard;
