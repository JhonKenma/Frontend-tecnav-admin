// src/hooks/usePlaceStats.ts
import { useState, useEffect, useCallback } from 'react';
import { placesService } from '../services/places.service';
import { PlaceStats } from '../types/places.types';

export const usePlaceStats = () => {
  const [stats, setStats] = useState<PlaceStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await placesService.getPlaceStats();
      setStats(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading place stats');
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