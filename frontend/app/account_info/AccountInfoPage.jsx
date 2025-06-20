import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { userData } from '../mockdata'

const AccountInfoPage = ({children}) => {

  return (
    <div className="phone-container">
      <div className="phone-container-banner">
        <Image src="/company-name.png" alt="App Logo" width={100} height={100} />
      </div>
      <div className="phone-container-content">
        <h1>Welcome, {userData.name}</h1>
        <Image
          className="assistant-avatar"
          src="/company-logo.png"
          alt="Assistant Avatar"
          width={100}
          height={100}
        ></Image>
        <br />
        <br />
        <br />
        <p><strong>Address:</strong> {userData.address}</p>
        <p><strong>Policy Number:</strong> {userData.policyNumber}</p>
        <button>
          <Link href="/start_claim">Report a Claim</Link>
        </button>
        {children}
      </div>
    </div>
  );
};

export default AccountInfoPage;
