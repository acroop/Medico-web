import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSpinner } from 'react-icons/fa';

function Button({
  title,
  onClick,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  textClassName = '',
}) {
  const { theme } = useTheme();

  const baseStyles = {
    primary: `bg-[${theme.primary}] text-white hover:opacity-90`,
    secondary: `bg-[${theme.secondary}] text-white hover:opacity-90`,
    outline: `border-2 border-[${theme.primary}] text-[${theme.primary}] bg-transparent`,
    text: `text-[${theme.primary}] bg-transparent`,
  };

  const sizeStyles = {
    small: 'px-4 py-2 text-sm rounded-md',
    medium: 'px-6 py-3 text-base rounded-lg',
    large: 'px-8 py-4 text-lg rounded-xl',
  };

  const disabledStyles = 'opacity-60 cursor-not-allowed';

  const combinedClass = `
    inline-flex justify-center items-center font-semibold tracking-wide 
    ${baseStyles[type]} 
    ${sizeStyles[size]} 
    ${disabled ? disabledStyles : 'cursor-pointer'}
    ${className}
  `;

  const textColor = type === 'outline' || type === 'text' ? theme.primary : '#fff';

  return (
    <button
      className={combinedClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <FaSpinner className="animate-spin" size={18} color={textColor} />
      ) : (
        <span className={`${textClassName}`}>{title}</span>
      )}
    </button>
  );
}

export default Button;
