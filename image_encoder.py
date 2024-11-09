import os
import base64
import pyperclip

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "resources/crash_pic.png"

# Getting the base64 string
base64_image = encode_image(image_path)


pyperclip.copy(base64_image)

print("BASE64 copied to clipboard")