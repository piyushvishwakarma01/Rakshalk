import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Leaf, Upload, AlertCircle, Image as ImageIcon, Info } from "lucide-react";

interface Prediction {
  label: string;
  score: number;
}

interface ApiResponse {
  predictions: Prediction[];
}

const DISEASE_INFO = {
  'Tomato Bacterial Spot': {
    description: 'Bacterial spot is a common disease of tomato caused by Xanthomonas bacteria.',
    treatment: 'Use copper-based fungicides and practice crop rotation.',
    prevention: 'Use disease-free seeds and avoid overhead watering.'
  },
  'Tomato Early Blight': {
    description: 'Early blight is caused by the fungus Alternaria solani.',
    treatment: 'Apply fungicides containing chlorothalonil or mancozeb.',
    prevention: 'Remove infected leaves and maintain proper plant spacing.'
  },
  'Tomato Late Blight': {
    description: 'Late blight is caused by the fungus-like organism Phytophthora infestans.',
    treatment: 'Apply fungicides containing chlorothalonil or copper.',
    prevention: 'Avoid overhead watering and ensure good air circulation.'
  },
  'Tomato Leaf Mold': {
    description: 'Leaf mold is caused by the fungus Passalora fulva.',
    treatment: 'Apply fungicides containing chlorothalonil or mancozeb.',
    prevention: 'Maintain proper plant spacing and ventilation.'
  },
  'Tomato Septoria Leaf Spot': {
    description: 'Septoria leaf spot is caused by the fungus Septoria lycopersici.',
    treatment: 'Remove infected leaves and apply copper-based fungicides.',
    prevention: 'Avoid overhead watering and practice crop rotation.'
  },
  'Tomato Spider Mites': {
    description: 'Spider mites are tiny pests that feed on plant sap.',
    treatment: 'Use miticides or insecticidal soap.',
    prevention: 'Maintain proper humidity and remove affected leaves.'
  },
  'Tomato Target Spot': {
    description: 'Target spot is caused by the fungus Corynespora cassiicola.',
    treatment: 'Apply fungicides containing chlorothalonil or mancozeb.',
    prevention: 'Remove infected leaves and maintain proper spacing.'
  },
  'Tomato Yellow Leaf Curl Virus': {
    description: 'A viral disease transmitted by whiteflies.',
    treatment: 'Remove and destroy infected plants.',
    prevention: 'Control whitefly populations and use resistant varieties.'
  },
  'Tomato Mosaic Virus': {
    description: 'A viral disease that affects tomato plants.',
    treatment: 'Remove and destroy infected plants.',
    prevention: 'Use disease-free seeds and control aphid populations.'
  },
  'Potato Early Blight': {
    description: 'Early blight is caused by the fungus Alternaria solani.',
    treatment: 'Apply fungicides containing chlorothalonil or mancozeb.',
    prevention: 'Practice crop rotation and remove infected leaves.'
  },
  'Potato Late Blight': {
    description: 'Late blight is caused by Phytophthora infestans.',
    treatment: 'Apply fungicides containing chlorothalonil or copper.',
    prevention: 'Use certified disease-free seed potatoes.'
  },
  'Pepper Bell Bacterial Spot': {
    description: 'Bacterial spot is caused by Xanthomonas bacteria.',
    treatment: 'Use copper-based fungicides.',
    prevention: 'Use disease-free seeds and avoid overhead watering.'
  }
};

const HealthDashboard = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPrediction(null);
      setError(null);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await axios.post<ApiResponse>("http://localhost:8001/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      if (response.data.predictions && response.data.predictions.length > 0) {
        const bestPrediction = response.data.predictions[0];
        setPrediction(bestPrediction);
        if (bestPrediction.score <= 0.8) {
          setError("Low confidence in prediction. Please try another image or consult an expert.");
        }
      } else {
        setError("No prediction returned from the server.");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error);
      setError(error.response?.data?.error || "Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDiseaseInfo = (diseaseName: string) => {
    return DISEASE_INFO[diseaseName as keyof typeof DISEASE_INFO] || null;
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Plant Disease Detection</h1>
        <div className="flex items-center gap-2 text-primary bg-primary-50 px-4 py-2 rounded-lg">
          <Leaf className="h-5 w-5" />
          <span>Plant Health Analysis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Upload and Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Plant Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Upload an image of a plant leaf to detect diseases. Supported plants: Tomato, Potato, and Bell Pepper.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg object-contain"
                    />
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedImage(null);
                      }}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Drag and drop an image here, or click to select
                    </p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 cursor-pointer"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </label>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleUpload}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-green-600 transition-colors"
              disabled={!selectedImage || loading}
            >
              <Upload className="h-5 w-5" /> {loading ? "Analyzing..." : "Upload & Analyze"}
            </button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          {prediction && (
            <Card>
              <CardHeader>
                <CardTitle>Disease Detection Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  prediction.label.includes('healthy') 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  <p className="text-lg font-semibold">
                    {prediction.label.includes('healthy') ? (
                      <span>Healthy Plant</span>
                    ) : (
                      <span>Detected Disease: {prediction.label}</span>
                    )}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-gray-500" />
                    <p className="text-sm text-gray-500">
                      Confidence Score: {(prediction.score * 100).toFixed(2)}%
                    </p>
                  </div>
                  
                  {!prediction.label.includes('healthy') && (
                    <div className="mt-4 space-y-4">
                      {getDiseaseInfo(prediction.label) && (
                        <>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Description:</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {getDiseaseInfo(prediction.label)?.description}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Treatment:</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {getDiseaseInfo(prediction.label)?.treatment}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">Prevention:</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {getDiseaseInfo(prediction.label)?.prevention}
                            </p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-700">Recommended Actions:</p>
                        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                          <li>Isolate the affected plant</li>
                          <li>Remove infected leaves</li>
                          <li>Apply appropriate treatment</li>
                          <li>Monitor plant health regularly</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthDashboard;
