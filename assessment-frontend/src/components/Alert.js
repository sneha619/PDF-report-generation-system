import React, { useState, useEffect } from 'react';

/**
 * Alert component for displaying messages
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Alert type ('success', 'danger', 'warning', 'info')
 * @param {string} props.message - Alert message
 * @param {boolean} props.dismissible - Whether alert can be dismissed
 * @param {number} props.autoClose - Auto close timeout in ms (0 to disable)
 * @param {Function} props.onClose - Function to call when alert is closed
 * @returns {JSX.Element|null} Alert component or null if closed
 */
const Alert = ({ 
  type = 'info', 
  message, 
  dismissible = true,
  autoClose = 0,
  onClose = () => {}
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Reset visibility when message changes
    setIsVisible(true);
    
    // Auto close alert if autoClose is set
    let timer;
    if (autoClose > 0) {
      timer = setTimeout(() => {
        handleClose();
      }, autoClose);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [message, autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  if (!isVisible || !message) return null;

  // Tailwind classes for different alert types
  const alertStyles = {
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div 
      className={`relative px-5 py-3 mb-4 border border-transparent rounded-md flex justify-between items-center animate-[fadeIn_0.3s_ease-in-out] ${alertStyles[type]}`} 
      role="alert"
    >
      <div className="flex-1">{message}</div>
      {dismissible && (
        <button 
          type="button" 
          className="bg-transparent border-0 text-current text-xl font-bold leading-none opacity-50 ml-3 p-0 hover:opacity-75 transition-opacity" 
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;