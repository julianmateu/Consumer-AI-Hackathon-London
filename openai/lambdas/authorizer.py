import json

def generate_policy(principal_id, effect, resource):
    """Generate an IAM policy"""
    return {
        'principalId': principal_id,
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [
                {
                    'Action': 'execute-api:Invoke',
                    'Effect': effect,
                    'Resource': resource
                }
            ]
        }
    }

def lambda_handler(event, context):
    """Lambda authorizer that checks if Authorization header equals '12345'"""
    try:
        # Retrieve the Authorization header (case-insensitive)
        headers = event.get('headers', {})
        auth_token = headers.get('Authorization') or headers.get('authorization')
        
        print("Received Authorization header:", auth_token)

        # Ensure methodArn exists, defaulting to "*" for testing
        method_arn = event.get('methodArn', '*')
        
        # Check if the token matches our expected value
        if auth_token == 'ILOVESURESAFE':
            # Generate allow policy
            return generate_policy('user', 'Allow', method_arn)
        else:
            # Generate deny policy
            return generate_policy('user', 'Deny', method_arn)
            
    except KeyError as e:
        # Handle missing headers gracefully
        print(f"KeyError: {e}")
        return generate_policy('user', 'Deny', '*')
    
    except Exception as e:
        # Log unexpected errors and deny access
        print(f"Unexpected error: {e}")
        return generate_policy('user', 'Deny', '*')