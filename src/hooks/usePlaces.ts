// src/hooks/usePlaces.ts
import { useState, useEffect, useCallback } from 'react';
import { placesService } from '../services/places.service';
import { 
  Place, 
  CreatePlaceDto, 
  UpdatePlaceDto,
  SearchPlacesDto 
} from '../types/places.types';

export const usePlaces = (initialParams?: SearchPlacesDto) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 0
  });

  const fetchPlaces = useCallback(async (params?: SearchPlacesDto) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.getAllPlaces({
        ...initialParams,
        ...params
      });
      
      setPlaces(response.data);
      if (response.pagination) {
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading places');
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  // ✅ MODIFICADO: Ahora acepta File
  const createPlace = useCallback(async (data: CreatePlaceDto, imageFile?: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.createPlace(data, imageFile);
      await fetchPlaces();
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating place';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaces]);

  // ✅ MODIFICADO: Ahora acepta File
  const updatePlace = useCallback(async (id: string, data: UpdatePlaceDto, imageFile?: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.updatePlace(id, data, imageFile);
      await fetchPlaces();
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating place';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaces]);

  const deletePlace = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await placesService.deletePlace(id);
      await fetchPlaces();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting place';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaces]);

  const togglePlaceStatus = useCallback(async (id: string, isActive: boolean) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.togglePlaceStatus(id, isActive);
      await fetchPlaces();
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error toggling place status';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaces]);

  const searchPlaces = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.searchPlaces(query);
      setPlaces(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching places');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [fetchPlaces]);

  return {
    places,
    loading,
    error,
    pagination,
    fetchPlaces,
    createPlace,
    updatePlace,
    deletePlace,
    togglePlaceStatus,
    searchPlaces,
    refetch: () => fetchPlaces(),
    clearError: () => setError(null),
  };
};