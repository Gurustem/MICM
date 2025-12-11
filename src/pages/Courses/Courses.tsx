import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, BookOpen, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || course.category === filter;
    return matchesSearch && matchesFilter;
  });

  const canCreateCourse = user?.role === 'teacher' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Courses</h1>
          <p className="text-gray-600">Browse and manage your courses</p>
        </div>
        {canCreateCourse && (
          <button
            onClick={() => navigate('/courses/new')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Course
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
              placeholder="Search courses..."
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
              <option value="all">All Categories</option>
              <option value="instrument">Instruments</option>
              <option value="theory">Theory</option>
              <option value="ensemble">Ensembles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg -m-6 mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg -m-6 mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-80" />
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge bg-primary-100 text-primary-700 capitalize">
                      {course.category}
                    </span>
                    {course.instrument && (
                      <span className="badge bg-secondary-100 text-secondary-700">
                        {course.instrument}
                      </span>
                    )}
                    <span className="badge bg-gray-100 text-gray-700 capitalize ml-auto">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledStudents} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No courses found</p>
        </div>
      )}
    </div>
  );
};

export default Courses;

