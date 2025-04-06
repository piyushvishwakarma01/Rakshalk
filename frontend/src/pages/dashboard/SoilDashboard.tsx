import axios from 'axios';
import SoilChart from "../../components/charts/SoilChart";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AlertTriangle, Droplet, Sprout, Wheat } from "lucide-react";
import { useState } from 'react';
import { useESPSensorData } from '../../hooks/useSensor';

const config = {
  moisture: { label: "Moisture Level", color: "#22c55e" },
  ph: { label: "pH Level", color: "#f97316" },
  fertility: { label: "TDS", color: "#8b5cf6" },
};

const SoilDashboard = () => {
  const { sensorData, isLoading, error: sensorError } = useESPSensorData();
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeSoil = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:8000';

      const response = await axios.post('/predict', {
        ph: sensorData?.ph || 0,
        moisture: sensorData?.moisture || 0,
        turbidity: sensorData?.tds || 0,
        location: "India"
      });

      setAnalysisResult(response.data.soil_quality);
      setError(null);
    } catch (error) {
      console.error("Error analyzing soil:", error);
      setError("Failed to analyze soil quality. Please try again.");
      setAnalysisResult(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Soil Quality Dashboard</h1>
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
          <AlertTriangle className="h-5 w-5" />
          <span>1 Quality Alert</span>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Moisture Level</CardTitle>
            <Droplet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "Loading..." : `${sensorData?.moisture || "N/A"}%`}</div>
            <p className="text-xs text-muted-foreground">Optimal range: 30-60%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Sprout className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "Loading..." : sensorData?.ph || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Ideal range: 6.0-7.5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">TDS</CardTitle>
            <Wheat className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "Loading..." : `${sensorData?.tds || "N/A"}`}</div>
            <p className="text-xs text-muted-foreground">ppm</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle>Soil Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <button
            onClick={analyzeSoil}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Fetching Data..." : "Analyze Soil Quality"}
          </button>
          {analysisResult && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-800">
                <strong>Analysis Result:</strong> {analysisResult}
              </p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          {sensorError && (
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-800">Sensor Data Error: {sensorError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Soil Quality Trends Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Soil Quality Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <SoilChart config={config} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SoilDashboard;
