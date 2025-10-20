// src/hooks/usePlaceType.ts
import { useState, useEffect, useCallback } from 'react';
import { placeTypesService } from '../services/place-types.service';
import { PlaceType, UpdatePlaceTypeDto } from '../types/place-types.types';

export const usePlaceType = (id?: string) => {
  const [placeType, setPlaceType] = useState<PlaceType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaceType = useCallback(async (placeTypeId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placeTypesService.getPlaceTypeById(placeTypeId);
      setPlaceType(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading place type');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePlaceType = useCallback(async (updateData: UpdatePlaceTypeDto) => {
    if (!id) throw new Error('No place type ID provided');
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await placeTypesService.updatePlaceType(id, updateData);
      setPlaceType(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating place type';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPlaceType(id);
    }
  }, [id, fetchPlaceType]);

  return {
    placeType,
    loading,
    error,
    updatePlaceType,
    refetch: () => id ? fetchPlaceType(id) : Promise.resolve(),
    clearError: () => setError(null),
  };
};