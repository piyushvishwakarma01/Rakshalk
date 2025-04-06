
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Cloud, Leaf, Thermometer } from "lucide-react";

const ClimateDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Climate Action</h1>
        <div className="flex items-center gap-2 text-primary bg-primary-50 px-4 py-2 rounded-lg">
          <Leaf className="h-5 w-5" />
          <span>Environmental Impact</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Air Quality</CardTitle>
            <Cloud className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">AQI: 52</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24°C</div>
            <p className="text-xs text-muted-foreground">Average today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Green Cover</CardTitle>
            <Leaf className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">Of total area</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClimateDashboard;
