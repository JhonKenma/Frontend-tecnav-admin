// src/services/api.service.ts
import { API_CONFIG } from '../config/api.config';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const token = localStorage.getItem('auth_token');
    
    // ✅ DETECTAR si el body es FormData
    const isFormData = options.body instanceof FormData;
    
    const config: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      headers: {
        // ✅ SOLO agregar Content-Type si NO es FormData
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        'Accept': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    console.log('🔍 API Request:', {
      method: config.method || 'GET',
      url,
      headers: config.headers,
      body: isFormData ? 'FormData' : config.body
    });

    try {
      const response = await fetch(url, config);

      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries())
      });

      // Leer el contenido de la respuesta una sola vez
      const responseText = await response.text();
      
      if (!response.ok) {
        console.error('❌ API Error Details:', responseText);
        
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        // Intentar parsear el error como JSON
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = responseText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      // Parsear la respuesta exitosa
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }

      console.log('✅ API Success:', data);
      return data;
      
    } catch (error) {
      console.error('🚨 Network Error:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Error de conexión: Verifica que el backend esté ejecutándose en http://localhost:3000');
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      // ✅ NO hacer JSON.stringify si es FormData
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      // ✅ NO hacer JSON.stringify si es FormData
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();