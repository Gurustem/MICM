// User and Authentication Types
export type UserRole = 'student' | 'teacher' | 'admin' | 'parent';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export type StudentType = 'internal' | 'external';

export interface Student extends User {
  role: 'student';
  age: number;
  instrument: string;
  grade: string;
  parentId?: string;
  progress: StudentProgress;
  studentType: StudentType; // internal or external
}

export interface Teacher extends User {
  role: 'teacher';
  instruments: string[];
  bio?: string;
  qualifications?: string[];
  leaveDays: LeaveBalance;
}

export interface LeaveBalance {
  annual: number; // 14 days
  sick: number;
  familyResponsibility: number;
  other: number;
}

export type LeaveType = 'annual' | 'sick' | 'familyResponsibility' | 'other';

export interface LeaveApplication {
  id: string;
  teacherId: string;
  teacherName: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  replacementTeacher?: string;
  studentActivities?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedBy?: string;
  reviewedAt?: Date;
  comments?: string;
}

export interface StudentProgress {
  level: number;
  totalPracticeHours: number;
  completedLessons: number;
  badges: Badge[];
  currentStreak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: Date;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: 'instrument' | 'theory' | 'ensemble';
  instrument?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  enrolledStudents: string[];
  lessons: Lesson[];
  studentType?: StudentType; // internal or external
  lessonType?: 'one-on-one' | 'group'; // for internal: one-on-one practical, group theory
  groupSize?: number; // for external: ~40, for internal theory: 20-30
  frequency?: string; // for external: once a week, for internal: during week (practical) / Saturdays (theory)
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  content: LessonContent[];
  assignments: Assignment[];
  resources: Resource[];
  duration: number; // in minutes
  completedBy: string[];
}

export interface LessonContent {
  type: 'video' | 'text' | 'audio' | 'image' | 'sheet-music';
  url: string;
  title: string;
  description?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'video' | 'link';
  url: string;
  size?: number;
}

// Assignment Types
export interface Assignment {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  description: string;
  type: 'quiz' | 'audio-upload' | 'video-upload' | 'text' | 'sheet-music';
  dueDate?: Date;
  maxScore: number;
  submissions: Submission[];
  rubric?: Rubric;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string; // URL or text
  submittedAt: Date;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
}

export interface Rubric {
  criteria: RubricCriteria[];
}

export interface RubricCriteria {
  name: string;
  maxPoints: number;
  description: string;
}

// Quiz Types
export interface Quiz {
  id: string;
  assignmentId: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  passingScore: number;
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

// Inventory Types
export type LoanType = 'borrowed' | 'loaned';

export interface Instrument {
  id: string;
  name: string;
  type: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs-repair';
  status: 'available' | 'borrowed' | 'loaned' | 'maintenance';
  loanType?: LoanType; // 'borrowed' for same-day, 'loaned' for long-term
  borrowedBy?: string;
  borrowedByStudentId?: string;
  borrowedAt?: Date;
  dueDate?: Date; // For borrowed: end of same day, for loaned: up to 1 year
  loanStartDate?: Date; // For loaned instruments
  loanEndDate?: Date; // For loaned instruments (1 year max)
  renewalDate?: Date; // When loan needs to be renewed
  parentGuardianName?: string; // Required for loans
  parentGuardianContact?: string; // Required for loans
  location: string;
  notes?: string;
}

// Communication Types
export interface Message {
  id: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  subject: string;
  content: string;
  read: boolean;
  sentAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  priority: 'low' | 'medium' | 'high';
  targetAudience: UserRole[];
  createdAt: Date;
  expiresAt?: Date;
}

export interface ForumPost {
  id: string;
  courseId?: string;
  authorId: string;
  authorName: string;
  title: string;
  content: string;
  replies: ForumReply[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Date;
}

// Analytics Types
export interface Analytics {
  totalStudents: number;
  totalTeachers: number;
  activeCourses: number;
  completionRate: number;
  averagePracticeHours: number;
  instrumentDistribution: { instrument: string; count: number }[];
  progressByLevel: { level: string; count: number }[];
}

// Schedule Types
export interface ScheduleEvent {
  id: string;
  title: string;
  description?: string;
  type: 'lesson' | 'ensemble' | 'theory' | 'event';
  startTime: Date;
  endTime: Date;
  location?: string;
  instructorId?: string;
  studentIds: string[];
  courseId?: string;
  zoomLink?: string;
}

// Practice Log Types
export interface PracticeLog {
  id: string;
  studentId: string;
  date: Date;
  duration: number; // in minutes
  instrument: string;
  notes?: string;
  goals?: string[];
}

