// src/services/users.service.ts
import { apiService } from './api.service';
import { API_CONFIG } from '../config/api.config';

export interface GoogleUser {
  id: string;
  email: string;
  nombreCompleto: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  googleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoogleUsersResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    users: GoogleUser[];
  };
}

export interface GoogleUsersStats {
  total: number;
  active: number;
  inactive: number;
}

export interface GoogleUsersStatsResponse {
  success: boolean;
  message: string;
  data: GoogleUsersStats;
}

export class UsersService {
  /**
   * Obtener todos los usuarios registrados con Google
   */
  async getGoogleUsers(): Promise<GoogleUsersResponse> {
    console.log('👥 UsersService: Fetching Google users...');
    
    const response = await apiService.get<GoogleUsersResponse>(
      API_CONFIG.ENDPOINTS.USERS.GOOGLE_USERS
    );
    
    console.log('👥 UsersService: Google users received:', response);
    return response;
  }

  /**
   * Obtener estadísticas de usuarios de Google
   */
  async getGoogleUsersStats(): Promise<GoogleUsersStatsResponse> {
    console.log('📊 UsersService: Fetching Google users stats...');
    
    const response = await apiService.get<GoogleUsersStatsResponse>(
      API_CONFIG.ENDPOINTS.USERS.GOOGLE_USERS_STATS
    );
    
    console.log('📊 UsersService: Stats received:', response);
    return response;
  }

  /**
   * Obtener todos los usuarios del sistema
   */
  async getAllUsers(): Promise<GoogleUsersResponse> {
    console.log('👥 UsersService: Fetching all users...');
    
    const response = await apiService.get<GoogleUsersResponse>(
      API_CONFIG.ENDPOINTS.USERS.ALL_USERS
    );
    
    console.log('👥 UsersService: All users received:', response);
    return response;
  }
}

export const usersService = new UsersService();