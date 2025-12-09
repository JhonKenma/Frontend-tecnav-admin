// src/components/layout/AdminLayout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#f3f4f6',
    }}>
      {/* Sidebar */}
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Topbar */}
        <Topbar sidebarCollapsed={sidebarCollapsed} />

        {/* Main Content */}
        <main style={{
          flex: 1,
          marginTop: '70px',
          padding: '32px',
          minHeight: 'calc(100vh - 70px)',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;