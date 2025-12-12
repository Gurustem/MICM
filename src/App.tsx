import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Courses from './pages/Courses/Courses';
import CourseDetail from './pages/Courses/CourseDetail';
import Inventory from './pages/Inventory/Inventory';
import Assessments from './pages/Assessments/Assessments';
import Communication from './pages/Communication/Communication';
import Analytics from './pages/Analytics/Analytics';
import Profile from './pages/Profile/Profile';
import PracticeTracker from './pages/PracticeTracker/PracticeTracker';
import SheetMusic from './pages/SheetMusic/SheetMusic';
import Users from './pages/Users/Users';
import Settings from './pages/Settings/Settings';

// Protected Layout Component
const ProtectedLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />;
};

// Role-based Route Component
const RoleProtectedRoute: React.FC<{ 
  element: React.ReactElement; 
  allowedRoles: string[] 
}> = ({ element, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="assessments" element={<Assessments />} />
        <Route path="communication" element={<Communication />} />
        <Route path="practice" element={<PracticeTracker />} />
        <Route path="sheet-music" element={<SheetMusic />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="analytics"
          element={
            <RoleProtectedRoute 
              element={<Analytics />} 
              allowedRoles={['teacher', 'admin']} 
            />
          }
        />
        <Route
          path="users"
          element={
            <RoleProtectedRoute 
              element={<Users />} 
              allowedRoles={['admin']} 
            />
          }
        />
        <Route
          path="settings"
          element={
            <RoleProtectedRoute 
              element={<Settings />} 
              allowedRoles={['admin']} 
            />
          }
        />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#1f2937',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#00a68c',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;

