"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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

  return (
    <div className="report-page-container">
      <h2>Claim Report Summary</h2>
      <p><strong>Policy Number:</strong> {reportData.policyNumber}</p>
      <p><strong>Name:</strong> {reportData.userName}</p>
      <p><strong>Vehicle:</strong> {reportData.vehicle}</p>
      <p><strong>Vehicle Type:</strong> {reportData.vehicleType}</p>
      <p><strong>Photos Attached:</strong> {reportData.photosAttached}</p>
      <p><Image src={reportData.pohtoUrl} alt="photo" width={100} height={100}></Image></p>
      <p><strong>Damage Level:</strong> <input type="text" value={reportData.damageLevel} onChange={() => {/*TODO*/}}/></p>
      <p><strong>Damage Description:</strong>
      <textarea value={reportData.damageDescription} onChange={() => {/*TODO*/}}/></p>
      <button><Link href={`/chat?vehicle=${params.get('vehicle')}`}>Chat about your claim</Link></button>
    </div>
  );
};

export default ReportPage;
