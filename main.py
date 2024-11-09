import os
from utils import logger
from dotenv import load_dotenv

from elevenlabs import play
from elevenlabs.client import ElevenLabs


load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

elevenlabs_client = ElevenLabs(
  api_key=ELEVENLABS_API_KEY
)

def main():
    response = elevenlabs_client.voices.get_all()
    # audio = elevenlabs_client.generate(text="Hello there!", voice=response.voices[0])
    logger.info(response.voices)

if __name__ == "__main__":
    main()