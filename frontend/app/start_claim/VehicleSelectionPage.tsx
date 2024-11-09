import Link from 'next/link';
import React from 'react';

interface Vehicle {
  registrationNumber: string;
  make: string;
  model: string;
}

const VehicleSelectionPage: React.FC = () => {
  const vehicles: Vehicle[] = [
    { registrationNumber: 'AB123CD', make: 'Toyota', model: 'Camry' },
    { registrationNumber: 'EF456GH', make: 'Honda', model: 'Civic' },
    { registrationNumber: 'IJ789KL', make: 'Ford', model: 'Focus' },
  ];

  return (
    <div className="vehicle-selection-container">
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
