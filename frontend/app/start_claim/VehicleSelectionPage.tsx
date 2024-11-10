import Link from 'next/link';
import React from 'react';
import { vehicles } from '../mockdata';


const VehicleSelectionPage: React.FC = () => {


  return (
    <div className="phone-container">
      <h2>Select a Vehicle</h2>
      <ul>
        {vehicles.map((vehicle, index) => (
          <li key={index}>
            <Link href={`/picture_upload?vehicle=${vehicle.registrationNumber}`}>
                <p><strong>{vehicle.registrationNumber}</strong></p>
                <p>{vehicle.make} {vehicle.model}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleSelectionPage;
