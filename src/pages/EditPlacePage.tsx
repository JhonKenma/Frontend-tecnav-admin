// src/pages/EditPlacePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { usePlace } from '../hooks/usePlace';
import { UpdatePlaceDto } from '../types/places.types';
import { placeTypesService } from '../services/place-types.service';

export const EditPlacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { place, loading: loadingPlace, updatePlace } = usePlace(id);

  const [placeTypes, setPlaceTypes] = useState<any[]>([]);
  const [formData, setFormData] = useState<UpdatePlaceDto>({
    nombre: '',
    latitud: 0,
    longitud: 0,
    tipoId: '',
    descripcion: '',
    imagen: '',
    isActive: true,
    piso: 0,
    edificio: '',
    codigoQR: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaceTypes = async () => {
      try {
        const response = await placeTypesService.getAllPlaceTypes();
        setPlaceTypes(response.data);
      } catch (err) {
        console.error('Error loading place types:', err);
      }
    };
    loadPlaceTypes();
  }, []);

  useEffect(() => {
    if (place) {
      setFormData({
        nombre: place.nombre,
        latitud: place.latitud,
        longitud: place.longitud,
        tipoId: place.tipoId,
        descripcion: place.descripcion || '',
        imagen: place.imagen || '',
        isActive: place.isActive,
        piso: place.piso || 0,
        edificio: place.edificio || '',
        codigoQR: place.codigoQR || ''
      });
    }
  }, [place]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
        ? parseFloat(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre?.trim()) {
      setError('El nombre es requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updatePlace(formData);
      alert('¡Lugar actualizado exitosamente!');
      navigate('/places');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el lugar');
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return (
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>❌ Error: ID no válido</h2>
          <button onClick={() => navigate('/places')}>Volver a la Lista</button>
        </main>
      </div>
    );
  }

  if (loadingPlace) {
    return (
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🔄 Cargando datos del lugar...</h2>
        </main>
      </div>
    );
  }

  if (!place) {
    return (
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>❌ Lugar no encontrado</h2>
          <button onClick={() => navigate('/places')}>Volver a la Lista</button>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <h1 style={{ margin: '0', color: '#333' }}>✏️ Editar Lugar</h1>
          <button
            onClick={() => navigate('/places')}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ← Volver a la Lista
          </button>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          {error && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '20px',
              border: '1px solid #f5c6cb'
            }}>
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Los mismos campos que CreatePlacePage */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ''}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Tipo de Lugar *
                </label>
                <select
                  name="tipoId"
                  value={formData.tipoId || ''}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                >
                  <option value="">Seleccionar tipo...</option>
                  {placeTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icono} {type.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion || ''}
                onChange={handleInputChange}
                disabled={loading}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Latitud *
                </label>
                <input
                  type="number"
                  name="latitud"
                  value={formData.latitud || 0}
                  onChange={handleInputChange}
                  required
                  step="0.000001"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Longitud *
                </label>
                <input
                  type="number"
                  name="longitud"
                  value={formData.longitud || 0}
                  onChange={handleInputChange}
                  required
                  step="0.000001"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Edificio
                </label>
                <input
                  type="text"
                  name="edificio"
                  value={formData.edificio || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Piso
                </label>
                <input
                  type="number"
                  name="piso"
                  value={formData.piso || 0}
                  onChange={handleInputChange}
                  disabled={loading}
                  min="0"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Imagen URL
                </label>
                <input
                  type="url"
                  name="imagen"
                  value={formData.imagen || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Código QR
                </label>
                <input
                  type="text"
                  name="codigoQR"
                  value={formData.codigoQR || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive || false}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <span style={{ fontWeight: '500' }}>Activo</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => navigate('/places')}
                disabled={loading}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: '#ffc107',
                  color: '#212529',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? '⏳ Actualizando...' : '✅ Actualizar Lugar'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};