// src/services/place-types.service.ts
import { apiService } from './api.service';
import { 
  PlaceType, 
  CreatePlaceTypeDto, 
  UpdatePlaceTypeDto, 
  PlaceTypeStats,
  PlaceTypeApiResponse,
  PlaceTypeQueryParams 
} from '../types/place-types.types';

class PlaceTypesService {
  private baseUrl = '/place-types';

  /**
   * Obtener todos los tipos de lugares con filtros opcionales
   * GET /api/place-types
   */
  async getAllPlaceTypes(params?: PlaceTypeQueryParams): Promise<PlaceTypeApiResponse<PlaceType[]>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
          }
        });
      }

      const url = queryParams.toString() 
        ? `${this.baseUrl}?${queryParams.toString()}`
        : this.baseUrl;

      const response = await apiService.get<PlaceTypeApiResponse<PlaceType[]>>(url);
      return response;
    } catch (error) {
      console.error('Error fetching place types:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo tipo de lugar
   * POST /api/place-types
   */
  async createPlaceType(placeTypeData: CreatePlaceTypeDto): Promise<PlaceTypeApiResponse<PlaceType>> {
    try {
      const response = await apiService.post<PlaceTypeApiResponse<PlaceType>>(
        this.baseUrl, 
        placeTypeData
      );
      return response;
    } catch (error) {
      console.error('Error creating place type:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas de tipos de lugares
   * GET /api/place-types/stats
   */
  async getPlaceTypeStats(): Promise<PlaceTypeApiResponse<PlaceTypeStats>> {
    try {
      const response = await apiService.get<PlaceTypeApiResponse<PlaceTypeStats>>(
        `${this.baseUrl}/stats`
      );
      return response;
    } catch (error) {
      console.error('Error fetching place type stats:', error);
      throw error;
    }
  }

  /**
   * Obtener un tipo de lugar por ID
   * GET /api/place-types/:id
   */
  async getPlaceTypeById(id: string): Promise<PlaceTypeApiResponse<PlaceType>> {
    try {
      const response = await apiService.get<PlaceTypeApiResponse<PlaceType>>(
        `${this.baseUrl}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching place type with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Actualizar un tipo de lugar por ID
   * PATCH /api/place-types/:id
   */
  async updatePlaceType(id: string, updateData: UpdatePlaceTypeDto): Promise<PlaceTypeApiResponse<PlaceType>> {
    try {
      const response = await apiService.patch<PlaceTypeApiResponse<PlaceType>>(
        `${this.baseUrl}/${id}`,
        updateData
      );
      return response;
    } catch (error) {
      console.error(`Error updating place type with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar un tipo de lugar por ID
   * DELETE /api/place-types/:id
   */
  async deletePlaceType(id: string): Promise<PlaceTypeApiResponse<{ deleted: boolean }>> {
    try {
      const response = await apiService.delete<PlaceTypeApiResponse<{ deleted: boolean }>>(
        `${this.baseUrl}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error deleting place type with id ${id}:`, error);
      throw error;
    }
  }

}

export const placeTypesService = new PlaceTypesService();