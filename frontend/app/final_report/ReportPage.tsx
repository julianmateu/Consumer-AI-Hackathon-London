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
    timeOfDay: 'Morning',
    location: 'Parking lot',
    numberOfParties: 2,
    additionalInfo: 'The other driver was apologetic and provided their insurance information. The police were called to the scene and a report was filed.',
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
      {/* Damage level and description are editable input fields */}
      <p><strong>Damage Level:</strong> <input type="text" value={reportData.damageLevel} /></p>
      <p><strong>Damage Description:</strong>
      <textarea value={reportData.damageDescription} /></p>
      <p><strong>Time of Day:</strong> <input type="text" value={reportData.timeOfDay}/></p>
      <p><strong>Location:</strong> <input type="text" value={reportData.location}/></p>
      <p><strong>Number of Parties:</strong> <input type="text" value={reportData.numberOfParties}/></p>
      <p><strong>Additional Information:</strong>
      <textarea value={reportData.additionalInfo} /></p>
      <button><Link href={`/submit?vehicle=${params.get('vehicle')}`}>Submit Report</Link></button>
    </div>
  );
};

export default ReportPage;
