import json
import os
import requests

def lambda_handler(event, context):
    try:
        # Parse request body
        body = json.loads(event['body'])
        
        # Get base64 image from request
        base64_image = body.get('image')
        if not base64_image:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No image provided in request'})
            }
            
        OPEN_AI_KEY = 'REDACTED!!!!'
        
        # Prepare headers and payload for OpenAI API
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPEN_AI_KEY}"
        }
        
        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "gpt-4o-mini",
                    "content": [
                        {
                            "type": "text",
                            "text": "Describe this image with respect to an insurance claim"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 300
        }
        
        # Make request to OpenAI
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload
        )
        
        # Return response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'  # Enable CORS
            },
            'body': json.dumps(response.json())
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }