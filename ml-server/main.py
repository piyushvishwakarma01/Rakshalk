from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
from PIL import Image
import torch
import io

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check if GPU is available
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Load the model on GPU if available
pipe = pipeline("image-classification", model="Jayanth2002/dinov2-base-finetuned-SkinDisease", device=0 if device == "cuda" else -1)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Load the image
    image = Image.open(io.BytesIO(await file.read()))

    # Get predictions (runs on GPU if available)
    predictions = pipe(image)

    return {"predictions": predictions}
