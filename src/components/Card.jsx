import React from 'react';
import { IoDocumentTextOutline } from 'react-icons/io5'; // fallback icon
import { useTheme } from '../context/ThemeContext';
import { IconContext } from 'react-icons';
import * as Icons from 'react-icons/io5'; // Ionicons as Io*

function Card({ title, subtitle, onClick, icon, children, className = '', footer }) {
  const { theme } = useTheme();

  const IconComponent = icon ? Icons[`Io${icon.charAt(0).toUpperCase() + icon.slice(1)}`] : null;

  const cardClasses = `
    rounded-xl border p-5 shadow-md my-3 
    bg-[${theme.card}] border-[${theme.border}] text-[${theme.text}]
    ${className}
  `;

  const content = (
    <div className={cardClasses}>
      {(title || IconComponent) && (
        <div className="flex items-center mb-4">
          {IconComponent && (
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                 style={{ backgroundColor: theme.primary + '15' }}>
              <IconContext.Provider value={{ color: theme.primary, size: '20px' }}>
                <IconComponent />
              </IconContext.Provider>
            </div>
          )}
          <div className="flex-1">
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="mt-1">{children}</div>

      {footer && <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">{footer}</div>}
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="cursor-pointer hover:shadow-lg transition duration-150">
        {content}
      </div>
    );
  }

  return content;
}

export default Card;
