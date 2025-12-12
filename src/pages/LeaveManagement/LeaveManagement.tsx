import { useState } from 'react';
import { Calendar, Clock, Plus, CheckCircle, XCircle, UserCheck, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';
import { LeaveApplication, LeaveType, LeaveBalance } from '@/types';
import BackButton from '@/components/BackButton';
import toast from 'react-hot-toast';

const LeaveManagement = () => {
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveType>('annual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [replacementTeacher, setReplacementTeacher] = useState('');
  const [studentActivities, setStudentActivities] = useState('');

  // Mock leave balance - in real app, this would come from the backend
  const leaveBalance: LeaveBalance = {
    annual: 14,
    sick: 10,
    familyResponsibility: 5,
    other: 3,
  };

  // Mock leave applications
  const [leaveApplications, setLeaveApplications] = useState<LeaveApplication[]>([
    {
      id: '1',
      teacherId: user?.id || '',
      teacherName: user?.firstName + ' ' + user?.lastName || '',
      leaveType: 'annual',
      startDate: new Date(Date.now() + 86400000 * 7),
      endDate: new Date(Date.now() + 86400000 * 10),
      totalDays: 3,
      reason: 'Family vacation',
      replacementTeacher: 'Sarah Mkhize',
      studentActivities: 'Students will work on theory exercises and practice assigned pieces',
      status: 'pending',
      submittedAt: new Date(Date.now() - 86400000 * 2),
    },
    {
      id: '2',
      teacherId: user?.id || '',
      teacherName: user?.firstName + ' ' + user?.lastName || '',
      leaveType: 'sick',
      startDate: new Date(Date.now() - 86400000 * 5),
      endDate: new Date(Date.now() - 86400000 * 3),
      totalDays: 2,
      reason: 'Medical appointment',
      replacementTeacher: 'John Doe',
      studentActivities: 'Theory class will be covered by replacement teacher',
      status: 'approved',
      submittedAt: new Date(Date.now() - 86400000 * 7),
      reviewedBy: 'Admin',
      reviewedAt: new Date(Date.now() - 86400000 * 6),
    },
  ]);

  const getLeaveTypeLabel = (type: LeaveType) => {
    switch (type) {
      case 'annual': return 'Annual Leave';
      case 'sick': return 'Sick Leave';
      case 'familyResponsibility': return 'Family Responsibility';
      case 'other': return 'Other';
      default: return type;
    }
  };

  const getLeaveTypeColor = (type: LeaveType) => {
    switch (type) {
      case 'annual': return 'bg-blue-100 text-blue-700';
      case 'sick': return 'bg-red-100 text-red-700';
      case 'familyResponsibility': return 'bg-purple-100 text-purple-700';
      case 'other': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusBadge = (status: LeaveApplication['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="badge bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'approved':
        return (
          <span className="badge bg-green-100 text-green-700 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="badge bg-red-100 text-red-700 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
    }
  };

  const calculateTotalDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return differenceInDays(end, start) + 1; // +1 to include both start and end days
    }
    return 0;
  };

  const getAvailableDays = (type: LeaveType) => {
    return leaveBalance[type];
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalDays = calculateTotalDays();
    const availableDays = getAvailableDays(selectedLeaveType);

    if (totalDays <= 0) {
      toast.error('End date must be after start date');
      return;
    }

    if (totalDays > availableDays) {
      toast.error(`You only have ${availableDays} ${getLeaveTypeLabel(selectedLeaveType)} days available`);
      return;
    }

    const newApplication: LeaveApplication = {
      id: Date.now().toString(),
      teacherId: user?.id || '',
      teacherName: user?.firstName + ' ' + user?.lastName || '',
      leaveType: selectedLeaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalDays,
      reason,
      replacementTeacher: replacementTeacher || undefined,
      studentActivities: studentActivities || undefined,
      status: 'pending',
      submittedAt: new Date(),
    };

    setLeaveApplications([newApplication, ...leaveApplications]);
    toast.success('Leave application submitted successfully');
    
    // Reset form
    setShowApplicationForm(false);
    setStartDate('');
    setEndDate('');
    setReason('');
    setReplacementTeacher('');
    setStudentActivities('');
  };

  const totalDays = calculateTotalDays();
  const availableDays = getAvailableDays(selectedLeaveType);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <BackButton />
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Leave Management</h1>
          <p className="text-gray-600">Manage your leave applications and balance</p>
        </div>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(['annual', 'sick', 'familyResponsibility', 'other'] as LeaveType[]).map((type, index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{getLeaveTypeLabel(type)}</p>
                <p className="text-2xl font-bold text-gray-900">{leaveBalance[type]} days</p>
              </div>
              <div className={`w-12 h-12 ${getLeaveTypeColor(type)} rounded-lg flex items-center justify-center`}>
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Application Form or List */}
      {showApplicationForm ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Apply for Leave</h2>
            <button
              onClick={() => setShowApplicationForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div>
              <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">
                Leave Type
              </label>
              <select
                id="leaveType"
                value={selectedLeaveType}
                onChange={(e) => {
                  setSelectedLeaveType(e.target.value as LeaveType);
                  setStartDate('');
                  setEndDate('');
                }}
                className="input-field"
                required
              >
                <option value="annual">Annual Leave ({leaveBalance.annual} days available)</option>
                <option value="sick">Sick Leave ({leaveBalance.sick} days available)</option>
                <option value="familyResponsibility">Family Responsibility ({leaveBalance.familyResponsibility} days available)</option>
                <option value="other">Other ({leaveBalance.other} days available)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || format(new Date(), 'yyyy-MM-dd')}
                  className="input-field"
                  required
                />
              </div>
            </div>

            {startDate && endDate && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Total Days:</strong> {totalDays} day{totalDays !== 1 ? 's' : ''}
                  {totalDays > availableDays && (
                    <span className="text-red-600 ml-2">
                      (Exceeds available {availableDays} days)
                    </span>
                  )}
                </p>
              </div>
            )}

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Leave
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="input-field"
                placeholder="Please provide a reason for your leave request..."
                required
              />
            </div>

            <div>
              <label htmlFor="replacementTeacher" className="block text-sm font-medium text-gray-700 mb-1">
                Replacement Teacher (Optional)
              </label>
              <input
                type="text"
                id="replacementTeacher"
                value={replacementTeacher}
                onChange={(e) => setReplacementTeacher(e.target.value)}
                className="input-field"
                placeholder="Name of replacement teacher"
              />
            </div>

            <div>
              <label htmlFor="studentActivities" className="block text-sm font-medium text-gray-700 mb-1">
                Student Activities During Absence <span className="text-red-500">*</span>
              </label>
              <textarea
                id="studentActivities"
                value={studentActivities}
                onChange={(e) => setStudentActivities(e.target.value)}
                rows={4}
                className="input-field"
                placeholder="Describe what activities students will be doing in your absence (e.g., replacement teacher, theory exercises, practice sessions, etc.)"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Please specify either a replacement teacher or activities for students
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={totalDays > availableDays || totalDays <= 0}
                className="btn-primary flex-1"
              >
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">My Leave Applications</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowApplicationForm(true)}
              disabled={Object.values(leaveBalance).every(days => days === 0)}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Apply for Leave
            </motion.button>
          </div>

          {leaveApplications.length > 0 ? (
            <div className="space-y-4">
              {leaveApplications.map((application, index) => (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`badge ${getLeaveTypeColor(application.leaveType)}`}>
                          {getLeaveTypeLabel(application.leaveType)}
                        </span>
                        {getStatusBadge(application.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {format(application.startDate, 'MMM d, yyyy')} - {format(application.endDate, 'MMM d, yyyy')}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {application.totalDays} day{application.totalDays !== 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-gray-700 mb-3">{application.reason}</p>
                      
                      {application.replacementTeacher && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <UserCheck className="w-4 h-4" />
                          <span>Replacement: {application.replacementTeacher}</span>
                        </div>
                      )}
                      
                      {application.studentActivities && (
                        <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                          <BookOpen className="w-4 h-4 mt-0.5" />
                          <span><strong>Student Activities:</strong> {application.studentActivities}</span>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        Submitted: {format(application.submittedAt, 'MMM d, yyyy • h:mm a')}
                      </p>
                      {application.reviewedAt && (
                        <p className="text-xs text-gray-500">
                          Reviewed by {application.reviewedBy} on {format(application.reviewedAt, 'MMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No leave applications yet</p>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="btn-primary"
              >
                Apply for Leave
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeaveManagement;

