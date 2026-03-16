'''
Goal of this script is to handle all the embedding related logic, 
such as generating embeddings for uploaded documents and 
storing them in the vector database. 
This will be used by the query logic to retrieve 
relevant information based on user queries.
'''

from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv
import os

load_dotenv()
embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview", api_key=os.getenv("GEMINI_API_KEY"))
def embed_text(text: str):
    return embeddings.embed_query(text)