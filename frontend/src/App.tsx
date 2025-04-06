
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import OverviewDashboard from "./pages/dashboard/OverviewDashboard";
import WaterDashboard from "./pages/dashboard/WaterDashboard";
import MarketDashboard from "./pages/dashboard/MarketDashboard";
import EducationDashboard from "./pages/dashboard/EducationDashboard";
import HealthDashboard from "./pages/dashboard/HealthDashboard";
import JobsDashboard from "./pages/dashboard/JobsDashboard";
import ClimateDashboard from "./pages/dashboard/ClimateDashboard";
import GenderDashboard from "./pages/dashboard/GenderDashboard";
import UpdatesDashboard from "./pages/dashboard/UpdatesDashboard";
import CourseAI from "./pages/dashboard/CourseAI"
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { DashboardLayout } from './components/DashboardLayout';
import { Toaster as Sonner } from "./components/ui/sonner";
import CoursePage from './pages/CoursePage';
import SoilDashboard from './pages/dashboard/SoilDashboard';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="village-hub-theme">
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/dashboard/course" element={<CourseAI />} />
                  <Route path="/course/:id" element={<CoursePage />} />
                  <Route path="/dashboard" element={<DashboardLayout><OverviewDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/water" element={<DashboardLayout><WaterDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/market" element={<DashboardLayout><MarketDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/education" element={<DashboardLayout><EducationDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/health" element={<DashboardLayout><HealthDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/soil" element={<DashboardLayout><SoilDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/jobs" element={<DashboardLayout><JobsDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/climate" element={<DashboardLayout><ClimateDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/gender" element={<DashboardLayout><GenderDashboard /></DashboardLayout>} />
                  <Route path="/dashboard/updates" element={<DashboardLayout><UpdatesDashboard /></DashboardLayout>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
