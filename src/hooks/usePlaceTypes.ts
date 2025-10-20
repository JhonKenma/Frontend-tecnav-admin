// src/hooks/usePlaceTypes.ts - Actualizado sin isActive
import { useState, useEffect, useCallback } from 'react';
import { placeTypesService } from '../services/place-types.service';
import { 
  PlaceType, 
  CreatePlaceTypeDto, 
  UpdatePlaceTypeDto,
  PlaceTypeQueryParams 
} from '../types/place-types.types';

export const usePlaceTypes = (initialParams?: PlaceTypeQueryParams) => {
  const [placeTypes, setPlaceTypes] = useState<PlaceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialParams?.page || 1);

  const fetchPlaceTypes = useCallback(async (params?: PlaceTypeQueryParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placeTypesService.getAllPlaceTypes({
        ...initialParams,
        ...params,
        page: params?.page || currentPage
      });
      
      setPlaceTypes(response.data);
      setTotal(response.total || 0);
      setCurrentPage(response.page || 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading place types');
    } finally {
      setLoading(false);
    }
  }, [initialParams, currentPage]);

  const createPlaceType = useCallback(async (data: CreatePlaceTypeDto) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placeTypesService.createPlaceType(data);
      await fetchPlaceTypes();
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating place type';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaceTypes]);

  const updatePlaceType = useCallback(async (id: string, data: UpdatePlaceTypeDto) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placeTypesService.updatePlaceType(id, data);
      await fetchPlaceTypes();
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating place type';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaceTypes]);

  const deletePlaceType = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await placeTypesService.deletePlaceType(id);
      await fetchPlaceTypes();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting place type';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [fetchPlaceTypes]);

  useEffect(() => {
    fetchPlaceTypes();
  }, [fetchPlaceTypes]);

  return {
    placeTypes,
    loading,
    error,
    total,
    currentPage,
    fetchPlaceTypes,
    createPlaceType,
    updatePlaceType,
    deletePlaceType,
    refetch: () => fetchPlaceTypes(),
    clearError: () => setError(null),
  };
};
