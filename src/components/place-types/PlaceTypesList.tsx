// src/components/place-types/PlaceTypesList.tsx
import React, { useState } from 'react';
import { usePlaceTypes } from '../../hooks/usePlaceTypes';
import { PlaceTypeQueryParams } from '../../types/place-types.types';

export const PlaceTypesList: React.FC = () => {
  const [filters, setFilters] = useState<PlaceTypeQueryParams>({
    page: 1,
    limit: 10,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const {
    placeTypes,
    loading,
    error,
    total,
    currentPage,
    fetchPlaceTypes,
    deletePlaceType,
    
  } = usePlaceTypes(filters);

  const handleSearch = (search: string) => {
    const newFilters = { ...filters, search, page: 1 };
    setFilters(newFilters);
    fetchPlaceTypes(newFilters);
  };

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    fetchPlaceTypes(newFilters);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este tipo de lugar?')) {
      try {
        await deletePlaceType(id);
        alert('Tipo de lugar eliminado exitosamente');
      } catch (error) {
        alert('Error al eliminar el tipo de lugar');
      }
    }
  };


  if (loading) return <div>Cargando tipos de lugares...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="place-types-list">
      <div className="header">
        <h2>Tipos de Lugares</h2>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar tipos de lugares..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button onClick={() => window.location.href = '/place-types/new'}>
            Nuevo Tipo de Lugar
          </button>
        </div>
      </div>

      <div className="filters">
        <select
          value={filters.isActive?.toString() || ''}
          onChange={(e) => {
            const isActive = e.target.value === '' ? undefined : e.target.value === 'true';
            const newFilters = { ...filters, isActive, page: 1 };
            setFilters(newFilters);
            fetchPlaceTypes(newFilters);
          }}
        >
          <option value="">Todos los estados</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {placeTypes.map((placeType) => (
              <tr key={placeType.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {placeType.icono && <span style={{ marginRight: '8px' }}>{placeType.icono}</span>}
                    <span>{placeType.nombre}</span>
                  </div>
                </td>
                <td>{placeType.descripcion || '-'}</td>
                <td>
                  <span className={`status ${placeType.isActive ? 'active' : 'inactive'}`}>
                    {placeType.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>{new Date(placeType.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => window.location.href = `/place-types/${placeType.id}`}
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => window.location.href = `/place-types/${placeType.id}/edit`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(placeType.id)}
                      className="delete"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <span>
          Mostrando {placeTypes.length} de {total} resultados
        </span>
        <div className="pagination-controls">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            disabled={placeTypes.length < (filters.limit || 10)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};