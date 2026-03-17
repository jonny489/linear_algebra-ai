from fastapi import APIRouter, UploadFile, File, HTTPException
from services.embeddings import embed_text
from services.vector_store import add_to_db

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if ".pdf" not in file.filename:
        raise HTTPException(status_code = 400, detail = "Only PDF files are supported.")
    contents = await file.read()

    file_contents = {
        "filename" : file.filename,
        "message" : contents
    }

    content_embedding = embed_text(contents.decode("utf-8"))
    file_contents["embedding"] = content_embedding
    
    add_to_db(content_embedding, file_contents["filename"])

    return file_contents