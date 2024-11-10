"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { reportData as mockReportData } from '../mockdata'
import { fetchReportData } from './actions';

const ReportPage: React.FC = () => {

  const params = useSearchParams()

  const [reportData, setReportData] = useState<typeof mockReportData | null>(null)

  useEffect(() => {
      console.log('Fetching report data for vehicle:', params.get('vehicle'))
      fetchReportData(params.get('vehicle')||"").then(report => {
        setReportData(report)
      })
  }, [params])

  if (!reportData) {
    return <div>Loading...</div>
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
      <p><strong>Damage Level:</strong> <input type="text" defaultValue={reportData.damageLevel} onChange={() => {/*TODO*/}}/></p>
      <p><strong>Damage Description:</strong>
      <textarea defaultValue={reportData.damageDescription} onChange={() => {/*TODO*/}}/></p>
      <p><strong>Time of Day:</strong> <input type="text" defaultValue={reportData.timeOfDay} onChange={() => {/*TODO*/}}/></p>
      <p><strong>Location:</strong> <input type="text" defaultValue={reportData.location} onChange={() => {/*TODO*/}}/></p>
      <p><strong>Number of Parties:</strong> <input type="text" defaultValue={reportData.numberOfParties} onChange={() => {/*TODO*/}}/></p>
      <p><strong>Additional Information:</strong>
      <textarea defaultValue={reportData.additionalInfo} onChange={() => {/*TODO*/}}/></p>
      <button><Link href={`/submit?vehicle=${params.get('vehicle')}`}>Submit Report</Link></button>
    </div>
  );
};

export default ReportPage;
