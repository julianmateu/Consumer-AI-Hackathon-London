"use client";
import React, { useState } from "react";
import { Conversation } from "@11labs/client";
import { getSignedUrl, getAgentId } from "./actions";
import "./globals.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// import { useRecord } from 'react-device-permission';

interface Mode {
  mode: string;
}

async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Immediately stop the tracks to release the microphone
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error("Microphone permission denied:", error);
    return false;
  }
}

// async function requestMicrophonePermission(): Promise<boolean> {
//   try {
//     // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     // Immediately stop the tracks to release the microphone
//     // stream.getTracks().forEach(track => track.stop());

//     if (typeof navigator === "undefined") {
//       alert("Navigator is not available. Please use a compatible browser.");
//       return false;
//     }

//     if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//       alert(
//         "Your browser does not support accessing the microphone. Please use a different browser."
//       );
//       return false;
//     }

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     stream.getTracks().forEach((track) => track.stop());

//     return true;
//   } catch (error) {
//     console.error("Microphone permission denied:", error);
//     return false;
//   }
// }

// async function requestMicrophonePermission(): Promise<boolean> {
//   try {
//     const getUserMedia =
//       navigator.mediaDevices?.getUserMedia ||
//       navigator.getUserMedia ||
//       navigator.webkitGetUserMedia ||
//       navigator.mozGetUserMedia;

//     if (!getUserMedia) {
//       alert(
//         "Your browser does not support accessing the microphone. Please use Safari on iOS 11 or later."
//       );
//       return false;
//     }

//     const stream = await getUserMedia.call(
//       navigator.mediaDevices || navigator,
//       { audio: true }
//     );

//     // Immediately stop all tracks to release the microphone
//     stream.getTracks().forEach((track) => track.stop());

//     return true;
//   } catch (error) {
//     console.error("Microphone permission denied or error occurred:", error);
//     alert(
//       "Failed to access the microphone. Please check your device settings."
//     );
//     return false;
//   }
// }

const ChatWindow: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [speakingStatus, setSpeakingStatus] = useState<Mode>({
    mode: "undefined",
  });
  const params = useSearchParams();
//   const { startRecording, stopRecording, recordSrc, fileNameWithExtension, errors } = useRecord('audio', 'my-video');

  async function endConversation() {
    if (conversation) {
      await conversation.endSession();
      setConversation(null);
      setIsConnected(false);
    }
    window.location.href = `/final_report?vehicle=${params.get("vehicle")}`;
  }

//   async function requestMicrophonePermission() {
//     startRecording();
//     stopRecording();
//   }

  async function startConversation() {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        alert("Microphone permission is required for the conversation.");
        return;
      }
    // await requestMicrophonePermission();

      // Uncomment and use the appropriate method for your implementation
      // const signedUrl = await getSignedUrl();
      const agentId = await getAgentId();

      const newConversation = await Conversation.startSession({
        // signedUrl: signedUrl,
        agentId: agentId,
        // TODO: add prompt whenever it's implemented so we can submit the information we have so far.
        onConnect: () => {
          console.log("Connected");
          setIsConnected(true);
        },
        onDisconnect: () => {
          console.log("Disconnected");
          setIsConnected(false);
          setSpeakingStatus({ mode: "undefined" });
        },
        onError: (error) => {
          console.error("Conversation error:", error);
          alert("An error occurred during the conversation.");
        },
        onModeChange: (mode) => {
          console.log("Mode changed:", mode);
          setSpeakingStatus(mode);
        },
      });

      setConversation(newConversation);
    } catch (error) {
      console.error("Error starting conversation:", error);
      alert("Failed to start conversation. Please try again.");
    }
  }

  return (
    <div className="chat-window-container">
      <div className="chat-header">
        <Image
          className="assistant-avatar"
          src="/shuri.webp"
          alt="Assistant Avatar"
          width={100}
          height={100}
        ></Image>
        <div className="status-indicators">
          <div
            className={`status ${isConnected ? "connected" : "disconnected"}`}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </div>
          <div className={`speaking-status ${speakingStatus.mode}`}>
            {speakingStatus.mode === "speaking"
              ? "Agent Speaking"
              : "Agent Silent"}
          </div>
        </div>
      </div>
      <div className="chat-controls">
        <button
          className="button start-button"
          disabled={isConnected}
          onClick={startConversation}
        >
          Start Conversation
        </button>
        <button
          className="button end-button"
          disabled={!isConnected}
          onClick={endConversation}
        >
          End Conversation
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
