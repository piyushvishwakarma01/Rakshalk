import logging
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = FastAPI()

# ✅ Load API Key Securely
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("GEMINI_API_KEY is missing! Set it in your environment.")

# Initialize Google Generative AI Client
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")  # Updated to use stable model version

# Enable CORS (Allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update to specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define Request Model
class SoilInput(BaseModel):
    ph: float
    moisture: float
    turbidity: float
    location: Optional[str] = None  # Village, City, or State (Optional)

@app.post("/predict")
async def predict(soil_data: SoilInput):
    """
    Takes pH, Moisture, Turbidity, and an optional location for a soil quality prediction.
    Example:
    {
        "ph": 6.5,
        "moisture": 40.0,
        "turbidity": 20.0,
        "location": "Punjab, India"
    }
    """
    try:
        # Format input for Gemini Pro
        input_text = f"""
        Predict soil quality for:
        - pH: {soil_data.ph}
        - Moisture: {soil_data.moisture}%
        - Turbidity: {soil_data.turbidity}%
        - Location: {soil_data.location if soil_data.location else 'India'}
        
        Recommend the best crops suitable for this soil.
        """

        # Generate response from Gemini Pro
        response = model.generate_content(input_text)

        return {"soil_quality": response.text}

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

# Health check endpoint
@app.get("/health")
async def health_check():
    logger.info("Health check endpoint accessed")
    return {"status": "healthy"}

# Main entry point
if __name__ == "__main__":
    host = "0.0.0.0"
    port = 8000
    logger.info(f"Starting server on http://{host}:{port}")
    uvicorn.run("soilquality:app", host=host, port=port, reload=True)