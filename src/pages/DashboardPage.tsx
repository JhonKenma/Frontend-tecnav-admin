// src/pages/DashboardPage.tsx - ACTUALIZADO
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/layout/Header';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Dashboard</h2>
          <p style={{ color: '#666' }}>Bienvenido al panel de administración</p>
        </div>

        {/* Información del Usuario */}
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ marginTop: '0', color: '#495057' }}>Información del Usuario</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Nombre:</strong> {user?.lastName}</p>
            <p><strong>Rol:</strong> {user?.role}</p>
          </div>
        </div>

        {/* Módulos de Gestión */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#333', marginBottom: '20px' }}>Módulos de Gestión</h3>
          
          {/* Place Types Module */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '18px' }}>
                  🏢 Tipos de Lugares
                </h4>
                <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
                  Gestiona los diferentes tipos de lugares del sistema
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              flexWrap: 'wrap',
              marginTop: '20px'
            }}>
              <button
                onClick={() => navigate('/place-types')}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📋 Ver Todos
              </button>
              
              <button
                onClick={() => navigate('/place-types/new')}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ➕ Crear Nuevo
              </button>
            </div>
          </div>

          {/* 🆕 NUEVO MÓDULO DE PLACES */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '18px' }}>
                  📍 Lugares
                </h4>
                <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
                  Administra todos los lugares del campus
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              flexWrap: 'wrap',
              marginTop: '20px'
            }}>
              <button
                onClick={() => navigate('/places')}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📋 Ver Todos los Lugares
              </button>
              
              <button
                onClick={() => navigate('/places/new')}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ➕ Crear Lugar
              </button>
              
              <button
                onClick={() => navigate('/places?tab=stats')}
                style={{
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                📊 Estadísticas
              </button>
            </div>
          </div>

          {/* Otros módulos futuros */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '25px',
            borderRadius: '12px',
            border: '1px solid #dee2e6',
            opacity: '0.7'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#495057', fontSize: '18px' }}>
                  🚧 Próximos Módulos
                </h4>
                <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
                  Funcionalidades que estarán disponibles próximamente
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px',
              marginTop: '20px'
            }}>
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#ffffff', 
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#495057' }}>🗺️ Rutas</h5>
                <p style={{ margin: '0', fontSize: '12px', color: '#6c757d' }}>
                  Gestión de rutas de navegación
                </p>
              </div>
              
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#ffffff', 
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#495057' }}>👥 Usuarios</h5>
                <p style={{ margin: '0', fontSize: '12px', color: '#6c757d' }}>
                  Administración de usuarios
                </p>
              </div>
              
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#ffffff', 
                borderRadius: '6px',
                border: '1px solid #dee2e6'
              }}>
                <h5 style={{ margin: '0 0 8px 0', color: '#495057' }}>📱 Configuración</h5>
                <p style={{ margin: '0', fontSize: '12px', color: '#6c757d' }}>
                  Settings del sistema
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div style={{
          backgroundColor: '#e9ecef',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
        }}>
          <h3 style={{ marginTop: '0', color: '#495057' }}>🚀 Accesos Rápidos</h3>
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap',
            marginTop: '15px'
          }}>
            <button
              onClick={() => navigate('/place-types')}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              🏢 Tipos de Lugares
            </button>
            
            <button
              onClick={() => navigate('/places')}
              style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              📍 Lugares
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;