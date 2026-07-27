import os
import httpx
from dotenv import load_dotenv

load_dotenv('backend/.env')
gemini_api_key = os.environ.get('GEMINI_API_KEY', '')

url = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_api_key}'
payload = {
    'contents': [{'parts': [{'text': 'who are you?'}]}]
}

response = httpx.post(url, json=payload, timeout=10.0)
if response.status_code != 200:
    print('Error:', response.status_code, response.text)
else:
    print('Success:', response.json())
