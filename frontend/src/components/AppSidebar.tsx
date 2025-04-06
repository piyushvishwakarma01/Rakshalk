import {
  DropletIcon,
  TrendingUpIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  BriefcaseIcon,
  LeafIcon,
  LayoutDashboardIcon,
  BellIcon,
  School,
  LandPlot,
  LandPlotIcon,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Water Quality",
    path: "/dashboard/water",
    icon: DropletIcon,
  },
  {
    title: "Soil",
    path: "/dashboard/soil",
    icon: LandPlotIcon,
  },
  {
    title: "Market Links",
    path: "/dashboard/market",
    icon: TrendingUpIcon,
  },
  {
    title: "Education",
    path: "/dashboard/education",
    icon: GraduationCapIcon,
  },
  {
    title: "Healthcare",
    path: "/dashboard/health",
    icon: HeartPulseIcon,
  },
  {
    title: "Employment",
    path: "/dashboard/jobs",
    icon: BriefcaseIcon,
  },
  // {
  //   title: "Climate",
  //   path: "/dashboard/climate",
  //   icon: LeafIcon,
  // },
  {
    title: "Gender Equality",
    path: "/dashboard/gender",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Updates",
    path: "/dashboard/updates",
    icon: BellIcon,
  },
  {
    title: "Learning",
    path: "/dashboard/course",
    icon: School,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-background border-r border-gray-200 shadow-sm">
      <nav className="mt-5 px-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.title}
            className={`w-full justify-start mb-2 px-4 py-2 text-foreground hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200 ${
              location.pathname === item.path
                ? "bg-primary-100 text-primary-600"
                : "bg-transparent"
            }`}
            variant="ghost"
            asChild
          >
            <Link to={item.path}>
              <item.icon className="mr-2 h-5 w-5" />
              {item.title}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
}