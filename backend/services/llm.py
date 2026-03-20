from google import genai
from dotenv import load_dotenv

load_dotenv()
# api key automatically gets sent in with the request since it's set in the environment variable
genai_client = genai.Client()

def generate_response(prompt: str, document_chunks: list[str]):
    response = genai_client.models.generate_content(
        model="gemini-3-flash-preview", 
        contents=
        "Here is the reference material:" + "\n\n".join(document_chunks) + 
        "\n\n Here is the prompt:" + prompt
    )
    return response.text

# runs if you run this file directly, just for testing purposes
if __name__ == "__main__":
    print(generate_response("What is the integral of x^2?", []))
