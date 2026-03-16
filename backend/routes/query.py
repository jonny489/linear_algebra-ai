from fastapi import APIRouter
from models.schemas import QueryRequest, QueryResponse

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
async def query(request: QueryRequest):
    response = QueryResponse (
        answer = "test answer",
        sources = []
    )
    return response