import AccountInfoPage from "../account_info/AccountInfoPage";

export default function Home() {
  return (
    <>
      <AccountInfoPage></AccountInfoPage>
      <div className="phone-container">
        <div className="phone-container-banner">SureSafe</div>
        <div className="phone-container-content">
          <h1>Thank you for submitting your claim</h1>
        </div>
      </div>
    </>
  );
}
