// src/hooks/usePlaceTypeStats.ts
import { useState, useEffect, useCallback } from 'react';
import { placeTypesService } from '../services/place-types.service';
import { PlaceTypeStats } from '../types/place-types.types';

export const usePlaceTypeStats = () => {
  const [stats, setStats] = useState<PlaceTypeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placeTypesService.getPlaceTypeStats();
      setStats(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading place type stats');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
    clearError: () => setError(null),
  };
};