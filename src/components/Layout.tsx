// components/Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="relative">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Hamburger Button */}
      <div className={`${sidebarOpen ? 'opacity-0 pointer-events-none' : ''}`}>
        <button
  onClick={() => setSidebarOpen(true)}
  className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition duration-300"
  style={{
    backgroundColor: theme.accent,
    color: theme.buttonText,
  }}
>
  ☰
</button>

      </div>

      {/* Main Content with Blur when sidebar is open */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'blur-sm' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
