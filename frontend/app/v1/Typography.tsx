// components/Typography.jsx
import React from 'react';

const Typography = ({ variant = 'body1', children, className = '' }) => {
  const variants = {
    h1: 'text-4xl font-bold text-gray-900 leading-10',
    h2: 'text-xl font-medium text-gray-900 leading-7',
    body1: 'text-lg text-gray-600 leading-7',
    caption: 'text-sm text-gray-400 leading-5'
  };

  return (
    <div className={`font-['Palanquin'] ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};


export default Typography;