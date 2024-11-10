import AccountInfoPage from "../account_info/AccountInfoPage";

export default function Home() {
  return (
    <>
        <AccountInfoPage></AccountInfoPage>
        <div className="thanks-container">
            <h1>Thank you for submitting your claim</h1>
        </div>
    </>
  );
}
