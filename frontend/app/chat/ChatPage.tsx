"use client";
import React, { useState } from "react";
import { Conversation } from "@11labs/client";
import { getAgentId } from "./actions";
import "./globals.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface Mode {
  mode: string;
}

async function requestMicrophonePermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Immediately stop the tracks to release the microphone
    stream.getTracks().forEach((track) => track.stop());
    return true;
  } catch (error) {
    console.error("Microphone permission denied:", error);
    return false;
  }
}

const ChatWindow: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [speakingStatus, setSpeakingStatus] = useState<Mode>({
    mode: "undefined",
  });
  const params = useSearchParams();

  async function endConversation() {
    if (conversation) {
      await conversation.endSession();
      setConversation(null);
      setIsConnected(false);
    }
    window.location.href = `/final_report?vehicle=${params.get("vehicle")}`;
  }

  async function startConversation() {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        alert("Microphone permission is required for the conversation.");
        return;
      }

      const agentId = await getAgentId();

      const newConversation = await Conversation.startSession({
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
            <p>Shuri, our AI assistant, will help you to complete your claim.</p>
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
