// src/pages/UsersPage.tsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import { usersService, GoogleUser, GoogleUsersStats } from '../services/users.service';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<GoogleUser[]>([]);
  const [stats, setStats] = useState<GoogleUsersStats>({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Fetching users data...');
      
      // Llamar a ambos endpoints
      const [usersResponse, statsResponse] = await Promise.all([
        usersService.getGoogleUsers(),
        usersService.getGoogleUsersStats(),
      ]);

      console.log('✅ Users response:', usersResponse);
      console.log('✅ Stats response:', statsResponse);

      if (usersResponse.success) {
        setUsers(usersResponse.data.users);
      } else {
        setError(usersResponse.message || 'Error al cargar usuarios');
      }

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (err: any) {
      console.error('❌ Error fetching users:', err);
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      ADMIN: 'Administrador',
      STUDENT: 'Estudiante',
      TEACHER: 'Profesor',
    };
    return roles[role] || role;
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      ADMIN: '#dc2626',
      STUDENT: '#00A7E1',
      TEACHER: '#845EC2',
    };
    return colors[role] || '#6b7280';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}>
          <div style={{
            fontSize: '18px',
            color: '#6b7280',
          }}>
            Cargando usuarios...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
          }}>
            👥 Usuarios del Sistema
          </h1>
          <p style={{
            margin: 0,
            color: '#6b7280',
            fontSize: '14px',
          }}>
            Gestión de usuarios registrados con Google
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #00A7E1 0%, #0088BA 100%)',
          borderRadius: '12px',
          padding: '20px',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 167, 225, 0.3)',
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
            Total de Usuarios
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            {stats.total}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #00C9A7 0%, #00B894 100%)',
          borderRadius: '12px',
          padding: '20px',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 201, 167, 0.3)',
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
            Usuarios Activos
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            {stats.active}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
          borderRadius: '12px',
          padding: '20px',
          color: '#ffffff',
          boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
        }}>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>
            Usuarios Inactivos
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700' }}>
            {stats.inactive}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb',
      }}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre o correo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#00A7E1'}
          onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
        />
      </div>

      {/* Users Table */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}>
        {error && (
          <div style={{
            padding: '16px',
            background: '#fee2e2',
            color: '#dc2626',
            borderBottom: '1px solid #fecaca',
          }}>
            {error}
          </div>
        )}

        {filteredUsers.length === 0 ? (
          <div style={{
            padding: '48px',
            textAlign: 'center',
            color: '#6b7280',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👤</div>
            <div style={{ fontSize: '16px', fontWeight: '500' }}>
              No se encontraron usuarios
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              {searchTerm ? 'Intenta con otra búsqueda' : 'No hay usuarios registrados con Google'}
            </div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}>
              <thead>
                <tr style={{
                  background: '#f9fafb',
                  borderBottom: '2px solid #e5e7eb',
                }}>
                  <th style={tableHeaderStyle}>Usuario</th>
                  <th style={tableHeaderStyle}>Correo</th>
                  <th style={tableHeaderStyle}>Rol</th>
                  <th style={tableHeaderStyle}>Estado</th>
                  <th style={tableHeaderStyle}>Fecha de Registro</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={tableCellStyle}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}>
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.nombreCompleto}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00A7E1, #845EC2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff',
                            fontWeight: '600',
                            fontSize: '16px',
                          }}>
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                        )}
                        <div>
                          <div style={{
                            fontWeight: '600',
                            color: '#1f2937',
                          }}>
                            {user.nombreCompleto}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#6b7280',
                          }}>
                            ID: {user.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#6b7280',
                      }}>
                        <span>📧</span>
                        {user.email}
                      </div>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: `${getRoleBadgeColor(user.role)}15`,
                        color: getRoleBadgeColor(user.role),
                        whiteSpace: 'nowrap',
                      }}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: user.isActive ? '#dcfce7' : '#fee2e2',
                        color: user.isActive ? '#16a34a' : '#dc2626',
                        whiteSpace: 'nowrap',
                      }}>
                        {user.isActive ? '✓ Activo' : '✗ Inactivo'}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{
                        color: '#6b7280',
                        fontSize: '14px',
                      }}>
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Count */}
      {filteredUsers.length > 0 && (
        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px',
        }}>
          Mostrando {filteredUsers.length} de {users.length} usuarios
        </div>
      )}
    </AdminLayout>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '16px',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: '700',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableCellStyle: React.CSSProperties = {
  padding: '16px',
  fontSize: '14px',
};

export default UsersPage;