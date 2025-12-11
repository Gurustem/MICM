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

// Mock user data for UI testing (will be replaced with Firebase)
const mockUsers: Record<string, User> = {
  'teacher@micm.co.za': {
    id: '1',
    email: 'teacher@micm.co.za',
    firstName: 'Sarah',
    lastName: 'Mkhize',
    role: 'teacher',
    avatar: undefined,
    createdAt: new Date(),
  },
  'student@micm.co.za': {
    id: '2',
    email: 'student@micm.co.za',
    firstName: 'Thabo',
    lastName: 'Ndlovu',
    role: 'student',
    avatar: undefined,
    createdAt: new Date(),
  },
  'admin@micm.co.za': {
    id: '3',
    email: 'admin@micm.co.za',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatar: undefined,
    createdAt: new Date(),
  },
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

  const login = async (email: string, password: string) => {
    // Mock authentication - replace with Firebase later
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call

    const foundUser = mockUsers[email];
    if (foundUser && password === 'password') {
      const userWithLogin = { ...foundUser, lastLogin: new Date() };
      setUser(userWithLogin);
      localStorage.setItem('micm_user', JSON.stringify(userWithLogin));
    } else {
      throw new Error('Invalid email or password');
    }
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

