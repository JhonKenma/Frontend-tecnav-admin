// src/pages/EditPlaceTypePage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { usePlaceType } from '../hooks/usePlaceType';
import { UpdatePlaceTypeDto } from '../types/place-types.types';

export const EditPlaceTypePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { placeType, loading: loadingPlaceType, updatePlaceType } = usePlaceType(id);

  const [formData, setFormData] = useState<UpdatePlaceTypeDto>({
    nombre: '',
    descripcion: '',
    icono: '',
    color: '#007bff'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (placeType) {
      setFormData({
        nombre: placeType.nombre,
        descripcion: placeType.descripcion || '',
        icono: placeType.icono || '',
        color: placeType.color || '#007bff'
      });
    }
  }, [placeType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      await updatePlaceType(formData);
      alert('¡Tipo de lugar actualizado exitosamente!');
      navigate('/place-types');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el tipo de lugar');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/place-types');
  };

  if (!id) {
    return (
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>❌ Error: ID no válido</h2>
          <button onClick={() => navigate('/place-types')}>
            Volver a la Lista
          </button>
        </main>
      </div>
    );
  }

  if (loadingPlaceType) {
    return (
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🔄 Cargando datos del tipo de lugar...</h2>
        </main>
      </div>
    );
  }

  if (!placeType) {
    return (
      <div>
        <Header />
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <h2>❌ Tipo de lugar no encontrado</h2>
          <p>El tipo de lugar que buscas no existe o ha sido eliminado.</p>
          <button onClick={() => navigate('/place-types')}>
            Volver a la Lista
          </button>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px' 
        }}>
          <h1 style={{ margin: '0', color: '#333' }}>✏️ Editar Tipo de Lugar</h1>
          <button
            onClick={() => navigate('/place-types')}
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
                placeholder="Ej: Restaurante, Hotel, Museo..."
              />
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
                placeholder="Descripción opcional del tipo de lugar..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Ícono (Emoji)
                </label>
                <input
                  type="text"
                  name="icono"
                  value={formData.icono || ''}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  placeholder="🏢"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Color
                </label>
                <input
                  type="color"
                  name="color"
                  value={formData.color || '#007bff'}
                  onChange={handleInputChange}
                  disabled={loading}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '5px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleCancel}
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
                {loading ? '⏳ Actualizando...' : '✅ Actualizar Tipo de Lugar'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};