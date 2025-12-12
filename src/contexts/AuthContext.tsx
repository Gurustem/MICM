import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('micm_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Convert date strings back to Date objects
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        if (parsedUser.lastLogin) {
          parsedUser.lastLogin = new Date(parsedUser.lastLogin);
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('micm_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    // Temporary: Accept any email/password combination for development
    // Will be replaced with Firebase authentication later
    // Password parameter kept for interface compatibility but not validated
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    // Determine role based on email pattern (for testing different dashboards)
    let role: 'student' | 'teacher' | 'admin' = 'student';
    const emailLower = email.toLowerCase();
    
    if (emailLower.includes('admin') || emailLower.includes('administrator')) {
      role = 'admin';
    } else if (emailLower.includes('teacher') || emailLower.includes('instructor') || emailLower.includes('staff')) {
      role = 'teacher';
    } else if (emailLower.includes('student') || emailLower.includes('learner')) {
      role = 'student';
    }

    // Extract name from email (for display)
    const emailParts = email.split('@')[0].split(/[._-]/);
    const firstName = emailParts[0] ? emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1) : 'User';
    const lastName = emailParts[1] ? emailParts[1].charAt(0).toUpperCase() + emailParts[1].slice(1) : '';

    // Create user object
    const newUser: User = {
      id: Date.now().toString(),
      email: email,
      firstName: firstName,
      lastName: lastName || 'User',
      role: role,
      avatar: undefined,
      createdAt: new Date(),
      lastLogin: new Date(),
    };

    setUser(newUser);
    localStorage.setItem('micm_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('micm_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('micm_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

