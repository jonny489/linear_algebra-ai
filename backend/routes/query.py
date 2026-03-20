from fastapi import APIRouter
from services.llm import generate_response
from services.vector_store import lookup_db
from services.embeddings import embed_text
from models.schemas import QueryRequest, QueryResponse

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):

    question_embedding = embed_text(request.question)
    relevant_documents = lookup_db(question_embedding)
    document_text = relevant_documents["documents"][0] # get the document texts from the retrieved documents
    document_metadata = relevant_documents["metadatas"][0] # get the file names from the metadata of the retrieved documents

    document_titles = [metadata["title"] for metadata in document_metadata] # extract the file names from the metadata
    response = QueryResponse (
        answer = generate_response(request.question, document_text),
        sources = set(document_titles)   # list file names
    )
    return response