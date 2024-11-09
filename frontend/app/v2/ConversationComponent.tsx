"use client";
import { Conversation } from '@11labs/client';
import { useState } from 'react';
import {getSignedUrl, getAgentId} from './actions';


interface Mode {
    mode: string;
}

async function requestMicrophonePermission(): Promise<boolean> {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
    } catch (error) {
        console.error('Microphone permission denied:', error);
        return false;
    }
}

export default function ConversationComponent() {
    const [isConnected, setIsConnected] = useState(false);
    const [conversation, setConversation] = useState<Conversation|null>(null);
    const [speakingStatus, setSpeakingStatus] = useState<Mode>({ mode: 'undefined' });

    async function endConversation() {
        if (conversation) {
            await conversation.endSession();
            setConversation(null);
        }
    }

    async function startConversation() {
        try {
            const hasPermission = await requestMicrophonePermission();
            if (!hasPermission) {
                alert('Microphone permission is required for the conversation.');
                return;
            }

            // const signedUrl = await getSignedUrl();
            // console.log('Signed URL:', signedUrl);
            const agentId = await getAgentId(); // Uncomment if using agent ID

            const newConversation = await Conversation.startSession({
                // signedUrl: signedUrl,
                agentId: agentId, // Use this if you have an agent ID
                
                onConnect: () => {
                    console.log('Connected');
                    setIsConnected(true);
                },
                onDisconnect: () => {
                    console.log('Disconnected');
                    setIsConnected(false);
                    setSpeakingStatus({ mode: 'listening' }); // Reset to listening mode on disconnect
                },
                onError: (error) => {
                    console.error('Conversation error:', error);
                    alert('An error occurred during the conversation.');
                },
                onModeChange: (mode) => {
                    console.log('Mode changed:', mode); // Debug log to see exact mode object
                    setSpeakingStatus(mode);
                },
            });

            setConversation(newConversation);
        } catch (error) {
            console.error('Error starting conversation:', error);
            alert('Failed to start conversation. Please try again.');
        }
    }

    return (
        <div className="container">
            <h1>ElevenLabs Conversational AI Demo</h1>
            <div className="status-container">
                <div id="connectionStatus" className="status">
                    {isConnected ? 'Connected' : 'Disconnected'}
                </div>
                <div id="speakingStatus" className="speaking-status">
                    {speakingStatus?.mode === 'speaking' ? 'Agent Speaking' : 'Agent Silent'}
                </div>
            </div>
            <div className="controls">
                <button
                    id="startButton"
                    className="button"
                    disabled={isConnected}
                    onClick={startConversation}
                >
                    Start Conversation
                </button>
                <button
                    id="endButton"
                    className="button"
                    disabled={!isConnected}
                    onClick={endConversation}
                >
                    End Conversation
                </button>
            </div>
        </div>
    );
}
