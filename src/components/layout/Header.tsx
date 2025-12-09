// src/components/layout/Header.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h1>Tecsup Navigation</h1>
      
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Bienvenido, {user.lastName}</span>
          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cerrar Sesión
          </button>

        </div>
      )}
    </header>
  );
};

export default Header;