import chromadb
import uuid

client = chromadb.Client()

collection = client.get_or_create_collection(name="documents")

# adds to the vector database, takes in the embedding and the original document text
def add_to_db(embedding, document, document_title):
    collection.add(
        ids=[str(uuid.uuid4())], 
        documents=[document],
        metadatas=[{"title": document_title}], 
        embeddings=[embedding])

# looks up the vector database, takes in the embedding and returns the most relevant documents based on similarity
def lookup_db(embedding, n_results=5):
    return collection.query(query_embeddings=[embedding], n_results=n_results)

