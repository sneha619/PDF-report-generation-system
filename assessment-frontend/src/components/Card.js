import React from 'react';

/**
 * Card component for displaying content in a container
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Card title (optional)
 * @param {React.ReactNode} props.footer - Card footer content (optional)
 * @param {boolean} props.hoverable - Whether card should have hover effect
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Card component
 */
const Card = ({ 
  children, 
  title, 
  footer,
  hoverable = false,
  variant,
  className = '',
  ...rest
 }) => {
  // Variant styles
  const variantStyles = {
    primary: 'border-t-4 border-t-indigo-800',
    success: 'border-t-4 border-t-emerald-500',
    warning: 'border-t-4 border-t-amber-500',
    danger: 'border-t-4 border-t-red-500'
  };

  // Base classes
  const baseClasses = 'bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300';
  
  // Combine all classes
  const cardClasses = [
    baseClasses,
    hoverable ? 'hover:shadow-lg hover:-translate-y-1' : '',
    variant ? variantStyles[variant] : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...rest}>
      {title && <div className="px-6 py-5 border-b border-gray-200 font-semibold text-lg text-blue-900 md:px-6 sm:px-4">{title}</div>}
      <div className="p-6 md:p-6 sm:p-4">{children}</div>
      {footer && <div className="px-6 py-5 border-t border-gray-200 bg-gray-50 md:px-6 sm:px-4">{footer}</div>}
    </div>
  );
};

export default Card;