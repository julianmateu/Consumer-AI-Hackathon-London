'use server'
 
export async function getAgentId(): Promise<string> {
    console.log('Getting agent ID');
    const agentId = process.env.AGENT_ID;
    if (!agentId) {
        throw new Error('AGENT_ID is not defined');
    }
    return agentId;
}
