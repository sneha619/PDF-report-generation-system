import React from 'react';

/**
 * Button component with various styles and states
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Button type ('button', 'submit', 'reset')
 * @param {string} props.variant - Button variant ('primary', 'secondary', 'success', 'danger', 'outline')
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {Function} props.onClick - Click handler function
 * @param {React.ReactNode} props.children - Button content
 * @returns {JSX.Element} Button component
 */
const Button = ({ 
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
  ...rest
}) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-indigo-800 hover:bg-indigo-900 text-white border-indigo-800',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300',
    success: 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white border-red-500',
    outline: 'bg-transparent hover:bg-indigo-800 text-indigo-800 hover:text-white border-indigo-800'
  };

  // Size styles
  const sizeStyles = {
    sm: 'py-1 px-2 text-sm rounded',
    md: 'py-2 px-4 text-base rounded-md',
    lg: 'py-3 px-6 text-lg rounded-lg'
  };

  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium text-center whitespace-nowrap align-middle select-none border transition-all duration-150 ease-in-out cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-300 active:translate-y-px';
  
  // Combine all classes
  const buttonClasses = [
    baseClasses,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? 'w-full block' : '',
    (disabled || loading) ? 'opacity-65 cursor-not-allowed pointer-events-none' : '',
    loading ? 'text-transparent' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && (
        <span className="absolute w-4 h-4 border-2 border-white/50 rounded-full border-t-white animate-spin top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      )}
      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
};

export default Button;