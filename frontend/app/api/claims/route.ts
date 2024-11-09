import { randomUUID } from "crypto";
import { z } from "zod";

const claims: Claim[] = [];

type Claim = {
    id: string;
    userId: string;
    vehicleId: string;
    photoUrls: string[];
    damageLevel: string;
    damageDescription: string;
    timeOfDay: string;
    location: string;
    numberOfParties: number;
    additionalInfo: string;
};

const ClaimSchema = z.object({
    userId: z.string(),
    vehicleId: z.string(),
    photoUrls: z.array(z.string()).optional(),
    damageLevel: z.string().optional(),
    damageDescription: z.string().optional(),
    timeOfDay: z.string().optional(),
    location: z.string().optional(),
    numberOfParties: z.number().optional(),
    additionalInfo: z.string().optional(),
});

type User = {
    id: string;
    name: string;
    email: string;
    policyNumber: string;
    address: string;
    vehicles: string[];
}

const UserSchema = z.object({
    name: z.string(),
    email: z.string(),
    policyNumber: z.string(),
    address: z.string(),
    vehicles: z.array(z.string()),
});

type Vehicle = {
    id: string;
    make: string;
    model: string;
    type: string;
    year: number;
    registrationNumber: string;
}

const VehicleSchema = z.object({
    make: z.string(),
    model: z.string(),
    type: z.string(),
    year: z.number(),
    registrationNumber: z.string(),
});


// endpoint to create a claim
export async function POST(request: Request) {
    try{
        const body = await request.json();
        const claim = {id: randomUUID(), ...body}
        ClaimSchema.parse(claim);
        console.log('Creating claim:', claim);
        claims.push(claim);
        return new Response(JSON.stringify(claim), {
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error('Failed to create claim:', error);
        return new Response(JSON.stringify(error), { status: 400 });
    }
}

// endpoint to get a claim by id
export async function GET(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const claim = claims.find(c => c.id === id);
    if (!claim) {
        return new Response(null, { status: 404 });
    }
    return new Response(JSON.stringify(claim), {
        headers: { "content-type": "application/json" },
    });
}
