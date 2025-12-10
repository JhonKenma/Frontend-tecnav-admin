// src/config/api.config.ts

// Detectar el entorno
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

// Determinar la URL base de la API
const getApiBaseUrl = (): string => {
  // Si existe la variable de entorno, úsala (prioridad máxima)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Si estamos en desarrollo, usar localhost
  if (isDevelopment) {
    return `http://localhost:${DEV_CONFIG.BACKEND_PORT}/api`;
  }

  // En producción, usar el dominio de producción
  return 'https://backend-tecsupnav-fxg2.onrender.com';
};

// Configuración de desarrollo
export const DEV_CONFIG = {
  LOG_API_CALLS: true,
  FRONTEND_PORT: 3001, // Frontend en puerto 3001
  BACKEND_PORT: 3000,  // Backend en puerto 3000
  TEST_CREDENTIALS: {
    email: 'admin@tecsup.edu.pe',
    password: 'Admin123456'
  }
};

// Configuración principal de la API
export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile',
    },
    PLACE_TYPES: {
      BASE: '/place-types',
      BY_ID: (id: string) => `/place-types/${id}`,
    },
    PLACES: {
      BASE: '/places',
      BY_ID: (id: string) => `/places/${id}`,
      BY_TYPE: (typeId: string) => `/places/type/${typeId}`,
    },
  },
  TIMEOUT: 30000, // 30 segundos
};

// Configuración de logging
export const LOG_CONFIG = {
  ENABLED: isDevelopment || DEV_CONFIG.LOG_API_CALLS,
  LOG_REQUESTS: isDevelopment,
  LOG_RESPONSES: isDevelopment,
  LOG_ERRORS: true,
};

// Información del entorno (útil para debugging)
export const ENV_INFO = {
  isProduction,
  isDevelopment,
  apiBaseUrl: API_CONFIG.BASE_URL,
  frontendPort: DEV_CONFIG.FRONTEND_PORT,
  backendPort: DEV_CONFIG.BACKEND_PORT,
};

// Helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  // Si el endpoint ya tiene el prefijo /api, no lo agregues
  const cleanEndpoint = endpoint.startsWith('/api') 
    ? endpoint.substring(4) 
    : endpoint;
  
  return `${API_CONFIG.BASE_URL}${cleanEndpoint}`;
};

// Log de configuración al inicio (solo en desarrollo)
if (isDevelopment) {
  console.log('🔧 API Configuration:', {
    baseUrl: API_CONFIG.BASE_URL,
    environment: isProduction ? 'production' : 'development',
    loggingEnabled: LOG_CONFIG.ENABLED,
  });
}

// Exportar configuración por defecto
export default API_CONFIG;