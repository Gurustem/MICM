import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, FileText, Music, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data
  const course = {
    id: id || '1',
    title: 'Piano Fundamentals',
    description: 'Learn the basics of piano playing, from reading sheet music to playing your first songs. This comprehensive course covers proper technique, music theory, and practical exercises.',
    category: 'instrument' as const,
    instrument: 'Piano',
    level: 'beginner' as const,
    instructor: 'Sarah Mkhize',
    enrolledStudents: 25,
    lessons: [
      {
        id: '1',
        title: 'Introduction to the Piano',
        description: 'Learn about the piano keyboard and basic posture',
        order: 1,
        duration: 30,
        completed: true,
      },
      {
        id: '2',
        title: 'Reading Sheet Music',
        description: 'Understanding musical notation and staff',
        order: 2,
        duration: 45,
        completed: true,
      },
      {
        id: '3',
        title: 'Playing Your First Song',
        description: 'Practice with simple melodies',
        order: 3,
        duration: 40,
        completed: false,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/courses')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Courses
      </button>

      {/* Course Header */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 h-48 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <Music className="w-24 h-24 text-white opacity-80" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge bg-primary-100 text-primary-700 capitalize">
                {course.category}
              </span>
              <span className="badge bg-secondary-100 text-secondary-700">
                {course.instrument}
              </span>
              <span className="badge bg-gray-100 text-gray-700 capitalize">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
              {course.title}
            </h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Instructor: {course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{course.lessons.length} Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Lessons</h2>
        <div className="space-y-3">
          {course.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
              onClick={() => navigate(`/courses/${course.id}/lessons/${lesson.id}`)}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                {lesson.completed ? (
                  <CheckCircle className="w-6 h-6 text-primary-600" />
                ) : (
                  <span className="text-primary-600 font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                  {lesson.completed && (
                    <span className="badge bg-green-100 text-green-700 text-xs">Completed</span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{lesson.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.duration} min
                  </span>
                </div>
              </div>
              <button className="flex-shrink-0 p-2 text-primary-600 hover:bg-primary-50 rounded-lg">
                <Play className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Course Syllabus</p>
                <p className="text-xs text-gray-500">PDF • 2.3 MB</p>
              </div>
            </div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Music className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">Practice Exercises</p>
                <p className="text-xs text-gray-500">PDF • 1.8 MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

