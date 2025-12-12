import { useState } from 'react';
import { FaFileAlt, FaCalendarAlt, FaUsers, FaGraduationCap, FaChartLine, FaBook, FaMusic, FaClock, FaCheckCircle, FaTrophy, FaFilePdf, FaFileCsv } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { format, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';
import { motion } from 'framer-motion';
import BackButton from '@/components/BackButton';
import toast from 'react-hot-toast';

type ReportPeriod = 'quarterly' | 'semi-annual' | 'annual';
type ReportType = 'organizational' | 'student-progress';

const Reports = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<ReportPeriod>('quarterly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState<1 | 2 | 3 | 4>(1);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';

  // Get date range based on period
  const getDateRange = () => {
    let startDate: Date;
    let endDate: Date;
    const year = selectedYear;

    if (selectedPeriod === 'quarterly') {
      startDate = startOfQuarter(new Date(year, (selectedQuarter - 1) * 3, 1));
      endDate = endOfQuarter(new Date(year, (selectedQuarter - 1) * 3, 1));
    } else if (selectedPeriod === 'semi-annual') {
      const isFirstHalf = selectedQuarter <= 2;
      startDate = new Date(year, isFirstHalf ? 0 : 6, 1);
      endDate = new Date(year, isFirstHalf ? 5 : 11, 31);
    } else {
      startDate = startOfYear(new Date(year, 0, 1));
      endDate = endOfYear(new Date(year, 11, 31));
    }

    return { startDate, endDate };
  };

  // Mock organizational report data (for NPO reporting)
  const generateOrganizationalReport = () => {
    const { startDate, endDate } = getDateRange();
    
    return {
      period: selectedPeriod,
      startDate,
      endDate,
      // Student Metrics
      totalStudents: {
        internal: 155,
        external: 300,
        total: 455,
        newEnrollments: 45,
        growth: '+12%',
      },
      // Attendance Metrics
      attendance: {
        averageRate: 88,
        totalSessions: 1240,
        attendedSessions: 1091,
        byDay: {
          monday: 92,
          tuesday: 88,
          wednesday: 85,
          thursday: 90,
          friday: 87,
          saturday: 95,
        },
      },
      // Course Metrics
      courses: {
        total: 48,
        active: 45,
        completed: 320,
        completionRate: 72,
        newCourses: 5,
      },
      // Teacher Metrics
      teachers: {
        total: 16,
        active: 16,
        totalTeachingHours: 1240,
        averageHoursPerTeacher: 77.5,
        leaveDaysTaken: 23,
      },
      // Assessment Metrics
      assessments: {
        total: 156,
        completed: 142,
        averageScore: 78.5,
        passRate: 85,
        outstanding: 14,
      },
      // Practice Metrics
      practice: {
        totalHours: 1240,
        averagePerStudent: 2.7,
        studentsPracticing: 130,
        practiceRate: 84,
      },
      // Inventory Metrics
      inventory: {
        totalInstruments: 120,
        borrowed: 23,
        loaned: 45,
        available: 52,
        utilizationRate: 57,
      },
      // Outreach Program (External Students)
      outreach: {
        totalStudents: 300,
        groups: 8,
        averageGroupSize: 37.5,
        sessionsConducted: 96,
        attendanceRate: 82,
      },
      // Financial Impact (for NPO reporting)
      impact: {
        studentsServed: 455,
        lessonsDelivered: 2480,
        instrumentsLoaned: 45,
        communityReach: 455,
        volunteerHours: 0, // Can be added if applicable
      },
    };
  };

  // Mock student progress report data
  const generateStudentProgressReport = (studentId: string) => {
    return {
      student: {
        id: studentId,
        name: 'Thabo Ndlovu',
        instrument: 'Piano',
        grade: 'Grade 8',
        enrollmentDate: new Date(2023, 0, 15),
      },
      assessments: [
        {
          id: '1',
          title: 'Piano Performance - Lesson 5',
          course: 'Piano Fundamentals',
          score: 85,
          maxScore: 100,
          percentage: 85,
          date: new Date(Date.now() - 86400000 * 5),
          status: 'graded',
        },
        {
          id: '2',
          title: 'Music Theory Quiz - Scales',
          course: 'Music Theory Basics',
          score: 42,
          maxScore: 50,
          percentage: 84,
          date: new Date(Date.now() - 86400000 * 10),
          status: 'graded',
        },
        {
          id: '3',
          title: 'Composition Assignment',
          course: 'Music Composition',
          score: 78,
          maxScore: 100,
          percentage: 78,
          date: new Date(Date.now() - 86400000 * 15),
          status: 'graded',
        },
      ],
      overall: {
        averageScore: 82.3,
        totalAssessments: 12,
        completed: 12,
        pending: 0,
        improvement: '+5.2%',
      },
      progress: {
        level: 'Intermediate',
        practiceHours: 24,
        completedLessons: 12,
        currentStreak: 7,
        badges: 5,
      },
      courses: [
        {
          id: '1',
          title: 'Piano Fundamentals',
          progress: 65,
          averageScore: 85,
          lessonsCompleted: 8,
          totalLessons: 12,
        },
        {
          id: '2',
          title: 'Music Theory Basics',
          progress: 40,
          averageScore: 84,
          lessonsCompleted: 4,
          totalLessons: 10,
        },
      ],
    };
  };

  const handleGenerateReport = async (type: ReportType) => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (type === 'organizational') {
      const report = generateOrganizationalReport();
      toast.success(`${selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} organizational report generated!`);
      console.log('Organizational Report:', report);
    } else {
      if (!selectedStudent) {
        toast.error('Please select a student');
        setIsGenerating(false);
        return;
      }
      const report = generateStudentProgressReport(selectedStudent);
      toast.success(`Student progress report generated for ${report.student.name}!`);
      console.log('Student Progress Report:', report);
    }
    
    setIsGenerating(false);
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
    // In a real app, this would trigger actual PDF/CSV generation
    console.log(`Exporting as ${format}`);
  };

  const { startDate, endDate } = getDateRange();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <BackButton to="/dashboard" />
          <div className="flex items-center gap-4 mt-2 mb-2">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaFileAlt className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">Reports</h1>
              <p className="text-gray-600">
                {isAdmin ? 'Generate organizational reports for NPO compliance' : 'Generate student progress reports'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Admin Organizational Reports */}
      {isAdmin && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Organizational Reports</h2>
              <p className="text-sm text-gray-600 mt-1">Generate comprehensive reports for NPO compliance and organizational activities</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
              <FaChartLine className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Report Period Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as ReportPeriod)}
                className="input-field"
              >
                <option value="quarterly">Quarterly Report</option>
                <option value="semi-annual">Semi-Annual Report</option>
                <option value="annual">Annual Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="input-field"
              >
                {[2024, 2023, 2022].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            {selectedPeriod === 'quarterly' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quarter</label>
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(Number(e.target.value) as 1 | 2 | 3 | 4)}
                  className="input-field"
                >
                  <option value={1}>Q1 (Jan - Mar)</option>
                  <option value={2}>Q2 (Apr - Jun)</option>
                  <option value={3}>Q3 (Jul - Sep)</option>
                  <option value={4}>Q4 (Oct - Dec)</option>
                </select>
              </div>
            )}
            {selectedPeriod === 'semi-annual' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Half</label>
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(Number(e.target.value) as 1 | 2)}
                  className="input-field"
                >
                  <option value={1}>First Half (Jan - Jun)</option>
                  <option value={2}>Second Half (Jul - Dec)</option>
                </select>
              </div>
            )}
          </div>

          {/* Date Range Display */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 mb-6 border border-blue-100">
            <div className="flex items-center gap-3">
              <FaCalendarAlt className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-700">Report Period</p>
                <p className="text-sm text-gray-600">
                  {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          </div>

          {/* Report Preview */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Will Include:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: FaUsers, label: 'Student Enrollment & Demographics', desc: 'Internal & external student counts, growth trends' },
                { icon: FaClock, label: 'Attendance Statistics', desc: 'Average attendance rates, session data' },
                { icon: FaBook, label: 'Course Performance', desc: 'Active courses, completion rates, new courses' },
                { icon: FaGraduationCap, label: 'Teacher Activities', desc: 'Teaching hours, leave management' },
                { icon: FaTrophy, label: 'Assessment Results', desc: 'Average scores, pass rates, completion' },
                { icon: FaMusic, label: 'Practice Metrics', desc: 'Total practice hours, student engagement' },
                { icon: FaMusic, label: 'Inventory Usage', desc: 'Instrument borrowing and loan statistics' },
                { icon: FaUsers, label: 'Outreach Program Impact', desc: 'External student program statistics' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generate & Export Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenerateReport('organizational')}
              disabled={isGenerating}
              className="btn-primary flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FaFileAlt className="w-5 h-5" />
                  <span>Generate Report</span>
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('pdf')}
              className="btn-secondary flex items-center gap-2"
            >
              <FaFilePdf className="w-5 h-5 text-red-600" />
              <span>Export PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('csv')}
              className="btn-secondary flex items-center gap-2"
            >
              <FaFileCsv className="w-5 h-5 text-green-600" />
              <span>Export CSV</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Teacher Student Progress Reports */}
      {isTeacher && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card border-0"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Student Progress Reports</h2>
              <p className="text-sm text-gray-600 mt-1">Generate detailed progress reports based on student assessment marks</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <FaGraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Student Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="input-field"
            >
              <option value="">-- Select a student --</option>
              <option value="student-1">Thabo Ndlovu - Piano</option>
              <option value="student-2">Zanele Mthembu - Violin</option>
              <option value="student-3">Sipho Dlamini - Guitar</option>
              <option value="student-4">Nomsa Khumalo - Drums</option>
            </select>
          </div>

          {/* Report Preview */}
          {selectedStudent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 rounded-xl p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Will Include:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: FaTrophy, label: 'Assessment Scores', desc: 'All graded assessments with scores and percentages' },
                  { icon: FaChartLine, label: 'Overall Performance', desc: 'Average score, improvement trends' },
                  { icon: FaBook, label: 'Course Progress', desc: 'Progress in each enrolled course' },
                  { icon: FaClock, label: 'Practice Statistics', desc: 'Practice hours and consistency' },
                  { icon: FaCheckCircle, label: 'Completion Status', desc: 'Completed vs pending assessments' },
                  { icon: FaTrophy, label: 'Achievements', desc: 'Badges and milestones earned' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                        <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Generate & Export Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGenerateReport('student-progress')}
              disabled={isGenerating || !selectedStudent}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <FaFileAlt className="w-5 h-5" />
                  <span>Generate Report</span>
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('pdf')}
              disabled={!selectedStudent}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <FaFilePdf className="w-5 h-5 text-red-600" />
              <span>Export PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('csv')}
              disabled={!selectedStudent}
              className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            >
              <FaFileCsv className="w-5 h-5 text-green-600" />
              <span>Export CSV</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Quick Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { icon: FaUsers, label: 'Total Students', value: '455', gradient: 'from-blue-500 to-blue-600' },
          { icon: FaBook, label: 'Active Courses', value: '48', gradient: 'from-teal-500 to-teal-600' },
          { icon: FaGraduationCap, label: 'Teachers', value: '16', gradient: 'from-purple-500 to-purple-600' },
          { icon: FaTrophy, label: 'Avg. Score', value: '78.5%', gradient: 'from-green-500 to-green-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Reports;

