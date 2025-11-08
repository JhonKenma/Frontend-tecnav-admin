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
   * Crear un nuevo lugar CON imagen
   * POST /api/places
   */
  async createPlace(placeData: CreatePlaceDto, imageFile?: File): Promise<PlaceApiResponse<Place>> {
    try {
      const formData = new FormData();
      
      // Agregar todos los campos del DTO
      formData.append('nombre', placeData.nombre);
      formData.append('latitud', placeData.latitud.toString());
      formData.append('longitud', placeData.longitud.toString());
      formData.append('tipoId', placeData.tipoId);
      
      if (placeData.descripcion) formData.append('descripcion', placeData.descripcion);
      if (placeData.edificio) formData.append('edificio', placeData.edificio);
      if (placeData.piso !== undefined) formData.append('piso', placeData.piso.toString());
      if (placeData.codigoQR) formData.append('codigoQR', placeData.codigoQR);
      if (placeData.isActive !== undefined) formData.append('isActive', placeData.isActive.toString());
      
      // Agregar imagen si existe
      if (imageFile) {
        formData.append('imagen', imageFile);
      }

      // ✅ SIN el tercer parámetro de headers (axios lo detecta automáticamente)
      const response = await apiService.post<PlaceApiResponse<Place>>(
        this.baseUrl, 
        formData
      );
      return response;
    } catch (error) {
      console.error('Error creating place:', error);
      throw error;
    }
  }

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
   * Actualizar un lugar CON imagen
   * PATCH /api/places/:id
   */
  async updatePlace(id: string, updateData: UpdatePlaceDto, imageFile?: File): Promise<PlaceApiResponse<Place>> {
    try {
      const formData = new FormData();
      
      // Solo agregar campos que no sean undefined
      if (updateData.nombre !== undefined) formData.append('nombre', updateData.nombre);
      if (updateData.latitud !== undefined) formData.append('latitud', updateData.latitud.toString());
      if (updateData.longitud !== undefined) formData.append('longitud', updateData.longitud.toString());
      if (updateData.tipoId !== undefined) formData.append('tipoId', updateData.tipoId);
      if (updateData.descripcion !== undefined) formData.append('descripcion', updateData.descripcion);
      if (updateData.edificio !== undefined) formData.append('edificio', updateData.edificio);
      if (updateData.piso !== undefined) formData.append('piso', updateData.piso.toString());
      if (updateData.codigoQR !== undefined) formData.append('codigoQR', updateData.codigoQR);
      if (updateData.isActive !== undefined) formData.append('isActive', updateData.isActive.toString());
      
      // Agregar imagen si existe
      if (imageFile) {
        formData.append('imagen', imageFile);
      }

      // ✅ SIN el tercer parámetro de headers
      const response = await apiService.patch<PlaceApiResponse<Place>>(
        `${this.baseUrl}/${id}`,
        formData
      );
      return response;
    } catch (error) {
      console.error(`Error updating place with id ${id}:`, error);
      throw error;
    }
  }

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