"use client";
import { Conversation } from '@11labs/client';
import { getAgentId, getSignedUrl } from '@/app/actions'
import { useState } from 'react';

async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        return true;
    } catch (error) {
        console.error('Microphone permission denied:', error);
        return false;
    }
}


// function updateSpeakingStatus(mode) {
//     const statusElement = document.getElementById('speakingStatus');
//     // Update based on the exact mode string we receive
//     const isSpeaking = mode.mode === 'speaking';
//     statusElement.textContent = isSpeaking ? 'Agent Speaking' : 'Agent Silent';
//     statusElement.classList.toggle('speaking', isSpeaking);
//     console.log('Speaking status updated:', { mode, isSpeaking }); // Debug log
// }





export default function ConversationComponent() {

    const [isConnected, setIsConnected] = useState(false);
    const [conversation, setConversation] = useState(null);
    const [speakingStatus, setSpeakingStatus] = useState({ mode: 'undefined'});

    async function endConversation() {
        if (conversation) {
            await conversation.endSession();
            conversation = null;
        }
    }

    function startConversation() {
        try {
            const hasPermission = await requestMicrophonePermission();
            if (!hasPermission) {
                alert('Microphone permission is required for the conversation.');
                return;
            }
    
            const signedUrl = await getSignedUrl();
            //const agentId = await getAgentId(); // You can switch to agentID for public agents
            
            conversation = await Conversation.startSession({
                signedUrl: signedUrl,
                //agentId: agentId, // You can switch to agentID for public agents
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
                }
            });
            setConversation(conversation);
        } catch (error) {
            console.error('Error starting conversation:', error);
            alert('Failed to start conversation. Please try again.');
        }
    }


    return (
        <div className="container">
        <h1>ElevenLabs Conversational AI Demo</h1>
        <div className="status-container">
            <div id="connectionStatus" className="status">{isConnected ? 'Connected' : 'Disconnected'}</div>
            <div id="speakingStatus" className="speaking-status">{speakingStatus?.mode === 'speaking' ? 'Agent Speaking' : 'Agent Silent'}</div>
        </div>
        <div className="controls">
            <button id="startButton" className="button" disabled={isConnected} onClick={startConversation}>Start Conversation</button>
            <button id="endButton" className="button" disabled={!isConnected} onClick={endConversation}>End Conversation</button>
        </div>
    </div>
    );
}