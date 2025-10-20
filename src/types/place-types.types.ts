// src/types/place-types.types.ts
export interface PlaceType {
  id: string;
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlaceTypeDto {
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
}

export interface UpdatePlaceTypeDto {
  nombre?: string;
  descripcion?: string;
  icono?: string;
  color?: string;
  
}

export interface PlaceTypeStats {
  totalPlaceTypes: number;
  activePlaceTypes: number;
  inactivePlaceTypes: number;
  mostUsedPlaceType: {
    id: string;
    nombre: string;
    usageCount: number;
  } | null;
  recentlyCreated: PlaceType[];
}

export interface PlaceTypeApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface PlaceTypeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
}