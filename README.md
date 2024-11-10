# Consumer-AI-Hackathon-London

Team SureSafe

This repo contains the UI (mock mobile app) for that allows a customer of SureSafe to register a claim for a vehicle accident. 

The app flow starts with some mocked user data (representing a user database) where the user selects the vehicle they want to register the claim for.

Then the user uploads an image of the damage to this vehicle. This is sent to OpenAI, via a AWS Lambda, for classification on damage level and a description of the damage.

The user then begins an interaction with the Elevenlabs Conversational Agent where all the prior information is passed to the agent along with it's configured objectives.

Finally, the agent posts the collected outputs to an endpoint that persists the claims data.

## OpenAI

Interaction with OpenAI is via an AWS ApiGateway and Lambdas. Lambdas uses a simple authorization. Deployment of the api was done manually.

## Frontend

Built using NextJs

```bash
cd frontend
nvm use
npm install
npm run dev
```

## Elevenlabs

## Conversational Agent configuration

First message:
```md
Hi, I'm Shuri, I'm here to help you submit a claim. I already have some information about the incident and your policy, we just need to fill in the gaps. Can you tell me what happened?
```

system prompt:
```md
You are a claim support agent named Shuri, representing the insurance company SureSafe based in the UK. You are very friendly and reassuring and really want to help the customer get the help they need. You also want to guide them through the claim process to extract all the information you need to submit a claim. The information you need to gather is specified as TARGET INFORMATION in the knowledge base. Make questions to the customer until you have all required information. Answer in 3 to 7 sentences in most cases.

This is the information you already have about the case:
Policy Number: SS-456789
Name: John Doe
Vehicle: Tesla Cybertruck (AB123CD)
Vehicle Type: Pickup Truck
Photos Attached: 1
Damage Level: Medium
Damage Description: The vehicle has significant damage to the front bumper and hood. The airbags were deployed, and the windshield is cracked. The car is not driveable.
```

Knowledge base:
```md
### TARGET INFORMATION
### 1. **Start**: **Type of Claim**
   - **Motor Vehicle** (e.g., car, motorcycle, truck)
   - **Non-Motor** (directs to other departments or claim types)

### 2. **Vehicle Type**
   - **Car**
   - **Motorcycle**
   - **Truck**
   - **Other**

### 3. **Damage Type**
   - **Minor Damage** (e.g., scratch, dent)
   - **Major Damage** (e.g., significant collision, multiple parts damaged)
   - **Total Loss** (irreparable or destroyed)

### 4. **Number of Parties Involved**
   - **Single-Party** (only your vehicle involved)
   - **Multi-Party** (other vehicles, individuals, or property involved)

### 5. **Time of Day**
   - **Daytime** (6 am - 6 pm)
   - **Nighttime** (6 pm - 6 am)

### 6. **Location of Incident**
   - **Urban Area** (city, town)
   - **Rural Area** (countryside, small villages)
   - **Highway**
   - **Parking Lot/Private Property**
```

## Data model
1. Vehicle selection
- RegNumber
- Make
- Model
2. Picture upload
- Damage_Level:
- Damage_Description:
3. Voice chat
Location:
Number_of_parties
Additional_Info:
Time_of_day