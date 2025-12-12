import { BookOpen, Music, Clock, Award, TrendingUp, Calendar, Sparkles, ArrowUpRight, Flame, PlayCircle } from 'lucide-react';
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
    { id: '1', title: 'Piano Fundamentals', progress: 65, instructor: 'Sarah Mkhize', color: 'primary' },
    { id: '2', title: 'Music Theory Basics', progress: 40, instructor: 'John Doe', color: 'secondary' },
    { id: '3', title: 'Jazz Ensemble', progress: 30, instructor: 'Mike Smith', color: 'accent' },
  ];

  const borrowedInstruments = [
    { id: '1', name: 'Yamaha Piano Keyboard', dueDate: new Date(Date.now() + 2592000000) },
  ];

  const statCards = [
    {
      label: 'Enrolled Courses',
      value: stats.enrolledCourses,
      icon: BookOpen,
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600',
      borderColor: 'border-primary-200',
      path: '/courses',
    },
    {
      label: 'Practice Hours',
      value: `${stats.practiceHours}h`,
      icon: Clock,
      bgColor: 'bg-secondary-100',
      textColor: 'text-secondary-600',
      borderColor: 'border-secondary-200',
      path: '/practice',
    },
    {
      label: 'Completed Lessons',
      value: stats.completedLessons,
      icon: TrendingUp,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
    },
    {
      label: 'Badges Earned',
      value: stats.badges,
      icon: Award,
      bgColor: 'bg-accent-100',
      textColor: 'text-accent-600',
      borderColor: 'border-accent-200',
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
            Welcome back, {user?.firstName}! 🎵
          </h1>
        </div>
        <p className="text-gray-600 ml-14">Continue your musical journey</p>
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
              className={`card border-2 border-transparent hover:border-gray-200 cursor-pointer group relative overflow-hidden ${stat.path ? '' : ''}`}
              onClick={() => stat.path && navigate(stat.path)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 ${stat.bgColor} ${stat.textColor} ${stat.borderColor} rounded-xl flex items-center justify-center border-2 group-hover:shadow-lg transition-shadow`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </div>
              {stat.path && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
              )}
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
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/courses')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
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
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={`h-2.5 rounded-full ${
                      course.color === 'primary' ? 'bg-primary-600' :
                      course.color === 'secondary' ? 'bg-secondary-600' :
                      'bg-accent-600'
                    }`}
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
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Lessons</h2>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Calendar className="w-5 h-5 text-primary-600" />
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
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lesson.type === 'piano' ? 'bg-primary-100' : 'bg-secondary-100'}`}>
                    <PlayCircle className={`w-5 h-5 ${lesson.type === 'piano' ? 'text-primary-600' : 'text-secondary-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{lesson.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">Instructor: {lesson.instructor}</p>
                    <p className="text-sm text-primary-600 font-medium">
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
        className="card bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-6 h-6" />
              <p className="text-sm opacity-90">Current Practice Streak</p>
            </div>
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              className="text-4xl font-bold mb-2"
            >
              {stats.currentStreak} days 🔥
            </motion.p>
            <p className="text-sm opacity-90">Keep it up! You're doing amazing!</p>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Award className="w-10 h-10" />
          </motion.div>
        </div>
      </motion.div>

      {/* Borrowed Instruments */}
      {borrowedInstruments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Borrowed Instruments</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/inventory')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
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
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center"
                  >
                    <Music className="w-6 h-6 text-primary-600" />
                  </motion.div>
                  <div>
                    <p className="font-medium text-gray-900">{instrument.name}</p>
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
