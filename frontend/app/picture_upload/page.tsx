import { Suspense } from "react";
import PhotoUploadPage from "./PhotoUploadPage";

export default function Home() {
  return (
    <Suspense fallback="loading...">
      <PhotoUploadPage></PhotoUploadPage>
    </Suspense>
  );
}
