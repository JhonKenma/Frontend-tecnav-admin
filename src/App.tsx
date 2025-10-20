// src/App.tsx - ACTUALIZADO CON RUTAS DE PLACES
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/common/PrivateRoute';

// Páginas para Place Types
import { PlaceTypesPage } from './pages/PlaceTypesPage';
import { CreatePlaceTypePage } from './pages/CreatePlaceTypePage';
import { EditPlaceTypePage } from './pages/EditPlaceTypePage';

// 🆕 Páginas para Places
import { PlacesPage } from './pages/PlacesPage';
import { CreatePlacePage } from './pages/CreatePlacePage';
import { EditPlacePage } from './pages/EditPlacePage';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Ruta pública - Login */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />
      
      {/* Dashboard */}
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } 
      />
      
      {/* RUTAS PARA PLACE TYPES */}
      <Route 
        path="/place-types" 
        element={
          <PrivateRoute>
            <PlaceTypesPage />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/place-types/new" 
        element={
          <PrivateRoute>
            <CreatePlaceTypePage />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/place-types/:id/edit" 
        element={
          <PrivateRoute>
            <EditPlaceTypePage />
          </PrivateRoute>
        } 
      />
      
      {/* 🆕 RUTAS PARA PLACES */}
      <Route 
        path="/places" 
        element={
          <PrivateRoute>
            <PlacesPage />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/places/new" 
        element={
          <PrivateRoute>
            <CreatePlacePage />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/places/:id" 
        element={
          <PrivateRoute>
            <PlacesPage />
          </PrivateRoute>
        } 
      />
      
      <Route 
        path="/places/:id/edit" 
        element={
          <PrivateRoute>
            <EditPlacePage />
          </PrivateRoute>
        } 
      />
      
      {/* Ruta raíz */}
      <Route 
        path="/" 
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />} 
      />
      
      {/* Ruta 404 */}
      <Route 
        path="*" 
        element={
          <div style={{ 
            padding: '40px', 
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto',
            marginTop: '100px'
          }}>
            <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>
              404 - Página no encontrada
            </h2>
            <p style={{ color: '#6c757d', marginBottom: '30px' }}>
              La página que buscas no existe o ha sido movida.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <a 
                href="/dashboard" 
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                🏠 Dashboard
              </a>
              <a 
                href="/places" 
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                📍 Lugares
              </a>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;