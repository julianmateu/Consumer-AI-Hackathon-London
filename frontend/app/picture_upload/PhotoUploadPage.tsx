"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'

const PhotoUploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const params = useSearchParams()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = () => {
    // Logic to handle file upload and navigate to ReportPage
    console.log('Files selected:', selectedFiles);
    
    // redirect to the next page
    window.location.href = `/report?vehicle=${params.get('vehicle')}`;
  };

  return (
    <div className="phone-container">
      <h2>Attach Photos</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default PhotoUploadPage;
