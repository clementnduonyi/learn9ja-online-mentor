import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'teacher' | 'student' | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, role: UserRole, name: string, gender: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// This is a mock implementation. In a real app, you would connect to Supabase
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('learn9ja_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, role: UserRole, name: string, gender: string) => {
    setLoading(true);
    try {
      // This would be replaced with actual Supabase authentication
      console.log('Sign up with:', email, password, role, name, gender);
      
      // Mock successful registration
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        role,
        name,
        isPremium: false
      };
      
      localStorage.setItem('learn9ja_user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // This would be replaced with actual Supabase authentication
      console.log('Login with:', email, password);
      
      // Mock successful login
      // In real implementation, retrieve role and other user info from Supabase
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        role: email.includes('teacher') ? 'teacher' : 'student' as UserRole,
        name: email.split('@')[0],
        isPremium: false
      };
      
      localStorage.setItem('learn9ja_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    try {
      // This would be replaced with actual Supabase logout
      localStorage.removeItem('learn9ja_user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    logIn,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
