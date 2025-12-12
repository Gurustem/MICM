import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter, FaBook, FaUsers, FaArrowLeft, FaPlayCircle, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'instrument' | 'theory' | 'ensemble'>('all');

  // Mock data
  const courses = [
    {
      id: '1',
      title: 'Piano Fundamentals',
      description: 'Learn the basics of piano playing, from reading sheet music to playing your first songs.',
      category: 'instrument' as const,
      instrument: 'Piano',
      level: 'beginner' as const,
      instructor: 'Sarah Mkhize',
      enrolledStudents: 25,
      lessons: 12,
      thumbnail: undefined,
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: '2',
      title: 'Music Theory Basics',
      description: 'Understanding scales, chords, and musical notation.',
      category: 'theory' as const,
      level: 'beginner' as const,
      instructor: 'John Doe',
      enrolledStudents: 45,
      lessons: 8,
      thumbnail: undefined,
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      id: '3',
      title: 'Jazz Ensemble',
      description: 'Collaborative jazz performance and improvisation.',
      category: 'ensemble' as const,
      level: 'intermediate' as const,
      instructor: 'Mike Smith',
      enrolledStudents: 12,
      lessons: 16,
      thumbnail: undefined,
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || course.category === filter;
    return matchesSearch && matchesFilter;
  });

  const canCreateCourse = user?.role === 'teacher' || user?.role === 'admin';

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'instrument': return FaPlayCircle;
      case 'theory': return FaBook;
      case 'ensemble': return FaUsers;
      default: return FaBook;
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-700',
      intermediate: 'bg-yellow-100 text-yellow-700',
      advanced: 'bg-red-100 text-red-700',
    };
    return colors[level as keyof typeof colors] || colors.beginner;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <BackButton to="/dashboard" />
          <h1 className="text-3xl font-display font-bold gradient-text mt-2 mb-2">Courses</h1>
          <p className="text-gray-600">Browse and manage your courses</p>
        </div>
        {canCreateCourse && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/courses/new')}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus className="w-5 h-5" />
            Create Course
          </motion.button>
        )}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card border-0"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="input-field"
            >
              <option value="all">All Categories</option>
              <option value="instrument">Instruments</option>
              <option value="theory">Theory</option>
              <option value="ensemble">Ensemble</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => {
            const CategoryIcon = getCategoryIcon(course.category);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="card cursor-pointer group border-0 hover:shadow-xl transition-all duration-300"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <span className={`badge ${getLevelBadge(course.level)} capitalize`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="w-4 h-4 text-gray-400" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FaUsers className="w-4 h-4 text-gray-400" />
                      <span>{course.enrolledStudents}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBook className="w-4 h-4 text-gray-400" />
                      <span>{course.lessons}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-2">
                    View Course
                    <FaArrowLeft className="w-3 h-3 rotate-180" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card text-center py-12 border-0"
        >
          <FaBook className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No courses found</p>
        </motion.div>
      )}
    </div>
  );
};

export default Courses;
