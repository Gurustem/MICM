import { useState } from 'react';
import { FaClipboardList, FaPlus, FaSearch, FaFilter, FaClock, FaCheckCircle, FaFileAlt, FaUpload, FaQuestionCircle, FaTrophy, FaArrowUp } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';

const Assessments = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const isStudent = user?.role === 'student';
  const canCreate = user?.role === 'teacher' || user?.role === 'admin';

  // Mock data
  const assessments = [
    {
      id: '1',
      title: 'Piano Performance - Lesson 5',
      course: 'Piano Fundamentals',
      type: 'audio-upload' as const,
      dueDate: new Date(Date.now() + 86400000 * 3),
      maxScore: 100,
      status: isStudent ? 'pending' as const : 'submitted' as const,
      submittedAt: isStudent ? undefined : new Date(Date.now() - 86400000),
      score: isStudent ? undefined : 85,
      studentName: isStudent ? undefined : 'Thabo Ndlovu',
      description: 'Record and submit a performance of the assigned piece',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      id: '2',
      title: 'Music Theory Quiz - Scales',
      course: 'Music Theory Basics',
      type: 'quiz' as const,
      dueDate: new Date(Date.now() + 86400000 * 5),
      maxScore: 50,
      status: isStudent ? 'submitted' as const : 'graded' as const,
      submittedAt: new Date(Date.now() - 86400000 * 2),
      score: isStudent ? 42 : 42,
      studentName: isStudent ? undefined : 'Zanele Mthembu',
      description: 'Complete the quiz on major and minor scales',
      gradient: 'from-teal-500 to-teal-600',
    },
    {
      id: '3',
      title: 'Composition Assignment',
      course: 'Music Composition',
      type: 'file-upload' as const,
      dueDate: new Date(Date.now() + 86400000 * 7),
      maxScore: 100,
      status: 'pending' as const,
      description: 'Compose a 16-bar melody in C major',
      gradient: 'from-purple-500 to-purple-600',
    },
  ];

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || assessment.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    pending: assessments.filter(a => a.status === 'pending').length,
    submitted: assessments.filter(a => a.status === 'submitted').length,
    graded: assessments.filter(a => a.status === 'graded').length,
    averageScore: assessments.filter(a => a.score !== undefined).reduce((sum, a) => sum + (a.score || 0), 0) / assessments.filter(a => a.score !== undefined).length || 0,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="badge bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="badge bg-blue-100 text-blue-700 flex items-center gap-1">
            <FaCheckCircle className="w-3 h-3" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="badge bg-green-100 text-green-700 flex items-center gap-1">
            <FaTrophy className="w-3 h-3" />
            Graded
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'audio-upload':
        return FaUpload;
      case 'quiz':
        return FaQuestionCircle;
      case 'file-upload':
        return FaFileAlt;
      default:
        return FaClipboardList;
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <BackButton />
          <div className="flex items-center gap-4 mt-2 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaClipboardList className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">Assessments</h1>
              <p className="text-gray-600">
                {isStudent ? 'View and submit your assignments' : 'Manage student assessments'}
              </p>
            </div>
          </div>
        </div>
        {canCreate && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Create assessment')}
            className="btn-primary flex items-center gap-2"
          >
            <FaPlus className="w-5 h-5" />
            Create Assessment
          </motion.button>
        )}
      </motion.div>

      {/* Stats */}
      {isStudent && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Pending', value: stats.pending, icon: FaClock, gradient: 'from-yellow-500 to-yellow-600' },
            { label: 'Submitted', value: stats.submitted, icon: FaCheckCircle, gradient: 'from-blue-500 to-blue-600' },
            { label: 'Graded', value: stats.graded, icon: FaTrophy, gradient: 'from-green-500 to-green-600' },
            { label: 'Avg. Score', value: Math.round(stats.averageScore), icon: FaTrophy, gradient: 'from-purple-500 to-purple-600', suffix: '%' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}{stat.suffix}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card border-0"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative group">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search assessments..."
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
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Assessments List */}
      {filteredAssessments.length > 0 ? (
        <div className="space-y-4">
          {filteredAssessments.map((assessment, index) => {
            const TypeIcon = getTypeIcon(assessment.type);
            return (
              <motion.div
                key={assessment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className="card border-0 hover:shadow-xl transition-all cursor-pointer border-l-4 border-transparent hover:border-blue-400"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${assessment.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                        <TypeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{assessment.title}</h3>
                          {getStatusBadge(assessment.status)}
                        </div>
                        <p className="text-sm text-gray-600">Course: {assessment.course}</p>
                      </div>
                    </div>
                    {assessment.description && (
                      <p className="text-sm text-gray-700 mb-3 ml-15">{assessment.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2 ml-15">
                      <span className="flex items-center gap-2">
                        <FaClock className="w-4 h-4" />
                        Due: {format(assessment.dueDate, 'MMM d, yyyy • h:mm a')}
                      </span>
                      <span>Max Score: {assessment.maxScore}</span>
                      {assessment.score !== undefined && (
                        <span className="font-semibold text-gray-900 flex items-center gap-2">
                          <FaTrophy className="w-4 h-4 text-green-600" />
                          Score: {assessment.score}/{assessment.maxScore} ({Math.round((assessment.score / assessment.maxScore) * 100)}%)
                        </span>
                      )}
                    </div>
                    {assessment.studentName && (
                      <p className="text-sm text-gray-600 mt-2 ml-15">Student: {assessment.studentName}</p>
                    )}
                    {assessment.submittedAt && (
                      <p className="text-xs text-gray-500 mt-1 ml-15">
                        Submitted: {format(assessment.submittedAt, 'MMM d, yyyy • h:mm a')}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    {isStudent && assessment.status === 'pending' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-sm flex items-center justify-center gap-2"
                      >
                        <FaUpload className="w-4 h-4" />
                        Submit
                      </motion.button>
                    )}
                    {!isStudent && assessment.status === 'submitted' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary text-sm flex items-center justify-center gap-2"
                      >
                        <FaTrophy className="w-4 h-4" />
                        Grade
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-secondary text-sm flex items-center justify-center gap-2"
                    >
                      View Details
                      <FaArrowUp className="w-4 h-4 rotate-45" />
                    </motion.button>
                  </div>
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
          <FaClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No assessments found</p>
        </motion.div>
      )}
    </div>
  );
};

export default Assessments;
