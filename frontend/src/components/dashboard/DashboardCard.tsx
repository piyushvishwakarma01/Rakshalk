import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface DashboardCardProps {
  title: string
  value: string
  change: {
    value: string
    isPositive: boolean
  }
}

export function DashboardCard({ title, value, change }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {change.isPositive ? (
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        ) : (
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change.value} from last month</p>
      </CardContent>
    </Card>
  )
}

