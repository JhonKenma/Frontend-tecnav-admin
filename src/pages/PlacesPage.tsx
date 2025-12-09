// src/pages/PlacesPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import { usePlaces } from '../hooks/usePlaces';
import { usePlaceStats } from '../hooks/usePlaceStats';
import { SearchPlacesDto } from '../types/places.types';
import PlacesListTab from '../components/places/PlacesListTab';
import PlacesStatsTab from '../components/places/PlacesStatsTab';

export const PlacesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filters, setFilters] = useState<SearchPlacesDto>({
    page: 1,
    limit: 20
  });

  const {
    places,
    loading: loadingList,
    error: errorList,
    pagination,
    deletePlace,
    togglePlaceStatus,
    searchPlaces,
    fetchPlaces
  } = usePlaces(filters);

  const {
    stats,
    loading: loadingStats,
    error: errorStats
  } = usePlaceStats();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 2) {
      searchPlaces(searchQuery.trim());
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    fetchPlaces(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchPlaces(newFilters);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
      try {
        await deletePlace(id);
        alert('Lugar eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el lugar');
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean, name: string) => {
    try {
      await togglePlaceStatus(id, !currentStatus);
      alert(`"${name}" ${!currentStatus ? 'activado' : 'desactivado'} exitosamente`);
    } catch (error) {
      alert('Error al cambiar el estado del lugar');
    }
  };

  return (
    <AdminLayout>
      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ 
            margin: '0 0 8px 0', 
            color: '#1f2937',
            fontSize: '28px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '32px' }}>📍</span>
            Lugares
          </h1>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Administra los lugares del sistema de navegación
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'inline-flex',
          background: '#f9fafb',
          borderRadius: '10px',
          padding: '4px',
          border: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              backgroundColor: activeTab === 'list' ? '#ffffff' : 'transparent',
              color: activeTab === 'list' ? '#1f2937' : '#6b7280',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'list' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            📋 Lista de Lugares
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            style={{
              backgroundColor: activeTab === 'stats' ? '#ffffff' : 'transparent',
              color: activeTab === 'stats' ? '#1f2937' : '#6b7280',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: activeTab === 'stats' ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'
            }}
          >
            📊 Estadísticas
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        minHeight: '500px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
      }}>
        {activeTab === 'list' ? (
          <PlacesListTab
            places={places}
            loading={loadingList}
            error={errorList}
            pagination={pagination}
            filters={filters}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            onPageChange={handlePageChange}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onCreateNew={() => navigate('/places/new')}
            onViewDetails={(id: string) => navigate(`/places/${id}`)}
            onEdit={(id: string) => navigate(`/places/${id}/edit`)}
            onClearSearch={(): void => {
              setSearchQuery('');
              fetchPlaces(filters);
            }}
          />
        ) : (
          <PlacesStatsTab
            stats={stats}
            loading={loadingStats}
            error={errorStats}
          />
        )}
      </div>
    </AdminLayout>
  );
};