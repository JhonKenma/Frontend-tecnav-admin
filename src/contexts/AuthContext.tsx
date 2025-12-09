// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthContextType, User, LoginCredentials } from '../types/auth.types';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // ===== INIT =====
  useEffect(() => {
    const initializeAuth = () => {
      try {
        console.log('🔄 Initializing auth...');
        
        const storedToken = authService.getStoredToken();
        const storedUser = authService.getStoredUser();

        console.log('📦 Stored token exists:', !!storedToken);
        console.log('📦 Stored user exists:', !!storedUser);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          console.log('✅ Auth initialized with stored data');
        } else {
          console.log('ℹ️ No stored auth data found');
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ===== LOGIN =====
  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      console.log('🔐 AuthContext: Starting login process...');
      const response = await authService.login(credentials);

      setToken(response.access_token);
      setUser(response.user);

      console.log('✅ AuthContext: Login successful');
    } catch (error) {
      console.error('❌ AuthContext: Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // ===== LOGOUT (actualizado) =====
  const logout = () => {
    console.log('🚪 Logging out...');

    // limpiar estados
    setToken(null);
    setUser(null);

    // limpiar localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');

    // redirigir sin recargar la página
    navigate('/login', { replace: true });

    console.log('✅ Logout completed, redirected to /login');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
