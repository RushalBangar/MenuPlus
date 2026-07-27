import os
import httpx
from dotenv import load_dotenv

load_dotenv('backend/.env')
gemini_api_key = os.environ.get('GEMINI_API_KEY', '')

url = f'https://generativelanguage.googleapis.com/v1beta/models?key={gemini_api_key}'
response = httpx.get(url)
models = response.json().get('models', [])
for m in models:
    print(m['name'])
