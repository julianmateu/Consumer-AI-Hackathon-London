'use server'
 
export async function getAgentId(): Promise<string> {
    console.log('Getting agent ID');
    const agentId = process.env.AGENT_ID;
    if (!agentId) {
        throw new Error('AGENT_ID is not defined');
    }
    return agentId;
}

export async function getSignedUrl(): Promise<string> {
    console.log('Getting signed URL');
    const xiApiKey = process.env.XI_API_KEY;
    console.log('XI_API_KEY:', xiApiKey);
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

    const res = await response.json();
    console.log('Response:', res);

    return res.signed_url;
}