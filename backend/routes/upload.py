from fastapi import APIRouter, UploadFile, File, HTTPException

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

    return file_contents