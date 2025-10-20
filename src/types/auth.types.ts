// src/types/auth.types.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Estructura que devuelve tu backend
export interface BackendLoginResponse {
  data: {
    user: User;
    access_token: string;
  };
  message: string;
  success: boolean;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}