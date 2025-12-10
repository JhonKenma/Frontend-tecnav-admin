// src/components/layout/Sidebar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      path: '/dashboard',
    },
    {
      id: 'place-types',
      label: 'Tipos de Lugares',
      icon: '🏢',
      path: '/place-types',
    },
    {
      id: 'places',
      label: 'Lugares',
      icon: '📍',
      path: '/places',
    },

    // ✅ AGREGADO: MENÚ DE USUARIOS
    {
      id: 'users',
      label: 'Usuarios',
      icon: '👥',
      path: '/users',
      disabled: false,
    },

  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside style={{
      width: isCollapsed ? '80px' : '280px',
      height: '100vh',
      background: 'linear-gradient(180deg, #00A7E1 0%, #0088BA 100%)',
      position: 'fixed',
      left: 0,
      top: 0,
      transition: 'width 0.3s ease',
      boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      
      {/* Logo Section */}
      <div style={{
        padding: '24px 20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '80px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            backdropFilter: 'blur(10px)',
            flexShrink: 0,
          }}>
            🎓
          </div>
          {!isCollapsed && (
            <div style={{
              opacity: isCollapsed ? 0 : 1,
              transition: 'opacity 0.2s ease',
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                whiteSpace: 'nowrap',
              }}>
                Tecsup Navigation
              </h2>
              <p style={{
                margin: 0,
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.8)',
                whiteSpace: 'nowrap',
              }}>
                Panel Administrativo
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav style={{
        flex: 1,
        padding: '20px 12px',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => !item.disabled && navigate(item.path)}
            disabled={item.disabled}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              marginBottom: '8px',
              border: 'none',
              borderRadius: '10px',
              background: isActive(item.path) 
                ? 'rgba(255, 255, 255, 0.25)' 
                : 'transparent',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: isActive(item.path) ? '600' : '500',
              cursor: item.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'left',
              opacity: item.disabled ? 0.5 : 1,
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              if (!item.disabled && !isActive(item.path)) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (!item.disabled && !isActive(item.path)) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {isActive(item.path) && (
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '60%',
                background: '#ffffff',
                borderRadius: '0 4px 4px 0',
              }}></div>
            )}

            <span style={{ 
              fontSize: '20px',
              flexShrink: 0,
            }}>
              {item.icon}
            </span>

            {!isCollapsed && (
              <span style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {item.label}
              </span>
            )}

            {item.disabled && !isCollapsed && (
              <span style={{
                marginLeft: 'auto',
                fontSize: '11px',
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '2px 8px',
                borderRadius: '4px',
              }}>
                Próximo
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        style={{
          margin: '12px',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'none',
          borderRadius: '10px',
          color: '#ffffff',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        }}
      >
        {isCollapsed ? '→' : '←'}
      </button>
    </aside>
  );
};

export default Sidebar;
