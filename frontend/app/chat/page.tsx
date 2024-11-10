import { Suspense } from "react";
import ChatPage from "./ChatPage";

export default function Home() {
  return (
    <Suspense fallback="loading...">
        <ChatPage></ChatPage>\
    </Suspense>
  );
}
