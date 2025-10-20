// src/components/place-types/PlaceTypeStats.tsx - YA ESTÁ BIEN
// Solo cambié icon por icono, el resto está correcto
import React from 'react';
import { usePlaceTypeStats } from '../../hooks/usePlaceTypeStats';

export const PlaceTypeStats: React.FC = () => {
  const { stats, loading, error, refetch } = usePlaceTypeStats();

  if (loading) return <div>Cargando estadísticas...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>No hay estadísticas disponibles</div>;

  return (
    <div className="place-type-stats">
      <div className="stats-header">
        <h3>Estadísticas de Tipos de Lugares</h3>
        <button onClick={refetch}>Actualizar</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total de Tipos</h4>
          <p className="stat-value">{stats.totalPlaceTypes}</p>
        </div>

        <div className="stat-card active">
          <h4>Tipos Activos</h4>
          <p className="stat-value">{stats.activePlaceTypes}</p>
        </div>

        <div className="stat-card inactive">
          <h4>Tipos Inactivos</h4>
          <p className="stat-value">{stats.inactivePlaceTypes}</p>
        </div>

        {stats.mostUsedPlaceType && (
          <div className="stat-card popular">
            <h4>Más Utilizado</h4>
            <p className="stat-value">{stats.mostUsedPlaceType.nombre}</p>
            <p className="stat-detail">{stats.mostUsedPlaceType.usageCount} usos</p>
          </div>
        )}
      </div>

      {stats.recentlyCreated.length > 0 && (
        <div className="recent-items">
          <h4>Creados Recientemente</h4>
          <ul>
            {stats.recentlyCreated.map((placeType) => (
              <li key={placeType.id}>
                <span>{placeType.icono} {placeType.nombre}</span>
                <small>{new Date(placeType.createdAt).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};