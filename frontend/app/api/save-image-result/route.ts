import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic'

async function createTableIfNotExists() {
    await sql`
        CREATE TABLE IF NOT EXISTS results (
            id SERIAL PRIMARY KEY,
            damage_level VARCHAR(255) NOT NULL,
            damage_description TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;
  }

export async function POST(request: Request) {
    try {
      const { Damage_Level, Damage_Description } = await request.json();

      await createTableIfNotExists();

      // Insert data into your database
      await sql`
        INSERT INTO results (damage_level, damage_description)
        VALUES (${Damage_Level}, ${Damage_Description})
      `;

      return new Response(JSON.stringify({ message: 'Result saved successfully' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Error saving result to database' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
}


export async function GET(request: Request) {
    // Create the table if it doesn't exist
    await createTableIfNotExists();
  
    try {
      const { rows: results } = await sql`SELECT * FROM results ORDER BY created_at DESC LIMIT 10;`;
  
      // Return the results as JSON
      return new Response(JSON.stringify(results), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error fetching results:', error);
      console.log("request", await request.text())
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  