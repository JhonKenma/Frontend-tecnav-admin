// src/components/places/PlacesTable.tsx
import React from 'react';
import { Place } from '../types/places.types';
interface PlacesTableProps {
  places: Place[];
  onViewDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean, name: string) => void;
  onDelete: (id: string, name: string) => void;
}

const PlacesTable: React.FC<PlacesTableProps> = ({
  places,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onDelete
}) => {
  return (
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
              Lugar
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
              Tipo
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
              Ubicación
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
              Estado
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
          {places.map((place, index) => (
            <tr 
              key={place.id} 
              style={{ 
                borderBottom: index < places.length - 1 ? '1px solid #e5e7eb' : 'none',
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
                <div>
                  <div style={{ 
                    fontWeight: '600',
                    color: '#1f2937',
                    fontSize: '14px',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '20px' }}>{place.tipo?.icono || '📍'}</span>
                    {place.nombre}
                  </div>
                  {place.descripcion && (
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#6b7280',
                      lineHeight: '1.4'
                    }}>
                      {place.descripcion.substring(0, 60)}
                      {place.descripcion.length > 60 && '...'}
                    </div>
                  )}
                </div>
              </td>
              <td style={{ padding: '16px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {place.tipo?.nombre || '-'}
                </span>
              </td>
              <td style={{ 
                padding: '16px', 
                textAlign: 'center', 
                fontSize: '13px', 
                color: '#6b7280' 
              }}>
                <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                  {place.edificio || '-'} 
                  {place.piso !== undefined && place.piso !== null && (
                    <span style={{ 
                      marginLeft: '4px',
                      padding: '2px 6px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}>
                      Piso {place.piso}
                    </span>
                  )}
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#9ca3af',
                  fontFamily: 'monospace'
                }}>
                  {place.latitud.toFixed(6)}, {place.longitud.toFixed(6)}
                </div>
              </td>
              <td style={{ padding: '16px', textAlign: 'center' }}>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: place.isActive ? '#d1fae5' : '#fecaca',
                  color: place.isActive ? '#065f46' : '#7f1d1d',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {place.isActive ? '✅ Activo' : '❌ Inactivo'}
                </span>
              </td>
              <td style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '6px', 
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => onViewDetails(place.id)}
                    style={{
                      backgroundColor: '#06b6d4',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Ver detalles"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0891b2';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#06b6d4';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    👁️
                  </button>
                  <button
                    onClick={() => onEdit(place.id)}
                    style={{
                      backgroundColor: '#fbbf24',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Editar"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f59e0b';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#fbbf24';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onToggleStatus(place.id, place.isActive, place.nombre)}
                    style={{
                      backgroundColor: place.isActive ? '#ef4444' : '#10b981',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title={place.isActive ? 'Desactivar' : 'Activar'}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = place.isActive ? '#dc2626' : '#059669';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = place.isActive ? '#ef4444' : '#10b981';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {place.isActive ? '🚫' : '✅'}
                  </button>
                  <button
                    onClick={() => onDelete(place.id, place.nombre)}
                    style={{
                      backgroundColor: '#dc2626',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Eliminar"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#b91c1c';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
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
  );
};

export default PlacesTable;