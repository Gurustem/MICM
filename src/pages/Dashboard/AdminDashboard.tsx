import { Users, BookOpen, Music, TrendingUp, AlertCircle, Settings, GraduationCap, UserCheck, ArrowUpRight, Sparkles } from 'lucide-react';
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
      icon: GraduationCap,
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600',
      borderColor: 'border-primary-200',
      path: '/users?type=internal',
      trend: '+12%',
    },
    {
      label: 'External Students',
      value: stats.externalStudents,
      icon: GraduationCap,
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-600',
      borderColor: 'border-secondary-200',
      path: '/users?type=external',
      trend: '+25',
    },
    {
      label: 'Teachers',
      value: stats.totalTeachers,
      icon: UserCheck,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      path: '/users?role=teacher',
      trend: '+2',
    },
    {
      label: 'Active Courses',
      value: stats.activeCourses,
      icon: BookOpen,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      path: '/courses',
      trend: '+5',
    },
    {
      label: 'Instruments',
      value: stats.totalInstruments,
      icon: Music,
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600',
      borderColor: 'border-accent-200',
      path: '/inventory',
      trend: '+8',
    },
    {
      label: 'Overdue',
      value: stats.overdueInstruments,
      icon: AlertCircle,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
      path: '/inventory?filter=overdue',
      trend: '-2',
    },
  ];

  const quickActions = [
    { icon: Users, label: 'Add User', desc: 'Create new account', path: '/users?action=create', bgColor: 'bg-primary-100', iconColor: 'text-primary-600', hoverBg: 'hover:bg-primary-200' },
    { icon: Music, label: 'Add Instrument', desc: 'Register new item', path: '/inventory?action=add', bgColor: 'bg-secondary-100', iconColor: 'text-secondary-600', hoverBg: 'hover:bg-secondary-200' },
    { icon: TrendingUp, label: 'View Reports', desc: 'Analytics & insights', path: '/analytics', bgColor: 'bg-accent-100', iconColor: 'text-accent-600', hoverBg: 'hover:bg-accent-200' },
    { icon: Settings, label: 'Settings', desc: 'System configuration', path: '/settings', bgColor: 'bg-green-100', iconColor: 'text-green-600', hoverBg: 'hover:bg-green-200' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-gray-600 ml-14">System overview and management</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
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
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="card border-2 border-transparent hover:border-gray-200 cursor-pointer group relative overflow-hidden"
              onClick={() => navigate(stat.path)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.trend && (
                      <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </div>
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`w-14 h-14 ${stat.bgColor} ${stat.textColor} ${stat.borderColor} rounded-xl flex items-center justify-center border-2 group-hover:shadow-lg transition-shadow`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>
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
          className="card border-l-4 border-accent-500 bg-gradient-to-r from-accent-50 to-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <AlertCircle className="w-5 h-5 text-accent-500" />
            </motion.div>
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
                className="p-4 bg-white rounded-lg flex items-center justify-between border border-gray-200 hover:border-accent-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => {
                  if (alert.action === 'View Inventory') navigate('/inventory?filter=overdue');
                  else if (alert.action === 'Review') navigate('/users');
                }}
              >
                <p className="text-gray-700">{alert.message}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                  {alert.action}
                  <ArrowUpRight className="w-4 h-4" />
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
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
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
                className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-500 hover:bg-gradient-to-br hover:from-primary-50 hover:to-white transition-all text-left group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all" />
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 ${action.bgColor} ${action.hoverBg} rounded-xl flex items-center justify-center mb-3 transition-colors`}
                  >
                    <Icon className={`w-6 h-6 ${action.iconColor}`} />
                  </motion.div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">{action.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{action.desc}</p>
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
