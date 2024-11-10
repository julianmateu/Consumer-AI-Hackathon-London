import { Suspense } from "react";
import ReportPage from "./ReportPage";

export default function Home() {
  return (
    <Suspense fallback="loading...">
      <ReportPage></ReportPage>
    </Suspense>
  );
}
