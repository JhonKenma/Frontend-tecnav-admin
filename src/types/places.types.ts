// src/types/places.types.ts
export interface Place {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  tipoId: string;
  descripcion?: string;
  imagen?: string;
  isActive: boolean;
  piso?: number;
  edificio?: string;
  codigoQR?: string;
  createdAt: string;
  updatedAt: string;
  tipo?: {
    id: string;
    nombre: string;
    icono?: string;
  };
}

export interface CreatePlaceDto {
  nombre: string;
  latitud: number;
  longitud: number;
  tipoId: string;
  descripcion?: string;
  imagen?: string;
  isActive?: boolean;
  piso?: number;
  edificio?: string;
  codigoQR?: string;
}

export interface UpdatePlaceDto {
  nombre?: string;
  latitud?: number;
  longitud?: number;
  tipoId?: string;
  descripcion?: string;
  imagen?: string;
  isActive?: boolean;
  piso?: number;
  edificio?: string;
  codigoQR?: string;
}

export interface SearchPlacesDto {
  nombre?: string;
  tipoId?: string;
  edificio?: string;
  piso?: number;
  isActive?: boolean;
  nearLat?: number;
  nearLng?: number;
  radius?: number;
  page?: number;
  limit?: number;
}

export interface PlaceStats {
  total: number;
  active: number;
  inactive: number;
  byType: Array<{
    tipo: string;
    count: number;
  }>;
  byBuilding: Array<{
    edificio: string;
    count: number;
  }>;
}

export interface PlaceApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}