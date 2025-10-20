// src/components/common/PrivateRoute.tsx
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        Cargando...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        No autorizado. Por favor inicia sesión.
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;