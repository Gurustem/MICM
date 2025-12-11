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

export interface Student extends User {
  role: 'student';
  age: number;
  instrument: string;
  grade: string;
  parentId?: string;
  progress: StudentProgress;
}

export interface Teacher extends User {
  role: 'teacher';
  instruments: string[];
  bio?: string;
  qualifications?: string[];
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
export interface Instrument {
  id: string;
  name: string;
  type: string;
  brand?: string;
  model?: string;
  serialNumber?: string;
  condition: 'excellent' | 'good' | 'fair' | 'needs-repair';
  status: 'available' | 'borrowed' | 'maintenance';
  borrowedBy?: string;
  borrowedAt?: Date;
  dueDate?: Date;
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

