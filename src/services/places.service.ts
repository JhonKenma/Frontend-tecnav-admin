// src/services/places.service.ts
import { apiService } from './api.service';
import { 
  Place, 
  CreatePlaceDto, 
  UpdatePlaceDto, 
  SearchPlacesDto,
  PlaceStats,
  PlaceApiResponse
} from '../types/places.types';

class PlacesService {
  private baseUrl = '/places';

  /**
   * Obtener todos los lugares con filtros opcionales
   * GET /api/places
   */
  async getAllPlaces(params?: SearchPlacesDto): Promise<PlaceApiResponse<Place[]>> {
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

      const response = await apiService.get<PlaceApiResponse<Place[]>>(url);
      return response;
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    }
  }

  /**
   * Crear un nuevo lugar
   * POST /api/places
   */
  async createPlace(placeData: CreatePlaceDto): Promise<PlaceApiResponse<Place>> {
    try {
      const response = await apiService.post<PlaceApiResponse<Place>>(
        this.baseUrl, 
        placeData
      );
      return response;
    } catch (error) {
      console.error('Error creating place:', error);
      throw error;
    }
  }

  /**
   * Buscar lugares por texto
   * GET /api/places/search
   */
  async searchPlaces(query: string): Promise<PlaceApiResponse<Place[]>> {
    try {
      const response = await apiService.get<PlaceApiResponse<Place[]>>(
        `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
      );
      return response;
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas de lugares
   * GET /api/places/stats
   */
  async getPlaceStats(): Promise<PlaceApiResponse<PlaceStats>> {
    try {
      const response = await apiService.get<PlaceApiResponse<PlaceStats>>(
        `${this.baseUrl}/stats`
      );
      return response;
    } catch (error) {
      console.error('Error fetching place stats:', error);
      throw error;
    }
  }

  /**
   * Obtener un lugar por ID
   * GET /api/places/:id
   */
  async getPlaceById(id: string): Promise<PlaceApiResponse<Place>> {
    try {
      const response = await apiService.get<PlaceApiResponse<Place>>(
        `${this.baseUrl}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error fetching place with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Actualizar un lugar por ID
   * PATCH /api/places/:id
   */
  async updatePlace(id: string, updateData: UpdatePlaceDto): Promise<PlaceApiResponse<Place>> {
    try {
      const response = await apiService.patch<PlaceApiResponse<Place>>(
        `${this.baseUrl}/${id}`,
        updateData
      );
      return response;
    } catch (error) {
      console.error(`Error updating place with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar un lugar por ID
   * DELETE /api/places/:id
   */
  async deletePlace(id: string): Promise<PlaceApiResponse<{ deleted: boolean }>> {
    try {
      const response = await apiService.delete<PlaceApiResponse<{ deleted: boolean }>>(
        `${this.baseUrl}/${id}`
      );
      return response;
    } catch (error) {
      console.error(`Error deleting place with id ${id}:`, error);
      throw error;
    }
  }

  /**
   * Activar/Desactivar un lugar
   * PATCH /api/places/:id
   */
  async togglePlaceStatus(id: string, isActive: boolean): Promise<PlaceApiResponse<Place>> {
    try {
      return await this.updatePlace(id, { isActive });
    } catch (error) {
      console.error(`Error toggling place status for id ${id}:`, error);
      throw error;
    }
  }
}

export const placesService = new PlacesService();