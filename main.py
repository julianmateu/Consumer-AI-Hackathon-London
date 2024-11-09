import os
from utils import logger
from dotenv import load_dotenv

load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

def main():
    logger.info("ELEVEN_LABS_API_KEY: " + ELEVENLABS_API_KEY)

if __name__ == "__main__":
    main()