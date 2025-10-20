// src/pages/PlaceTypesPage.tsx - Actualizar referencias a icono
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { usePlaceTypes } from '../hooks/usePlaceTypes';
import { usePlaceTypeStats } from '../hooks/usePlaceTypeStats';

export const PlaceTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');
  
  const {
    placeTypes,
    loading: loadingList,
    error: errorList,
    deletePlaceType
  } = usePlaceTypes();

  const {
    stats,
    loading: loadingStats,
    error: errorStats
  } = usePlaceTypeStats();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
      try {
        await deletePlaceType(id);
        alert('Tipo de lugar eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el tipo de lugar');
      }
    }
  };

  const renderListTab = () => {
    if (loadingList) return <div style={{ padding: '20px', textAlign: 'center' }}>🔄 Cargando tipos de lugares...</div>;
    if (errorList) return <div style={{ padding: '20px', color: '#dc3545' }}>❌ Error: {errorList}</div>;

    return (
      <div style={{ padding: '20px' }}>
        {placeTypes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h4>No hay tipos de lugares registrados</h4>
            <p style={{ color: '#6c757d' }}>Crea el primer tipo de lugar para comenzar</p>
            <button
              onClick={() => navigate('/place-types/new')}
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
              ➕ Crear Primer Tipo
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <span style={{ color: '#6c757d', marginRight: '20px' }}>
                Total: {placeTypes.length} tipos de lugares
              </span>
              <button
                onClick={() => navigate('/place-types/new')}
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
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Tipo</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Descripción</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Creado</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #dee2e6' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {placeTypes.map((placeType) => (
                    <tr key={placeType.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '20px' }}>{placeType.icono || '🏢'}</span>
                          <span style={{ fontWeight: '500' }}>{placeType.nombre}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px', color: '#6c757d' }}>
                        {placeType.descripcion || '-'}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: '#6c757d' }}>
                        {new Date(placeType.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                          <button
                            onClick={() => navigate(`/place-types/${placeType.id}/edit`)}
                            style={{
                              backgroundColor: '#ffc107',
                              color: '#212529',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleDelete(placeType.id, placeType.nombre)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '4px 8px',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#495057' }}>{stats.totalPlaceTypes}</div>
            <div style={{ color: '#6c757d' }}>Total de Tipos</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#d4edda', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #c3e6cb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#155724' }}>{stats.activePlaceTypes}</div>
            <div style={{ color: '#155724' }}>Tipos Activos</div>
          </div>
          
          <div style={{ 
            padding: '20px', 
            backgroundColor: '#f8d7da', 
            borderRadius: '8px',
            textAlign: 'center',
            border: '1px solid #f5c6cb'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#721c24' }}>{stats.inactivePlaceTypes}</div>
            <div style={{ color: '#721c24' }}>Tipos Inactivos</div>
          </div>
        </div>

        {stats.mostUsedPlaceType && (
          <div style={{
            padding: '20px',
            backgroundColor: '#d1ecf1',
            borderRadius: '8px',
            border: '1px solid #bee5eb',
            marginBottom: '20px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#0c5460' }}>🏆 Tipo Más Utilizado</h4>
            <p style={{ margin: '0', fontSize: '18px' }}>
              <strong>{stats.mostUsedPlaceType.nombre}</strong> - {stats.mostUsedPlaceType.usageCount} usos
            </p>
          </div>
        )}

        {stats.recentlyCreated && stats.recentlyCreated.length > 0 && (
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3cd',
            borderRadius: '8px',
            border: '1px solid #ffeaa7'
          }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#856404' }}>🆕 Creados Recientemente</h4>
            <div style={{ display: 'grid', gap: '10px' }}>
              {stats.recentlyCreated.map((placeType) => (
                <div key={placeType.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '4px'
                }}>
                  <span>{placeType.icono} {placeType.nombre}</span>
                  <small style={{ color: '#6c757d' }}>
                    {new Date(placeType.createdAt).toLocaleDateString()}
                  </small>
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
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <h1 style={{ margin: '0', color: '#333' }}>🏢 Tipos de Lugares</h1>
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
            📋 Lista
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

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          minHeight: '400px'
        }}>
          {activeTab === 'list' ? renderListTab() : renderStatsTab()}
        </div>
      </main>
    </div>
  );
}