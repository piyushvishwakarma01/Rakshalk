import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer } from "../../components/ui/chart";
import { useESPSensorData } from "../../hooks/useSensor";
import { useState, useEffect } from "react";

interface ChartData {
  date: string;
  ph: number;
  turbidity: number;
}

interface Config {
  [key: string]: {
    label: string;
    color: string;
  };
}

const WaterQualityChart: React.FC<{ config: Config }> = ({ config }) => {
  const { sensorData, isLoading, error } = useESPSensorData();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Update the chart data with each new sensor reading
  useEffect(() => {
    if (sensorData) {
      setChartData(prevData => [
        ...prevData.slice(-19), // Keep only the last 20 readings
        {
          date: new Date().toLocaleTimeString(),
          ph: sensorData.ph || 0,
          turbidity: sensorData.tds || 0 // Assuming 'tds' represents turbidity
        }
      ]);
    }
  }, [sensorData]);

  return (
    <div className="h-[300px]">
      <ChartContainer config={config}>
        {isLoading ? (
          <p>Loading water quality data...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis 
                dataKey="date" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip />
              {Object.keys(config).map((key) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={config[key].color}
                  fill={config[key].color}
                  fillOpacity={0.2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </div>
  );
};

export default WaterQualityChart;
