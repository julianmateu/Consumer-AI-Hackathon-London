"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import Image from 'next/image';

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
      <div className="phone-container-banner">
        <Image src="/company-name.png" alt="App Logo" width={100} height={100} />
      </div>
      <div className="phone-container-content">
        <h2>Please attach a photo of the damage to your vehicle</h2>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default PhotoUploadPage;
