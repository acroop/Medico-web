import React from 'react';
import { IoDocumentTextOutline } from 'react-icons/io5'; // fallback icon
import { useTheme } from '../context/ThemeContext';
import { IconContext } from 'react-icons';
import * as Icons from 'react-icons/io5'; // Ionicons as Io*

function Card({ title, subtitle, onClick, icon, children, className = '', footer }) {
  const { theme, isDark } = useTheme();

  // Dynamically get icon component
  const IconComponent = icon ? Icons[`Io${icon.charAt(0).toUpperCase() + icon.slice(1)}`] : null;

  const cardStyle = {
    backgroundColor: isDark ? '#2a2a2a' : '#fff', // ⬅ Matches screenshot
    borderColor: theme.border,
    color: theme.text,
    borderRadius: '16px',
    padding: '20px',
    margin: '12px 0',
    boxShadow: isDark
      ? '0 4px 12px rgba(0, 0, 0, 0.4)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderWidth: '1px',
    borderStyle: 'solid',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  };

  const iconContainerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    backgroundColor: theme.primary + '15',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
  };

  const titleStyle = {
    fontSize: '1.125rem',
    fontWeight: 600,
    margin: 0,
    color: theme.text,
  };

  const subtitleStyle = {
    fontSize: '0.875rem',
    marginTop: '4px',
    color: theme.textSecondary,
  };

  const content = (
    <div className={className} style={cardStyle}>
      {(title || IconComponent) && (
        <div style={headerStyle}>
          {IconComponent && (
            <div style={iconContainerStyle}>
              <IconContext.Provider value={{ color: theme.primary, size: '22px' }}>
                <IconComponent />
              </IconContext.Provider>
            </div>
          )}
          <div style={{ flex: 1 }}>
            {title && <h2 style={titleStyle}>{title}</h2>}
            {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
          </div>
        </div>
      )}

      <div style={{ marginTop: 4 }}>{children}</div>

      {footer && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${isDark ? '#444' : '#ccc'}` }}>
          {footer}
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer transition duration-150 hover:shadow-lg"
      >
        {content}
      </div>
    );
  }

  return content;
}

export default Card;
