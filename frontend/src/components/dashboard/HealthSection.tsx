import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import HealthChart from "../charts/HealthChart"

export function HealthSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <HealthChart />
      </CardContent>
    </Card>
  )
}

