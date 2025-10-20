// src/services/api.service.ts
// Asegúrate de importar o definir API_CONFIG antes de usarlo
import { API_CONFIG } from '../config/api.config'; // Ajusta la ruta según corresponda

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
    
    const config: RequestInit = {
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
      body: config.body
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
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // ✅ MÉTODO PATCH AGREGADO - Esto es lo que faltaba
  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();