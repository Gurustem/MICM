import { FaBook, FaMusic, FaClock, FaTrophy, FaChartLine, FaCalendarAlt, FaArrowUp, FaFire, FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data - will be replaced with Firebase
  const stats = {
    enrolledCourses: 3,
    practiceHours: 24,
    completedLessons: 12,
    badges: 5,
    currentStreak: 7,
  };

  const upcomingLessons = [
    { id: '1', title: 'Piano Basics - Lesson 5', time: new Date(Date.now() + 86400000), instructor: 'Sarah Mkhize', type: 'piano' },
    { id: '2', title: 'Music Theory - Scales', time: new Date(Date.now() + 172800000), instructor: 'John Doe', type: 'theory' },
  ];

  const recentCourses = [
    { id: '1', title: 'Piano Fundamentals', progress: 65, instructor: 'Sarah Mkhize', gradient: 'from-blue-500 to-blue-600' },
    { id: '2', title: 'Music Theory Basics', progress: 40, instructor: 'John Doe', gradient: 'from-teal-500 to-teal-600' },
    { id: '3', title: 'Jazz Ensemble', progress: 30, instructor: 'Mike Smith', gradient: 'from-purple-500 to-purple-600' },
  ];

  const borrowedInstruments = [
    { id: '1', name: 'Yamaha Piano Keyboard', dueDate: new Date(Date.now() + 2592000000) },
  ];

  const statCards = [
    {
      label: 'Enrolled Courses',
      value: stats.enrolledCourses,
      icon: FaBook,
      gradient: 'from-blue-500 to-blue-600',
      path: '/courses',
    },
    {
      label: 'Practice Hours',
      value: `${stats.practiceHours}h`,
      icon: FaClock,
      gradient: 'from-teal-500 to-teal-600',
      path: '/practice',
    },
    {
      label: 'Completed Lessons',
      value: stats.completedLessons,
      icon: FaChartLine,
      gradient: 'from-green-500 to-green-600',
    },
    {
      label: 'Badges Earned',
      value: stats.badges,
      icon: FaTrophy,
      gradient: 'from-yellow-500 to-yellow-600',
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
            <FaMusic className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold gradient-text">
              Welcome back, {user?.firstName}! 🎵
            </h1>
            <p className="text-gray-600 mt-1">Continue your musical journey</p>
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
              className={`card cursor-pointer group border-0 hover:shadow-lg transition-all duration-300 ${stat.path ? '' : ''}`}
              onClick={() => stat.path && navigate(stat.path)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                {stat.path && (
                  <FaArrowUp className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity rotate-45" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View All
              <FaArrowUp className="w-3 h-3 rotate-45" />
            </motion.button>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-white to-blue-50/30"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <span className="text-sm text-gray-500 font-medium">{course.progress}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`bg-gradient-to-r ${course.gradient} h-2.5 rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Lessons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Lessons</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <FaCalendarAlt className="w-5 h-5 text-blue-500" />
            </motion.div>
          </div>
          <div className="space-y-4">
            {upcomingLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all bg-gradient-to-r from-white to-teal-50/30"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    lesson.type === 'piano' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-teal-500 to-teal-600'
                  } shadow-md`}>
                    <FaPlayCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">Instructor: {lesson.instructor}</p>
                    <p className="text-sm text-blue-600 font-semibold">
                      {format(lesson.time, 'MMM d, yyyy • h:mm a')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Practice Streak */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="card bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 text-white border-0 shadow-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaFire className="w-6 h-6" />
              <p className="text-sm opacity-90">Current Practice Streak</p>
            </div>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="text-5xl font-bold mb-2"
            >
              {stats.currentStreak} days 🔥
            </motion.p>
            <p className="text-sm opacity-90">Keep it up! You're doing amazing!</p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30"
          >
            <FaTrophy className="w-12 h-12" />
          </motion.div>
        </div>
      </motion.div>

      {/* Borrowed Instruments */}
      {borrowedInstruments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Borrowed Instruments</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/inventory')}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              View All
              <FaArrowUp className="w-3 h-3 rotate-45" />
            </motion.button>
          </div>
          <div className="space-y-3">
            {borrowedInstruments.map((instrument, index) => (
              <motion.div
                key={instrument.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md"
                  >
                    <FaMusic className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900">{instrument.name}</p>
                    <p className="text-sm text-gray-600">
                      Due: {format(instrument.dueDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentDashboard;
