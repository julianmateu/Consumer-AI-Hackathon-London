import json
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
            
        OPEN_AI_KEY = 'REDACTED!!!'
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {OPEN_AI_KEY}"
        }
        

        system_prompt = """You are an AI trained to assess vehicle damage from images. 
        Analyze the image and provide a response in the following JSON structure:
        {
            "Damage_Level": "Low|Medium|High",
            "Damage_Description": "A concise description of visible damage"
        }
        
        Guidelines:
        - Damage_Level should be exactly one of: Low, Medium, High
        - Low: Minor scratches, small dents, or cosmetic damage
        - Medium: Multiple dents, visible body damage, broken lights
        - High: Severe structural damage, multiple panels affected, airbag deployment
        - Damage_Description should be a single paragraph under 100 words
        - Focus only on visible damage in the image
        
        Provide ONLY the JSON response with no additional text."""

        payload = {
            "model": "gpt-4o-mini",
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 300,
            "response_format": { "type": "json_object" }  # Ensure JSON response
        }
        
        # Make request to OpenAI
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload
        )
        
        # Parse OpenAI response to ensure it matches our structure
        ai_response = response.json()
        if 'choices' in ai_response and len(ai_response['choices']) > 0:
            content = json.loads(ai_response['choices'][0]['message']['content'])
            
            # Validate response structure
            if not all(key in content for key in ['Damage_Level', 'Damage_Description']):
                raise ValueError("Invalid response structure from OpenAI")
            
            if content['Damage_Level'] not in ['Low', 'Medium', 'High']:
                raise ValueError("Invalid damage level value")
            
            # Return formatted response
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(content)
            }
        else:
            raise ValueError("Invalid response from OpenAI")
            
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }