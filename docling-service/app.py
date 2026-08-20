from fastapi import FastAPI, UploadFile, File
from docling.document_converter import DocumentConverter
import tempfile
import os

app = FastAPI();

converter = DocumentConverter()

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/parse")
async def parse_document(file: )