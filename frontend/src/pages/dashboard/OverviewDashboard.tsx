import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { DropletIcon, BookOpen, Thermometer, Building } from "lucide-react";
import { WaterSection } from "../../components/dashboard/WaterSection"; // Import your sections
import { HealthSection } from "../../components/dashboard/HealthSection";
import { LearnSection } from "../../components/dashboard/LearnSection";
import { JobsSection } from "../../components/dashboard/JobsSection";

const stats = [
  {
    title: "Water Quality",
    value: "Good",
    icon: DropletIcon,
    color: "text-blue-500",
    change: { value: "+5%", isPositive: true },
  },
  {
    title: "Health Checkups",
    value: "23",
    icon: Thermometer,
    color: "text-green-500",
    change: { value: "+2", isPositive: true },
  },
  {
    title: "Courses Completed",
    value: "12",
    icon: BookOpen,
    color: "text-orange-500",
    change: { value: "+3", isPositive: true },
  },
  {
    title: "Job Applications",
    value: "5",
    icon: Building,
    color: "text-purple-500",
    change: { value: "-1", isPositive: false },
  },
];

const OverviewDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change.value} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WaterSection />
        <HealthSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LearnSection />
        <JobsSection />
      </div>
    </div>
  );
};

export default OverviewDashboard;