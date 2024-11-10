

function getLambdaURL() {
    return process.env.LAMBDA_URL || 'http://localhost:8000';
}

function getLambdaAuth() {
    return process.env.LAMBDA_AUTH || 'HELLO';
}



export async function POST(request: Request) {
      try {
        const { image } = await request.json();
  
        // Call your Lambda function
        const response = await fetch(getLambdaURL(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: getLambdaAuth(),
          },
          body: JSON.stringify({ image }),
        });

        console.log("response", response)
  
        const data = await response.json();
  
        if (response.ok) {
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
            return new Response(JSON.stringify({ error: data.error || 'Lambda function error' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
      } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Error calling Lambda function' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
      }
    }
  