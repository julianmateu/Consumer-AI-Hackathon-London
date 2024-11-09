// components/ImagePreview.jsx
import React from 'react';

const ImagePreview = ({ src = '/api/placeholder/100/100' }) => {
  return (
    <div
      className="w-[100px] h-[100px] rounded-md bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${src})` }}
    />
  );
};

export default ImagePreview;