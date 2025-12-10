// src/pages/DashboardPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '../components/layout/AdminLayout';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Crear Lugar',
      description: 'Agregar un nuevo lugar al mapa',
      icon: '➕',
      color: '#00A7E1',
      action: () => navigate('/places/new'),
    },
    {
      title: 'Nuevo Tipo',
      description: 'Crear tipo de lugar',
      icon: '🏢',
      color: '#0088BA',
      action: () => navigate('/place-types/new'),
    },
    {
      title: 'Ver Lugares',
      description: 'Administrar lugares existentes',
      icon: '📋',
      color: '#00C9A7',
      action: () => navigate('/places'),
    },
    {
      title: 'Ver Tipos de Lugares',
      description: 'Gestionar tipos de lugares',
      icon: '🏷️',
      color: '#845EC2',
      action: () => navigate('/place-types'),
    },
    {
      title: 'Ver Usuarios',
      description: 'Administrar usuarios del sistema',
      icon: '👥',
      color: '#f59e0b',
      action: () => navigate('/users'),
    },
  ];

  return (
    <AdminLayout>
      {/* Welcome Card */}
      <div style={{
        background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '32px',
        color: '#ffffff',
        boxShadow: '0 8px 24px rgba(0, 167, 225, 0.3)',
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '32px',
          fontWeight: '700',
        }}>
          ¡Bienvenido de nuevo, {user?.lastName}! 👋
        </h1>
        <p style={{
          margin: 0,
          fontSize: '16px',
          opacity: 0.95,
        }}>
          Panel de administración del sistema de navegación Tecsup
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '28px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb',
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '20px',
          fontWeight: '700',
          color: '#1f2937',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span>⚡</span>
          Acciones Rápidas
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              style={{
                padding: '20px',
                background: '#f9fafb',
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = action.color;
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.background = '#f9fafb';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                background: `${action.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}>
                {action.icon}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  margin: '0 0 4px 0',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1f2937',
                }}>
                  {action.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#6b7280',
                }}>
                  {action.description}
                </p>
              </div>
              <span style={{
                fontSize: '20px',
                color: action.color,
              }}>
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;