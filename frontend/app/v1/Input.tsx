// components/Input.jsx
import React from 'react';

const Input = ({ placeholder = 'Enter VRN' }) => {
  return (
    <input
      className="w-[480px] h-[60px] px-2 rounded-lg shadow-sm bg-white text-slate-400 text-lg font-light leading-[60px] outline-none font-['Palanquin']"
      placeholder={placeholder}
    />
  );
};

export default Input;