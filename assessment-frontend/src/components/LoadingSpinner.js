import React from 'react';

/**
 * Loading spinner component with optional text
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - Text to display below spinner (optional)
 * @param {string} props.size - Size of the spinner ('small', 'medium', 'large')
 * @param {string} props.color - Color of the spinner
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ 
  text = 'Loading...', 
  size = 'medium',
  color = 'primary'
}) => {
  // Size classes mapping
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-14 h-14 border-4'
  };

  // Color classes mapping
  const colorClasses = {
    primary: 'border-t-indigo-800',
    secondary: 'border-t-gray-500',
    success: 'border-t-emerald-500',
    danger: 'border-t-red-500'
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`rounded-full border-solid border-gray-200 animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}></div>
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;