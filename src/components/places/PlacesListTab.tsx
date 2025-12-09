// src/components/places/PlacesListTab.tsx
import React from 'react';
// Update the import path if the file is actually in 'src/types/places.types.ts'
import { Place, SearchPlacesDto, PaginationMeta } from '../../types/places.types';
import PlacesFilters from '../../pages/PlacesFilters';
import PlacesTable from '../../pages/PlacesTable';

interface PlacesListTabProps {
  places: Place[];
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta;
  filters: SearchPlacesDto;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onFilterChange: (key: string, value: any) => void;
  onPageChange: (page: number) => void;
  onDelete: (id: string, name: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean, name: string) => void;
  onCreateNew: () => void;
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onClearSearch: () => void;
}

const PlacesListTab: React.FC<PlacesListTabProps> = ({
  places,
  loading,
  error,
  pagination,
  filters,
  searchQuery,
  onSearchQueryChange,
  onSearch,
  onFilterChange,
  onPageChange,
  onDelete,
  onToggleStatus,
  onCreateNew,
  onViewDetails,
  onEdit,
  onClearSearch
}) => {
  if (loading) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
        <p>Cargando lugares...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
        <p style={{ color: '#dc2626', fontSize: '16px' }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <PlacesFilters
        searchQuery={searchQuery}
        filters={filters}
        onSearchQueryChange={onSearchQueryChange}
        onSearch={onSearch}
        onFilterChange={onFilterChange}
        onClearSearch={onClearSearch}
      />

      {places.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: '#f9fafb',
          borderRadius: '12px',
          border: '2px dashed #e5e7eb',
          marginTop: '24px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📍</div>
          <h3 style={{ 
            margin: '0 0 8px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937'
          }}>
            No hay lugares registrados
          </h3>
          <p style={{ 
            color: '#6b7280',
            marginBottom: '24px',
            fontSize: '14px'
          }}>
            Crea el primer lugar para comenzar
          </p>
          <button
            onClick={onCreateNew}
            style={{
              background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 4px 12px rgba(0, 167, 225, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 167, 225, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 167, 225, 0.3)';
            }}
          >
            ➕ Crear Primer Lugar
          </button>
        </div>
      ) : (
        <div>
          <div style={{ 
            marginBottom: '24px', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ 
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Mostrando <strong style={{ color: '#1f2937' }}>{places.length}</strong> de <strong style={{ color: '#1f2937' }}>{pagination.total}</strong> lugares
            </span>
            <button
              onClick={onCreateNew}
              style={{
                background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(0, 167, 225, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 167, 225, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 167, 225, 0.3)';
              }}
            >
              ➕ Crear Nuevo
            </button>
          </div>

          <PlacesTable
            places={places}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />

          {/* Paginación */}
          {pagination.pages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>
                Página <strong style={{ color: '#1f2937' }}>{pagination.page}</strong> de <strong style={{ color: '#1f2937' }}>{pagination.pages}</strong>
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => onPageChange(pagination.page - 1)}
                  style={{
                    backgroundColor: pagination.page <= 1 ? '#e5e7eb' : '#00A7E1',
                    color: pagination.page <= 1 ? '#9ca3af' : '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (pagination.page > 1) {
                      e.currentTarget.style.backgroundColor = '#0088BA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pagination.page > 1) {
                      e.currentTarget.style.backgroundColor = '#00A7E1';
                    }
                  }}
                >
                  ← Anterior
                </button>
                <button
                  disabled={pagination.page >= pagination.pages}
                  onClick={() => onPageChange(pagination.page + 1)}
                  style={{
                    backgroundColor: pagination.page >= pagination.pages ? '#e5e7eb' : '#00A7E1',
                    color: pagination.page >= pagination.pages ? '#9ca3af' : '#ffffff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    cursor: pagination.page >= pagination.pages ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (pagination.page < pagination.pages) {
                      e.currentTarget.style.backgroundColor = '#0088BA';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pagination.page < pagination.pages) {
                      e.currentTarget.style.backgroundColor = '#00A7E1';
                    }
                  }}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlacesListTab;