

export const dynamic = 'force-dynamic'

type Report = {
    damage_type: string;
    time_of_day: string;
    number_of_parties: number;
    location: string;
    additional_information: string;
};

import { sql } from "@vercel/postgres";

async function createTableIfNotExists() {
    await sql`
      CREATE TABLE IF NOT EXISTS reports (
        id SERIAL PRIMARY KEY,
        damage_type VARCHAR(255) NOT NULL,
        time_of_day VARCHAR(255) NOT NULL,
        number_of_parties VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        additional_information TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
  }
  

export async function POST(request: Request) {
    // Check headers:
    const headers = new Headers(request.headers);
    if (
      !headers.has('X-Access-key') ||
      headers.get('X-Access-key') !== process.env.ACCESS_KEY
    ) {
      return new Response('Unauthorized', { status: 401 });
    }
  
    // Parse and validate the body
    let body: Report;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Error parsing JSON body:', error);
      return new Response('Invalid JSON body', { status: 400 });
    }
  
    const {
      damage_type,
      time_of_day,
      number_of_parties,
      location,
      additional_information,
    } = body;
  
    if (
      !damage_type ||
      !time_of_day ||
      !number_of_parties ||
      !location ||
      !additional_information
    ) {
      return new Response('Missing required fields', { status: 400 });
    }
  
    // Create the table if it doesn't exist
    await createTableIfNotExists();
  
    // Insert the report into the database
    try {
      await sql`
        INSERT INTO reports (
          damage_type,
          time_of_day,
          number_of_parties,
          location,
          additional_information
        ) VALUES (
          ${damage_type},
          ${time_of_day},
          ${number_of_parties},
          ${location},
          ${additional_information}
        );
      `;
      return new Response('Report submitted', { status: 201 });
    } catch (error) {
      console.error('Error inserting report:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  

export async function GET(request: Request) {
    // Create the table if it doesn't exist
    await createTableIfNotExists();
  
    try {
      const { rows: reports } = await sql`SELECT * FROM reports ORDER BY created_at DESC LIMIT 10;`;
  
      // Return the reports as JSON
      return new Response(JSON.stringify(reports), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
      console.log("request", await request.text())
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  