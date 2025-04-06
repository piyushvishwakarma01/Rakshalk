import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface HealthData {
  month: string;
  checkups: number;
  vaccinations: number;
}

interface HealthChartProps {
  data: HealthData[];
  height?: number;
}

const HealthChart: React.FC<HealthChartProps> = ({ data, height = 300 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="checkups" fill="#8884d8" />
        <Bar dataKey="vaccinations" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HealthChart;