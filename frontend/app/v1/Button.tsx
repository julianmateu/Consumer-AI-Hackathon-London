// components/Button.jsx
import React from 'react';

const Button = ({ variant = 'primary', children, onClick }) => {
  const variants = {
    primary: 'w-48 h-14 rounded-full shadow-lg bg-blue-600 text-white text-xl font-semibold',
    delete: 'w-6 h-6 rounded-full bg-red-600 text-white text-base'
  };

  return (
    <button
      className={`px-2 border-0 outline-none cursor-pointer font-['Palanquin'] ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;