import { useState, useEffect } from "react";
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

interface ChartData {
  date: string;
  moisture: number;
  ph: number;
  fertility: number;
}

interface Config {
  [key: string]: {
    label: string;
    color: string;
  };
}

const SoilChart: React.FC<{ config: Config }> = ({ config }) => {
  const { sensorData, isLoading, error } = useESPSensorData();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Accumulate new sensor readings into chartData
  useEffect(() => {
    if (sensorData) {
      setChartData((prevData) => [
        ...prevData.slice(-19), // keep only the last 20 readings
        {
          date: new Date().toLocaleTimeString(), // current timestamp
          moisture: sensorData.moisture || 0,
          ph: sensorData.ph || 0,
          fertility: sensorData.tds || 0, // assuming 'tds' represents fertility
        },
      ]);
    }
  }, [sensorData]);

  return (
    <div className="h-[300px]">
      <ChartContainer config={config}>
        {isLoading ? (
          <p>Loading sensor data...</p>
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
              <Area
                type="monotone"
                dataKey="moisture"
                stroke={config.moisture.color}
                fill={config.moisture.color}
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="ph"
                stroke={config.ph.color}
                fill={config.ph.color}
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="fertility"
                stroke={config.fertility.color}
                fill={config.fertility.color}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartContainer>
    </div>
  );
};

export default SoilChart;
