// components/Header.jsx
import React from 'react';

const Header = ({ children }) => {
  return (
    <div className="w-full min-h-[909px] bg-cyan-50/70 shadow-md">
      {children}
    </div>
  );
};

export default Header;