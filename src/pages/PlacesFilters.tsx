// src/components/places/PlacesFilters.tsx
import React from 'react';
import { SearchPlacesDto } from '../types/places.types';

interface PlacesFiltersProps {
  searchQuery: string;
  filters: SearchPlacesDto;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onFilterChange: (key: string, value: any) => void;
  onClearSearch: () => void;
}

const PlacesFilters: React.FC<PlacesFiltersProps> = ({
  searchQuery,
  filters,
  onSearchQueryChange,
  onSearch,
  onFilterChange,
  onClearSearch
}) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Barra de búsqueda */}
      <form onSubmit={onSearch} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Buscar por nombre, descripción o edificio..."
          style={{
            flex: 1,
            padding: '12px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#00A7E1'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />
        <button
          type="submit"
          disabled={searchQuery.trim().length < 2}
          style={{
            backgroundColor: searchQuery.trim().length < 2 ? '#e5e7eb' : '#00A7E1',
            color: searchQuery.trim().length < 2 ? '#9ca3af' : '#ffffff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: searchQuery.trim().length < 2 ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (searchQuery.trim().length >= 2) {
              e.currentTarget.style.backgroundColor = '#0088BA';
            }
          }}
          onMouseLeave={(e) => {
            if (searchQuery.trim().length >= 2) {
              e.currentTarget.style.backgroundColor = '#00A7E1';
            }
          }}
        >
          🔍 Buscar
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={onClearSearch}
            style={{
              backgroundColor: '#6b7280',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6b7280';
            }}
          >
            ✖ Limpiar
          </button>
        )}
      </form>

      {/* Filtros */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        flexWrap: 'wrap', 
        padding: '16px',
        background: '#f9fafb',
        borderRadius: '10px',
        border: '1px solid #e5e7eb'
      }}>
        <select
          value={filters.isActive?.toString() || ''}
          onChange={(e) => {
            const value = e.target.value === '' ? undefined : e.target.value === 'true';
            onFilterChange('isActive', value);
          }}
          style={{
            padding: '10px 14px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            backgroundColor: '#ffffff',
            cursor: 'pointer',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#00A7E1'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        >
          <option value="">Todos los estados</option>
          <option value="true">✅ Activos</option>
          <option value="false">❌ Inactivos</option>
        </select>

        <input
          type="text"
          placeholder="Filtrar por edificio..."
          value={filters.edificio || ''}
          onChange={(e) => onFilterChange('edificio', e.target.value || undefined)}
          style={{
            padding: '10px 14px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            width: '200px',
            backgroundColor: '#ffffff',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#00A7E1'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />

        <input
          type="number"
          placeholder="Filtrar por piso..."
          value={filters.piso || ''}
          onChange={(e) => onFilterChange('piso', e.target.value ? parseInt(e.target.value) : undefined)}
          min="0"
          style={{
            padding: '10px 14px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            width: '150px',
            backgroundColor: '#ffffff',
            outline: 'none',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#00A7E1'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />
      </div>
    </div>
  );
};

export default PlacesFilters;