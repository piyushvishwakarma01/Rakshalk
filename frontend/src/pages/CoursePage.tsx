import React from "react";
import { useParams, Link } from "react-router-dom";
import { DashboardLayout } from "../components/DashboardLayout";
import { ArrowLeft } from "lucide-react";

const courses = [
  { id: 1, title: "Introduction to Organic Farming", content: "Detailed content about Organic Farming..." },
  { id: 2, title: "Permaculture & Crop Rotation", content: "Detailed content about Permaculture..." },
  { id: 3, title: "Natural Pest & Disease Control", content: "Detailed content about Pest Control..." },
  { id: 4, title: "Understanding Soil Composition", content: "Detailed content about Soil Composition..." },
  { id: 5, title: "Composting & Soil Enrichment", content: "Detailed content about Composting..." },
  { id: 6, title: "Erosion Prevention & Soil Conservation", content: "Detailed content about Erosion Prevention..." },
  { id: 7, title: "Drip & Sprinkler Irrigation", content: "Detailed content about Drip Irrigation..." },
  { id: 8, title: "Rainwater Harvesting & Storage", content: "Detailed content about Rainwater Harvesting..." },
  { id: 9, title: "IoT & Smart Irrigation Systems", content: "Detailed content about IoT in Irrigation..." },
  { id: 10, title: "AI & Machine Learning in Farming", content: "Detailed content about AI in Farming..." },
  { id: 11, title: "Precision Farming with Drones", content: "Detailed content about Drones in Farming..." },
  { id: 12, title: "Hydroponics & Vertical Farming", content: "Detailed content about Hydroponics..." },
];

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const course = courses.find((course) => course.id === parseInt(id || "0"));

  if (!course) {
    return <div className="p-6 text-red-500">Course not found!</div>;
  }

  return (
    <DashboardLayout>
      <div className="p-6 bg-background min-h-screen">
        
        <Link to="/dashboard/education" className="flex items-center text-gray-400 hover:text-white mb-4">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Courses
        </Link>

       
        <h1 className="text-3xl font-bold text-white">{course.title}</h1>
        <p className="mt-4 text-gray-400">{course.content}</p>
      </div>
    </DashboardLayout>
  );
};

export default CoursePage;