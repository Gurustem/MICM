import { BookOpen, ClipboardCheck, Music, TrendingUp, AlertCircle, GraduationCap, Clock, Target, ArrowUpRight, Sparkles } from 'lucide-react';
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
      icon: GraduationCap,
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600',
      borderColor: 'border-primary-200',
      path: '/users',
      trend: '+2',
    },
    {
      label: 'Active Courses',
      value: stats.activeCourses,
      icon: BookOpen,
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-600',
      borderColor: 'border-secondary-200',
      path: '/courses',
      trend: '+1',
    },
    {
      label: 'Pending Assessments',
      value: stats.pendingAssessments,
      icon: ClipboardCheck,
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600',
      borderColor: 'border-accent-200',
      path: '/assessments',
      trend: '3 new',
    },
    {
      label: 'Borrowed Instruments',
      value: stats.borrowedInstruments,
      icon: Music,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
      path: '/inventory',
    },
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
            Welcome, {user?.firstName}! 👋
          </h1>
        </div>
        <p className="text-gray-600 ml-14">Here's your teaching overview</p>
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
                      <span className="text-xs font-medium text-green-600">
                        {stat.trend}
                      </span>
                    )}
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/users')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
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
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate('/users')}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-md"
                  >
                    <span className="text-white font-medium text-sm">
                      {student.avatar}
                    </span>
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.instrument}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-primary-600" />
                    <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                  </div>
                  <div className="w-20 bg-gray-200 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${student.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="bg-primary-600 h-1.5 rounded-full"
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
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <AlertCircle className="w-5 h-5 text-accent-500" />
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
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate('/assessments')}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ClipboardCheck className="w-4 h-4 text-accent-600" />
                      <p className="font-medium text-gray-900">{task.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge ${task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'} flex items-center gap-1`}>
                        <Clock className="w-3 h-3" />
                        Due in {task.due}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, label: 'Create New Course', desc: 'Set up a new course', path: '/courses?action=create', bgColor: 'bg-primary-100', iconColor: 'text-primary-600', hoverBg: 'hover:bg-primary-200' },
            { icon: ClipboardCheck, label: 'Create Assessment', desc: 'Add a new assignment', path: '/assessments?action=create', bgColor: 'bg-secondary-100', iconColor: 'text-secondary-600', hoverBg: 'hover:bg-secondary-200' },
            { icon: TrendingUp, label: 'View Analytics', desc: 'Check progress reports', path: '/analytics', bgColor: 'bg-accent-100', iconColor: 'text-accent-600', hoverBg: 'hover:bg-accent-200' },
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

export default TeacherDashboard;
