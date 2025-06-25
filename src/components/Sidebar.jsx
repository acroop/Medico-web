import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiX, FiSettings, FiUser } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const menuItems = [
  { label: 'Home', route: '/' },
  { label: 'Period Tracker', route: '/period-tracker' },
  { label: 'PCOS Management', route: '/pcos-management' },
  { label: 'Pregnancy Tracker', route: '/pregnancy-tracker' },
  { label: 'Breast Cancer Awareness', route: '/breast-cancer-awareness' },
  { label: 'Medical Records', route: '/medical-history' },
  { label: 'MediDocs', route: '/medidocs' },
  { label: 'Consult a Doctor', route: '/consult-doctor' },
];

const Sidebar = ({ open, setOpen }) => {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <>
      {/* Overlay (click to close sidebar) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: theme.card, color: theme.text }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-4 py-3 border-b"
          style={{ borderColor: theme.border }}
        >
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setOpen(false)} style={{ color: theme.text }}>
            <FiX size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-4 space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.route}
              to={item.route}
              onClick={() => setOpen(false)}
              className={`block px-2 py-1 rounded hover:opacity-80 ${
                location.pathname === item.route ? 'font-bold' : ''
              }`}
              style={{ color: theme.text }}
            >
              {item.label}
            </Link>
          ))}
          <hr className="my-3" style={{ borderColor: theme.border }} />
          <Link to="/profile" className="flex items-center space-x-2 px-2 py-1 rounded hover:opacity-80" style={{ color: theme.text }} onClick={() => setOpen(false)}>
            <FiUser size={18} />
            <span>Profile</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 px-2 py-1 rounded hover:opacity-80" style={{ color: theme.text }} onClick={() => setOpen(false)}>
            <FiSettings size={18} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
