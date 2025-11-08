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
  const [imageFile, setImageFile] = useState<File | null>(null); // ✅ NUEVO
  const [imagePreview, setImagePreview] = useState<string | null>(null); // ✅ NUEVO
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
      
      // ✅ NUEVO: Mostrar imagen existente
      if (place.imagen) {
        setImagePreview(place.imagen);
      }
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

  // ✅ NUEVO: Manejador de cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        setError('Solo se permiten imágenes (JPG, PNG, GIF, WebP)');
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar los 5MB');
        return;
      }

      setImageFile(file);
      setError(null);
      
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ NUEVO: Limpiar imagen
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(place?.imagen || null); // Volver a la imagen original
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
      await updatePlace(formData, imageFile || undefined); // ✅ PASAR EL ARCHIVO
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

            {/* ✅ NUEVO: Campo de imagen */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Imagen del Lugar
              </label>
              
              {/* Mostrar imagen actual si existe */}
              {place.imagen && !imageFile && (
                <div style={{ marginBottom: '10px' }}>
                  <p style={{ fontSize: '14px', color: '#6c757d', marginBottom: '5px' }}>
                    Imagen actual:
                  </p>
                  <img 
                    src={place.imagen} 
                    alt="Imagen actual" 
                    style={{ 
                      maxWidth: '200px', 
                      maxHeight: '150px', 
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }} 
                  />
                </div>
              )}
              
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
              <small style={{ color: '#6c757d', display: 'block', marginTop: '5px' }}>
                Formatos: JPG, PNG, GIF, WebP. Máximo 5MB. Deja vacío para mantener la imagen actual.
              </small>
              
              {/* Preview de la nueva imagen */}
              {imageFile && imagePreview && (
                <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                  <p style={{ fontSize: '14px', color: '#28a745', marginBottom: '5px' }}>
                    Nueva imagen:
                  </p>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '300px', 
                      maxHeight: '200px', 
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }} 
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: '25px',
                      right: '5px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                    title="Cancelar cambio de imagen"
                  >
                    ✕
                  </button>
                </div>
              )}
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

            <div style={{ marginBottom: '20px' }}>
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