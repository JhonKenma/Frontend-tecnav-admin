// src/hooks/usePlace.ts
import { useState, useEffect, useCallback } from 'react';
import { placesService } from '../services/places.service';
import { Place, UpdatePlaceDto } from '../types/places.types';

export const usePlace = (id?: string) => {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlace = useCallback(async (placeId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.getPlaceById(placeId);
      setPlace(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading place');
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ MODIFICADO: Ahora acepta File
  const updatePlace = useCallback(async (updateData: UpdatePlaceDto, imageFile?: File) => {
    if (!id) throw new Error('No place ID provided');
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.updatePlace(id, updateData, imageFile);
      setPlace(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating place';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchPlace(id);
    }
  }, [id, fetchPlace]);

  return {
    place,
    loading,
    error,
    updatePlace,
    refetch: () => id ? fetchPlace(id) : Promise.resolve(),
    clearError: () => setError(null),
  };
};