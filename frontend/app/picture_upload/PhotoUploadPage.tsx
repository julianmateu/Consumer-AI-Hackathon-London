"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const PhotoUploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const params = useSearchParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Please select files to upload.');
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/picture_upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Redirect to the next page
        window.location.href = `/report?vehicle=${params.get('vehicle')}`;
      } else {
        const errorData = await response.json();
        alert(`Upload failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('An error occurred while uploading the files.');
    }
  };

  return (
    <div className="photo-upload-container">
      <h2>Attach Photos</h2>
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default PhotoUploadPage;
