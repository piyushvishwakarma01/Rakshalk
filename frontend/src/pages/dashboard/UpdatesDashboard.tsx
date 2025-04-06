
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Bell, MessageSquare, User } from "lucide-react";

const updates = [
  {
    category: "Water Quality",
    message: "pH levels above normal in Region A",
    timestamp: "2 hours ago",
    priority: "high",
  },
  {
    category: "Market",
    message: "New crop buyers registered in the system",
    timestamp: "3 hours ago",
    priority: "medium",
  },
  {
    category: "Education",
    message: "New AI learning modules available",
    timestamp: "5 hours ago",
    priority: "low",
  },
  {
    category: "Healthcare",
    message: "Telemedicine sessions scheduled for tomorrow",
    timestamp: "6 hours ago",
    priority: "medium",
  },
];

const UpdatesDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Updates Dashboard</h1>
        <div className="flex items-center gap-2 text-primary bg-primary-50 px-4 py-2 rounded-lg">
          <Bell className="h-5 w-5" />
          <span>{updates.length} New Updates</span>
        </div>
      </div>

      <div className="grid gap-6">
        {updates.map((update, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {update.category}
              </CardTitle>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  update.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : update.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {update.priority}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <MessageSquare className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="space-y-1">
                  <p>{update.message}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    <span>{update.timestamp}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpdatesDashboard;
