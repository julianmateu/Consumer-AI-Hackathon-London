// components/UploadCard.jsx
import React from 'react';

const UploadCard = ({ children }) => {
  return (
    <div className="w-[720px] h-[164px] rounded-lg border-2 border-dashed border-blue-gray-200">
      {children}
    </div>
  );
};

export default UploadCard;
