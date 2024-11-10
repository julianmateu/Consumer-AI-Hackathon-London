import AccountInfoPage from "../account_info/AccountInfoPage";
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <AccountInfoPage></AccountInfoPage>
      <div className="phone-container">
        <div className="phone-container-banner">
          <Image src="/company-name.png" alt="App Logo" width={100} height={100} />
        </div>
        <div className="phone-container-content">
          <h1>Thank you for submitting your claim</h1>
        </div>
      </div>
    </>
  );
}
