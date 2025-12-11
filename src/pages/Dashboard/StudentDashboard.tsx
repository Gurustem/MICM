import { BookOpen, Music, Clock, Award, TrendingUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

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
    { id: '1', title: 'Piano Basics - Lesson 5', time: new Date(Date.now() + 86400000), instructor: 'Sarah Mkhize' },
    { id: '2', title: 'Music Theory - Scales', time: new Date(Date.now() + 172800000), instructor: 'John Doe' },
  ];

  const recentCourses = [
    { id: '1', title: 'Piano Fundamentals', progress: 65, instructor: 'Sarah Mkhize' },
    { id: '2', title: 'Music Theory Basics', progress: 40, instructor: 'John Doe' },
    { id: '3', title: 'Jazz Ensemble', progress: 30, instructor: 'Mike Smith' },
  ];

  const borrowedInstruments = [
    { id: '1', name: 'Yamaha Piano Keyboard', dueDate: new Date(Date.now() + 2592000000) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Welcome back, {user?.firstName}! 🎵
        </h1>
        <p className="text-gray-600">Continue your musical journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/courses')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats.enrolledCourses}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/practice')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Practice Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.practiceHours}h</p>
            </div>
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed Lessons</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedLessons}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Badges Earned</p>
              <p className="text-2xl font-bold text-gray-900">{stats.badges}</p>
            </div>
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <button
              onClick={() => navigate('/courses')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Lessons</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-1">{lesson.title}</h3>
                <p className="text-sm text-gray-600 mb-1">Instructor: {lesson.instructor}</p>
                <p className="text-sm text-primary-600 font-medium">
                  {format(lesson.time, 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Borrowed Instruments */}
      {borrowedInstruments.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Borrowed Instruments</h2>
            <button
              onClick={() => navigate('/inventory')}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {borrowedInstruments.map((instrument) => (
              <div
                key={instrument.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{instrument.name}</p>
                    <p className="text-sm text-gray-600">
                      Due: {format(instrument.dueDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Streak */}
      <div className="card bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Practice Streak</p>
            <p className="text-3xl font-bold">{stats.currentStreak} days 🔥</p>
            <p className="text-sm opacity-90 mt-2">Keep it up!</p>
          </div>
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

