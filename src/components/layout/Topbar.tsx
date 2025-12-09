// src/components/layout/Topbar.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface TopbarProps {
  sidebarCollapsed: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ sidebarCollapsed }) => {
  const { user, logout } = useAuth();

  return (
    <header style={{
      height: '70px',
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      position: 'fixed',
      top: 0,
      left: sidebarCollapsed ? '80px' : '280px',
      right: 0,
      transition: 'left 0.3s ease',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
    }}>
      {/* Page Title */}
      <div>
        <h1 style={{
          margin: 0,
          fontSize: '20px',
          fontWeight: '600',
          color: '#1f2937',
        }}>
          Panel de Administración
        </h1>
        <p style={{
          margin: '4px 0 0 0',
          fontSize: '13px',
          color: '#6b7280',
        }}>
          Gestiona tu sistema de navegación
        </p>
      </div>

      {/* User Section */}
      {user && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}>
          {/* Notifications */}
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
          }}>
            🔔
          </button>

          {/* User Info */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 16px',
            background: '#f9fafb',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '700',
            }}>
              {user.lastName?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                lineHeight: '1.2',
              }}>
                {user.lastName}
              </span>
              <span style={{
                fontSize: '12px',
                color: '#6b7280',
                lineHeight: '1.2',
              }}>
                {user.role}
              </span>
            </div>

            <button
              onClick={logout}
              style={{
                padding: '8px 12px',
                background: '#dc2626',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                marginLeft: '8px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <span>🚪</span>
              Salir
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;