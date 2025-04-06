import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AlertTriangle, Droplet, ThermometerIcon, Activity } from "lucide-react";
import WaterQualityChart from "../../components/charts/WaterQualityChart";
import { useESPSensorData } from "../../hooks/useSensor";

const config = {
  ph: { label: "pH Level", color: "#22c55e" },
  turbidity: { label: "Turbidity", color: "#f97316" },
  temperature: { label: "Temperature", color: "#8b5cf6" },
};

const WaterDashboard = () => {
  const { sensorData, isLoading, error } = useESPSensorData();
  // console.log(sensorData);
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Water Quality Dashboard</h1>
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
          <AlertTriangle className="h-5 w-5" />
          <span>1 Quality Alert</span>
        </div>
      </div>

      {/* Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* pH Level Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
            <Droplet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "Loading..." : sensorData?.ph ?? "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Normal range: 6.5-8.5</p>
          </CardContent>
        </Card>

        {/* Turbidity Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
            <Activity className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "Loading..." : sensorData?.tds ?? "N/A"} NTU
            </div>
            <p className="text-xs text-muted-foreground">Below threshold: 5 NTU</p>
          </CardContent>
        </Card>

        {/* Temperature Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <ThermometerIcon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading 
                ? "Loading..." 
                : sensorData?.temperature 
                  ? `${sensorData.temperature}°C` 
                  : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Optimal range: 20-30°C</p>
          </CardContent>
        </Card>
      </div>

      {/* Water Quality Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Water Quality Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <WaterQualityChart config={config} />
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterDashboard;
