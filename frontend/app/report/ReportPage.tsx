"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation'

const ReportPage: React.FC = () => {
  // Dummy data for illustration
  const reportData = {
    policyNumber: 'SS-456789',
    userName: 'John Doe',
    vehicle: 'Toyota Camry (AB123CD)',
    vehicleType: 'Sedan',
    photosAttached: 1,
    pohtoUrl: '/crash_pic.png',
    status: 'Submitted',
    damageLevel: 'Medium',
    damageDescription: 'The vehicle was parked in the parking lot when another car backed into it. The rear bumper was damaged and the tail light was broken. The car was not driveable after the accident.',
  };

  const params = useSearchParams()
  const vehicle = params.get('vehicle');
  const [claimId, setClaimId] = useState<string | null>(null);

  useEffect(() => {
    // Call an API to create a new claim and get the claim ID
    const createClaim = async () => {
      try {
        const response = await fetch('/api/claim', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            vehicle,
            ...reportData,
          }),
        });
        if (response.ok) {
          const data = await response.json();
          setClaimId(data.claimId);
        } else {
          throw new Error('Failed to create claim');
        }
      } catch (error) {
        console.error('Error creating claim:', error);
      }
    };

    createClaim();
  }

  return (
    <div className="report-page-container">
      <h2>Claim Report Summary</h2>
      <p><strong>Policy Number:</strong> {reportData.policyNumber}</p>
      <p><strong>Name:</strong> {reportData.userName}</p>
      <p><strong>Vehicle:</strong> {reportData.vehicle}</p>
      <p><strong>Vehicle Type:</strong> {reportData.vehicleType}</p>
      <p><strong>Photos Attached:</strong> {reportData.photosAttached}</p>
      <p><Image src={reportData.pohtoUrl} alt="photo" width={100} height={100}></Image></p>
      {/* Damage level and description are editable input fields */}
      <p><strong>Damage Level:</strong> <input type="text" value={reportData.damageLevel} /></p>
      <p><strong>Damage Description:</strong>
      <textarea value={reportData.damageDescription} /></p>
      {/* <p><strong>Status:</strong> {reportData.status}</p> */}
      {/* <elevenlabs-convai agent-id="iH8dikTVBkHmQE2er9lj"></elevenlabs-convai> */}
      <button><Link href={`/chat?vehicle=${vehicle}`}>Chat about your claim</Link></button>
    </div>
  );
};

export default ReportPage;
