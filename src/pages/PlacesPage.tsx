// src/pages/PlacesPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { usePlaces } from '../hooks/usePlaces';
import { usePlaceStats } from '../hooks/usePlaceStats';
import { SearchPlacesDto } from '../types/places.types';

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

  const renderListTab = () => {
    if (loadingList) return <div style={{ padding: '20px', textAlign: 'center' }}>🔄 Cargando lugares...</div>;
    if (errorList) return <div style={{ padding: '20px', color: '#dc3545' }}>❌ Error: {errorList}</div>;

    return (
      <div style={{ padding: '20px' }}>
        {/* Barra de búsqueda y filtros */}
        <div style={{ marginBottom: '20px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar lugares por nombre, descripción o edificio..."
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
            <button
              type="submit"
              disabled={searchQuery.trim().length < 2}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: searchQuery.trim().length < 2 ? 'not-allowed' : 'pointer',
                opacity: searchQuery.trim().length < 2 ? 0.6 : 1
              }}
            >
              🔍 Buscar
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  fetchPlaces(filters);
                }}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ✖ Limpiar
              </button>
            )}
          </form>

          {/* Filtros */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={filters.isActive?.toString() || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? undefined : e.target.value === 'true';
                handleFilterChange('isActive', value);
              }}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="">Todos los estados</option>
              <option value="true">✅ Activos</option>
              <option value="false">❌ Inactivos</option>
            </select>

            <input
              type="text"
              placeholder="Filtrar por edificio..."
              value={filters.edificio || ''}
              onChange={(e) => handleFilterChange('edificio', e.target.value || undefined)}
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px',
                width: '200px'
              }}
            />

            <input
              type="number"
              placeholder="Filtrar por piso..."
              value={filters.piso || ''}
              onChange={(e) => handleFilterChange('piso', e.target.value ? parseInt(e.target.value) : undefined)}
              min="0"
              style={{
                padding: '8px 12px',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                fontSize: '14px',
                width: '150px'
              }}
            />
          </div>
        </div>

        {places.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h4>No hay lugares registrados</h4>
            <p style={{ color: '#6c757d' }}>Crea el primer lugar para comenzar</p>
            <button
              onClick={() => navigate('/places/new')}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              ➕ Crear Primer Lugar
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <span style={{ color: '#6c757d', marginRight: '20px' }}>
                Mostrando {places.length} de {pagination.total} lugares
              </span>
              <button
                onClick={() => navigate('/places/new')}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ➕ Crear Nuevo
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Lugar</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Tipo</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Ubicación</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Estado</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {places.map((place) => (
                    <tr key={place.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px' }}>
                        <div>
                          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                            {place.tipo?.icono} {place.nombre}
                          </div>
                          {place.descripcion && (
                            <div style={{ fontSize: '12px', color: '#6c757d' }}>
                              {place.descripcion.substring(0, 60)}
                              {place.descripcion.length > 60 && '...'}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#6c757d' }}>
                        {place.tipo?.nombre || '-'}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: '12px', color: '#6c757d' }}>
                        <div>{place.edificio || '-'} {place.piso !== undefined && place.piso !== null && `Piso ${place.piso}`}</div>
                        <div style={{ fontSize: '11px', marginTop: '2px' }}>
                          {place.latitud.toFixed(6)}, {place.longitud.toFixed(6)}
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: place.isActive ? '#d4edda' : '#f8d7da',
                          color: place.isActive ? '#155724' : '#721c24'
                        }}>
                          {place.isActive ? '✅ Activo' : '❌ Inactivo'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                          <button
                            onClick={() => navigate(`/places/${place.id}`)}
                            style={{
                              backgroundColor: '#17a2b8',
                              color: 'white',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                            title="Ver detalles"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => navigate(`/places/${place.id}/edit`)}
                            style={{
                              backgroundColor: '#ffc107',
                              color: '#212529',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleToggleStatus(place.id, place.isActive, place.nombre)}
                            style={{
                              backgroundColor: place.isActive ? '#dc3545' : '#28a745',
                              color: 'white',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                            title={place.isActive ? 'Desactivar' : 'Activar'}
                          >
                            {place.isActive ? '🚫' : '✅'}
                          </button>
                          <button
                            onClick={() => handleDelete(place.id, place.nombre)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {pagination.pages > 1 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>
                  Página {pagination.page} de {pagination.pages}
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    disabled={pagination.page <= 1}
                    onClick={() => handlePageChange(pagination.page - 1)}
                    style={{
                      backgroundColor: pagination.page <= 1 ? '#e9ecef' : '#007bff',
                      color: pagination.page <= 1 ? '#6c757d' : 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: pagination.page <= 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ← Anterior
                  </button>
                  <button
                    disabled={pagination.page >= pagination.pages}
                    onClick={() => handlePageChange(pagination.page + 1)}
                    style={{
                      backgroundColor: pagination.page >= pagination.pages ? '#e9ecef' : '#007bff',
                      color: pagination.page >= pagination.pages ? '#6c757d' : 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: pagination.page >= pagination.pages ? 'not-allowed' : 'pointer'
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

  const renderStatsTab = () => {
    if (loadingStats) return <div style={{ padding: '20px', textAlign: 'center' }}>🔄 Cargando estadísticas...</div>;
    if (errorStats) return <div style={{ padding: '20px', color: '#dc3545' }}>❌ Error: {errorStats}</div>;
    if (!stats) return <div style={{ padding: '20px', textAlign: 'center' }}>No hay estadísticas disponibles</div>;

    return (
      <div style={{ padding: '20px' }}>
        {/* Tarjetas de estadísticas generales */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#495057' }}>{stats.total}</div>
            <div style={{ color: '#6c757d' }}>Total de Lugares</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#d4edda', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #c3e6cb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#155724' }}>{stats.active}</div>
            <div style={{ color: '#155724' }}>Lugares Activos</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f8d7da', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #f5c6cb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#721c24' }}>{stats.inactive}</div>
            <div style={{ color: '#721c24' }}>Lugares Inactivos</div>
          </div>
        </div>

        {/* Estadísticas por tipo */}
        {stats.byType && stats.byType.length > 0 && (
          <div style={{
            padding: '20px',
            backgroundColor: '#d1ecf1',
            borderRadius: '8px',
            border: '1px solid #bee5eb',
            marginBottom: '20px'
          }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#0c5460' }}>📊 Lugares por Tipo</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {stats.byType.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '4px'
                }}>
                  <span style={{ fontWeight: '500' }}>{item.tipo}</span>
                  <span style={{ 
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estadísticas por edificio */}
        {stats.byBuilding && stats.byBuilding.length > 0 && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffeaa7'
          }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#856404' }}>🏢 Lugares por Edificio</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {stats.byBuilding.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '4px'
                }}>
                  <span style={{ fontWeight: '500' }}>{item.edificio}</span>
                  <span style={{ 
                    backgroundColor: '#ffc107',
                    color: '#212529',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <main style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <h1 style={{ margin: '0', color: '#333' }}>📍 Lugares</h1>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              backgroundColor: activeTab === 'list' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'list' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '4px 0 0 4px'
            }}
          >
            📋 Lista de Lugares
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            style={{
              backgroundColor: activeTab === 'stats' ? '#007bff' : '#f8f9fa',
              color: activeTab === 'stats' ? 'white' : '#495057',
              border: '1px solid #dee2e6',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '0 4px 4px 0'
            }}
          >
            📊 Estadísticas
          </button>
        </div>

        {/* Contenido */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          minHeight: '500px'
        }}>
          {activeTab === 'list' ? renderListTab() : renderStatsTab()}
        </div>
      </main>
    </div>
  );
};