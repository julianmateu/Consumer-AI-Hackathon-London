"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const PhotoUploadPage = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File|null>(null);
  const params = useSearchParams();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e = e as unknown as typeof e & { target: {files: []} };
    if (!e.target.files) {
      setFile(null);
    } else if  (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!file) {
      alert("Please select an image file");
      return;
    }
  
    // Read file and convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onloadend = async () => {
      setLoading(true); // Start loading
      
      const base64Image = (reader.result as string)?.split(",")[1]; // Remove data URL prefix
  
      try {
        const response = await fetch("/api/upload-image", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64Image }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Persist data using @vercel/sql
          const response2 = await fetch("/api/save-image-result", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
  
          const data2 = await response2.json();
  
          if (!response2.ok) {
            console.error(data2.error);
            alert("Error: " + data2.error);
            return;
          }
  
          const nextPage = `/report?vehicle=${params.get("vehicle")}`;
  
          // redirect to the next page
          window.location.href = nextPage;
        } else {
          console.error(data.error);
          alert("Error: " + data.error);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred while processing the image.");
      } finally {
        // Ensure loading is always stopped after try/catch
        setLoading(false);
      }
    };
  };

  return (
    <div className="phone-container">
      <div className="phone-container-banner">
        <Image
          src="/company-name.png"
          alt="App Logo"
          width={100}
          height={100}
        />
      </div>
      <div className="phone-container-content photo-upload-container">
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}
        
        {!loading && (
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <button type="submit">Upload Image</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadPage;
