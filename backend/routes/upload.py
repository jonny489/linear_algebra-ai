from fastapi import APIRouter, UploadFile, File, HTTPException
from pypdf import PdfReader
from io import BytesIO
from services.embeddings import embed_text
from services.vector_store import add_to_db

router = APIRouter()

'''
Plan
1. Validate the uploaded file is a PDF
2. Read the file contents
3. read through the pages of the PDF and extract the text from bytes to a stream
4. Generate an embedding for the file contents using the stream
5. Add the embedding and PDF reader to the vector store
'''

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if ".pdf" not in file.filename:
        raise HTTPException(status_code = 400, detail = "Only PDF files are supported.")
    contents = await file.read() # currently in bytes

    content_stream = BytesIO(contents)
    reader = PdfReader(content_stream)
    
    # loop to extract text page by page, then embed it then store
    for page in reader.pages:
        text = page.extract_text()
        if text is None or len(text.strip()) == 0: # check if text is None or empty after stripping whitespace
            continue
        content_embedding = embed_text(text)
        add_to_db(content_embedding, text, file.filename) # store the embedding, the text, and the file name as the title in the vector database

    return {"message": "File uploaded and processed successfully."}