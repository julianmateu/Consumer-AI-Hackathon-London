'use server'
 
export async function getAgentId() {
    const agentId = process.env.AGENT_ID;
    return agentId;
}

export async function getSignedUrl() {
    const xiApiKey = process.env.XI_API_KEY;
    if (!xiApiKey) {
        throw new Error('XI_API_KEY is not defined');
    }

    const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${process.env.AGENT_ID}`,
        {
            method: 'GET',
            headers: {
                'xi-api-key': xiApiKey,
            }
        }
    );

    if (!response.ok) {
        throw new Error('Failed to get signed URL');
    }

    return await response.json();
}