// src/components/places/PlacesStatsTab.tsx
import React from 'react';
import { PlaceStats } from '../../types/places.types';

interface PlacesStatsTabProps {
  stats: PlaceStats | null;
  loading: boolean;
  error: string | null;
}

const PlacesStatsTab: React.FC<PlacesStatsTabProps> = ({
  stats,
  loading,
  error
}) => {
  if (loading) {
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
      {/* Tarjetas de estadísticas generales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
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
            {stats.total}
          </div>
          <div style={{ 
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Total de Lugares
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
            {stats.active}
          </div>
          <div style={{ 
            color: '#065f46',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Lugares Activos
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
            {stats.inactive}
          </div>
          <div style={{ 
            color: '#7f1d1d',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            Lugares Inactivos
          </div>
        </div>
      </div>

      {/* Estadísticas por tipo */}
      {stats.byType && stats.byType.length > 0 && (
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
          borderRadius: '12px',
          border: '1px solid #93c5fd',
          marginBottom: '24px'
        }}>
          <h4 style={{ 
            margin: '0 0 16px 0', 
            color: '#1e3a8a',
            fontSize: '16px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '24px' }}>📊</span>
            Lugares por Tipo
          </h4>
          <div style={{ display: 'grid', gap: '12px' }}>
            {stats.byType.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <span style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {item.tipo}
                </span>
                <span style={{ 
                  backgroundColor: '#00A7E1',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700'
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
            <span style={{ fontSize: '24px' }}>🏢</span>
            Lugares por Edificio
          </h4>
          <div style={{ display: 'grid', gap: '12px' }}>
            {stats.byBuilding.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #fde68a',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <span style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {item.edificio}
                </span>
                <span style={{ 
                  backgroundColor: '#fbbf24',
                  color: '#ffffff',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700'
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

export default PlacesStatsTab;
