// src/services/auth.service.ts
import { apiService } from './api.service';
import { LoginCredentials, AuthResponse, User, BackendLoginResponse } from '../types/auth.types';
import { API_CONFIG } from '../config/api.config';

export class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    console.log('🔑 AuthService: Attempting login...');
    
    const backendResponse = await apiService.post<BackendLoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    console.log('🔑 AuthService: Backend response:', backendResponse);
    
    // Extraer los datos del objeto 'data' que devuelve tu backend
    const { access_token, user } = backendResponse.data;
    
    if (!access_token || !user) {
      throw new Error('Respuesta del servidor incompleta');
    }
    
    console.log('🔑 AuthService: Extracted token:', access_token.substring(0, 20) + '...');
    console.log('🔑 AuthService: Extracted user:', user);
    
    // Guardar token en localStorage
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    
    console.log('✅ AuthService: Login data saved to localStorage');
    
    // Devolver en el formato que espera el AuthContext
    const authResponse: AuthResponse = {
      access_token,
      user
    };
    
    return authResponse;
  }

  async logout(): Promise<void> {
    try {
      await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {});
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  async getProfile(): Promise<User> {
    return apiService.get<User>(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
  }

  getStoredToken(): string | null {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token || token === 'undefined' || token === 'null') {
        return null;
      }
      return token;
    } catch (error) {
      console.error('Error getting stored token:', error);
      localStorage.removeItem('auth_token');
      return null;
    }
  }

  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr || userStr === 'undefined' || userStr === 'null') {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing stored user:', error);
      // Limpiar localStorage corrupto
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getStoredToken() !== null;
  }

  clearCorruptedData(): void {
    console.log('🧹 Clearing corrupted localStorage data...');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
}

export const authService = new AuthService();
