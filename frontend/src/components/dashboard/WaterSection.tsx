import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import WaterQualityChart from "../charts/WaterQualityChart"

export function WaterSection() {
  const config = {
    ph: { label: "pH Level", color: "#22c55e" },
    turbidity: { label: "Turbidity", color: "#f97316" },
    temperature: { label: "Temperature", color: "#8b5cf6" },
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <WaterQualityChart config={config} />
      </CardContent>
    </Card>
  )
}

