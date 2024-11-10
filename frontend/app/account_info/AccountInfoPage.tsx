import Link from 'next/link';
import React from 'react';
import { userData } from '../mockdata'

const AccountInfoPage: React.FC = () => {

  return (
    <div className="account-info-container">
      <h1>Welcome, {userData.name}</h1>
      <p><strong>Address:</strong> {userData.address}</p>
      <p><strong>Policy Number:</strong> {userData.policyNumber}</p>
      <button>
        <Link href="/start_claim">Report a Claim</Link>
      </button>
    </div>
  );
};

export default AccountInfoPage;
