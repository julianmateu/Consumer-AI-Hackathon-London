import os
import base64
import pyperclip

def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')


minor_image_path = "resources/crash_pic_minor.jpeg"
image_path = "resources/crash.png"

base64_image = encode_image(image_path)

# Copy to clipboard
pyperclip.copy(base64_image)

print("BASE64 copied to clipboard")