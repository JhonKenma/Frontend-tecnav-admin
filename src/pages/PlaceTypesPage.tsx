// src/pages/PlaceTypesPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
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
    if (loadingList) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
          <p>Cargando tipos de lugares...</p>
        </div>
      );
    }

    if (errorList) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <p style={{ color: '#dc2626', fontSize: '16px' }}>Error: {errorList}</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '24px' }}>
        {placeTypes.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '60px 20px',
            background: '#f9fafb',
            borderRadius: '12px',
            border: '2px dashed #e5e7eb'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏢</div>
            <h3 style={{ 
              margin: '0 0 8px 0',
              fontSize: '20px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              No hay tipos de lugares registrados
            </h3>
            <p style={{ 
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '14px'
            }}>
              Crea el primer tipo de lugar para comenzar a organizar tus espacios
            </p>
            <button
              onClick={() => navigate('/place-types/new')}
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
              ➕ Crear Primer Tipo
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
                Total: <strong style={{ color: '#1f2937' }}>{placeTypes.length}</strong> tipos de lugares
              </span>
              <button
                onClick={() => navigate('/place-types/new')}
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

            <div style={{ 
              overflowX: 'auto',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse', 
                backgroundColor: '#ffffff'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ 
                      padding: '16px', 
                      textAlign: 'left', 
                      borderBottom: '2px solid #e5e7eb',
                      color: '#374151',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Tipo
                    </th>
                    <th style={{ 
                      padding: '16px', 
                      textAlign: 'left', 
                      borderBottom: '2px solid #e5e7eb',
                      color: '#374151',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Descripción
                    </th>
                    <th style={{ 
                      padding: '16px', 
                      textAlign: 'center', 
                      borderBottom: '2px solid #e5e7eb',
                      color: '#374151',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Creado
                    </th>
                    <th style={{ 
                      padding: '16px', 
                      textAlign: 'center', 
                      borderBottom: '2px solid #e5e7eb',
                      color: '#374151',
                      fontSize: '13px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {placeTypes.map((placeType, index) => (
                    <tr 
                      key={placeType.id} 
                      style={{ 
                        borderBottom: index < placeTypes.length - 1 ? '1px solid #e5e7eb' : 'none',
                        transition: 'background-color 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                      }}
                    >
                      <td style={{ padding: '16px' }}>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '12px' 
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '20px'
                          }}>
                            {placeType.icono || '🏢'}
                          </div>
                          <span style={{ 
                            fontWeight: '600',
                            color: '#1f2937',
                            fontSize: '14px'
                          }}>
                            {placeType.nombre}
                          </span>
                        </div>
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        color: '#6b7280',
                        fontSize: '14px'
                      }}>
                        {placeType.descripcion || '-'}
                      </td>
                      <td style={{ 
                        padding: '16px', 
                        textAlign: 'center', 
                        fontSize: '13px', 
                        color: '#6b7280' 
                      }}>
                        {new Date(placeType.createdAt).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ 
                          display: 'flex', 
                          gap: '8px', 
                          justifyContent: 'center' 
                        }}>
                          <button
                            onClick={() => navigate(`/place-types/${placeType.id}/edit`)}
                            style={{
                              backgroundColor: '#fbbf24',
                              color: '#ffffff',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f59e0b';
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#fbbf24';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            ✏️ Editar
                          </button>
                          <button
                            onClick={() => handleDelete(placeType.id, placeType.nombre)}
                            style={{
                              backgroundColor: '#dc2626',
                              color: '#ffffff',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#b91c1c';
                              e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc2626';
                              e.currentTarget.style.transform = 'scale(1)';
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
    if (loadingStats) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
          <p>Cargando estadísticas...</p>
        </div>
      );
    }

    if (errorStats) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
          <p style={{ color: '#dc2626', fontSize: '16px' }}>Error: {errorStats}</p>
        </div>
      );
    }

    if (!stats) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          color: '#6b7280'
        }}>
          No hay estadísticas disponibles
        </div>
      );
    }

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            padding: '24px', 
            background: '#f9fafb',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              {stats.totalPlaceTypes}
            </div>
            <div style={{ 
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Total de Tipos
            </div>
          </div>
          
          <div style={{ 
            padding: '24px', 
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #86efac',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#065f46',
              marginBottom: '8px'
            }}>
              {stats.activePlaceTypes}
            </div>
            <div style={{ 
              color: '#065f46',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Tipos Activos
            </div>
          </div>
          
          <div style={{ 
            padding: '24px', 
            background: 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid #fca5a5',
            transition: 'all 0.2s ease'
          }}>
            <div style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#7f1d1d',
              marginBottom: '8px'
            }}>
              {stats.inactivePlaceTypes}
            </div>
            <div style={{ 
              color: '#7f1d1d',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              Tipos Inactivos
            </div>
          </div>
        </div>

        {stats.mostUsedPlaceType && (
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            borderRadius: '12px',
            border: '1px solid #93c5fd',
            marginBottom: '24px'
          }}>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              color: '#1e3a8a',
              fontSize: '16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '24px' }}>🏆</span>
              Tipo Más Utilizado
            </h4>
            <p style={{ 
              margin: '0', 
              fontSize: '18px',
              color: '#1e40af',
              fontWeight: '600'
            }}>
              {stats.mostUsedPlaceType.nombre} - {stats.mostUsedPlaceType.usageCount} usos
            </p>
          </div>
        )}

        {stats.recentlyCreated && stats.recentlyCreated.length > 0 && (
          <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderRadius: '12px',
            border: '1px solid #fcd34d'
          }}>
            <h4 style={{ 
              margin: '0 0 16px 0', 
              color: '#78350f',
              fontSize: '16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '24px' }}>🆕</span>
              Creados Recientemente
            </h4>
            <div style={{ display: 'grid', gap: '12px' }}>
              {stats.recentlyCreated.map((placeType) => (
                <div key={placeType.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #fde68a'
                }}>
                  <span style={{ 
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#1f2937'
                  }}>
                    {placeType.icono} {placeType.nombre}
                  </span>
                  <small style={{ 
                    color: '#6b7280',
                    fontSize: '13px'
                  }}>
                    {new Date(placeType.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
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
            <span style={{ fontSize: '32px' }}>🏢</span>
            Tipos de Lugares
          </h1>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#6b7280'
          }}>
            Gestiona las categorías de lugares en el sistema
          </p>
        </div>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: '#6b7280',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
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
          ← Dashboard
        </button>
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
            📋 Lista
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
        {activeTab === 'list' ? renderListTab() : renderStatsTab()}
      </div>
    </AdminLayout>
  );
};