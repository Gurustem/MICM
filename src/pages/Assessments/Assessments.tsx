import { useState } from 'react';
import { ClipboardList, Plus, Search, Filter, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

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
    },
  ];

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || assessment.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="badge bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'submitted':
        return (
          <span className="badge bg-blue-100 text-blue-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="badge bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Graded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Assessments</h1>
          <p className="text-gray-600">
            {isStudent ? 'View and submit your assignments' : 'Manage student assessments'}
          </p>
        </div>
        {canCreate && (
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Assessment
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
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
      </div>

      {/* Assessments List */}
      {filteredAssessments.length > 0 ? (
        <div className="space-y-4">
          {filteredAssessments.map((assessment) => (
            <div
              key={assessment.id}
              className="card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
                    {getStatusBadge(assessment.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Course: {assessment.course}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Due: {format(assessment.dueDate, 'MMM d, yyyy • h:mm a')}
                    </span>
                    <span>Max Score: {assessment.maxScore}</span>
                    {assessment.score !== undefined && (
                      <span className="font-medium text-gray-900">
                        Score: {assessment.score}/{assessment.maxScore}
                      </span>
                    )}
                  </div>
                  {assessment.studentName && (
                    <p className="text-sm text-gray-600 mt-2">Student: {assessment.studentName}</p>
                  )}
                  {assessment.submittedAt && (
                    <p className="text-xs text-gray-500 mt-1">
                      Submitted: {format(assessment.submittedAt, 'MMM d, yyyy')}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {isStudent && assessment.status === 'pending' && (
                    <button className="btn-primary text-sm">Submit</button>
                  )}
                  {!isStudent && assessment.status === 'submitted' && (
                    <button className="btn-primary text-sm">Grade</button>
                  )}
                  <button className="btn-secondary text-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No assessments found</p>
        </div>
      )}
    </div>
  );
};

export default Assessments;

