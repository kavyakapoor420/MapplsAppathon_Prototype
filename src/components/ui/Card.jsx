import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = true,
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const paddingClasses = padding ? 'p-6' : '';
  const hoverClasses = hover ? 'transition-transform duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  
  const cardClasses = `${baseClasses} ${paddingClasses} ${hoverClasses} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card; 