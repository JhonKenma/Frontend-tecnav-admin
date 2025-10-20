// src/pages/CreatePlacePage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { usePlaces } from '../hooks/usePlaces';
import { CreatePlaceDto } from '../types/places.types';
import { placeTypesService } from '../services/place-types.service';

export const CreatePlacePage: React.FC = () => {
  const navigate = useNavigate();
  const { createPlace } = usePlaces();

  const [placeTypes, setPlaceTypes] = useState<any[]>([]);
  const [formData, setFormData] = useState<CreatePlaceDto>({
    nombre: '',
    latitud: -12.0464,
    longitud: -77.0428,
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
    
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }
    
    if (!formData.tipoId) {
      setError('El tipo de lugar es requerido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createPlace(formData);
      alert('¡Lugar creado exitosamente!');
      navigate('/places');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el lugar');
    } finally {
      setLoading(false);
    }
  };

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
          <h1 style={{ margin: '0', color: '#333' }}>📍 Crear Nuevo Lugar</h1>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
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
                  placeholder="Ej: Biblioteca Central"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Tipo de Lugar *
                </label>
                <select
                  name="tipoId"
                  value={formData.tipoId}
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
                value={formData.descripcion}
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
                placeholder="Descripción del lugar..."
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
                  value={formData.latitud}
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
                  value={formData.longitud}
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
                  value={formData.edificio}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  placeholder="Ej: Edificio A"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Piso
                </label>
                <input
                  type="number"
                  name="piso"
                  value={formData.piso}
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
                  value={formData.imagen}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  placeholder="https://..."
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Código QR
                </label>
                <input
                  type="text"
                  name="codigoQR"
                  value={formData.codigoQR}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  placeholder="Opcional (se genera automático)"
                />
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
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
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.6 : 1
                }}
              >
                {loading ? '⏳ Creando...' : '✅ Crear Lugar'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};