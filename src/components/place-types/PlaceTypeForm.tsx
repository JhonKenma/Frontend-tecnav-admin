// src/components/place-types/PlaceTypeForm.tsx - CORREGIDO
import React, { useState, useEffect } from 'react';
import { CreatePlaceTypeDto, UpdatePlaceTypeDto } from '../../types/place-types.types';
import { usePlaceTypes } from '../../hooks/usePlaceTypes';
import { usePlaceType } from '../../hooks/usePlaceType';

interface PlaceTypeFormProps {
  placeTypeId?: string;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export const PlaceTypeForm: React.FC<PlaceTypeFormProps> = ({
  placeTypeId,
  onSubmit,
  onCancel
}) => {
  const isEditing = !!placeTypeId;
  
  const { createPlaceType } = usePlaceTypes();
  const { placeType, loading: loadingPlaceType, updatePlaceType } = usePlaceType(placeTypeId);
  
  const [formData, setFormData] = useState<CreatePlaceTypeDto>({
    nombre: '',
    descripcion: '',
    icono: '',  // ✅ Cambiado de icon a icono
    color: '#000000'
    // ❌ Eliminado isActive
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && placeType) {
      setFormData({
        nombre: placeType.nombre,
        descripcion: placeType.descripcion || '',
        icono: placeType.icono || '',  // ✅ Cambiado
        color: placeType.color || '#000000'
        // ❌ Eliminado isActive
      });
    }
  }, [isEditing, placeType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;  // ✅ Removido type y checkbox
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;
      
      if (isEditing && placeTypeId) {
        result = await updatePlaceType(formData as UpdatePlaceTypeDto);
      } else {
        result = await createPlaceType(formData);
      }

      if (onSubmit) {
        onSubmit(result);
      } else {
        alert(`Tipo de lugar ${isEditing ? 'actualizado' : 'creado'} exitosamente`);
        window.location.href = '/place-types';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (isEditing && loadingPlaceType) {
    return <div>Cargando datos del tipo de lugar...</div>;
  }

  return (
    <div className="place-type-form">
      <h2>{isEditing ? 'Editar Tipo de Lugar' : 'Crear Nuevo Tipo de Lugar'}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"  // ✅ Cambiado de name a nombre
            value={formData.nombre}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"  // ✅ Cambiado de description a descripcion
            value={formData.descripcion}
            onChange={handleInputChange}
            rows={3}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="icono">Ícono (Emoji)</label>
          <input
            type="text"
            id="icono"
            name="icono"  // ✅ Cambiado de icon a icono
            value={formData.icono}
            onChange={handleInputChange}
            placeholder="🏢"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="color"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>

        {/* ❌ ELIMINADO el checkbox de isActive */}

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel || (() => window.history.back())}
            disabled={loading}
            className="secondary"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="primary"
          >
            {loading ? 'Procesando...' : (isEditing ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </form>
    </div>
  );
};