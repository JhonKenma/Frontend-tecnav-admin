// src/config/api.config.ts
export const API_CONFIG = {
  BASE_URL: 'https://api.josephhuayra.online/api', // Backend en puerto 3000
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
  },
};

// Configuración adicional para desarrollo
export const DEV_CONFIG = {
  LOG_API_CALLS: true,
  FRONTEND_PORT: 3001, // Frontend en puerto 3001
  BACKEND_PORT: 3000,  // Backend en puerto 3000
  TEST_CREDENTIALS: {
    email: 'admin@tecsup.edu.pe',
    password: 'Admin123456'
  }
};