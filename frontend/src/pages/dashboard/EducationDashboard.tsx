import React from "react";
import { BookOpen, PlayCircle, ChevronRight,  Clock, BarChart2, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: " Organic & Sustainable Farming",
    description: "Learn eco-friendly farming techniques that focus on sustainability, biodiversity, and soil health.",
    courses: [
      {
        id: 1,
        title: "Introduction to Organic Farming",
        description: "Basics of eco-friendly and chemical-free farming.",
        modules: 6,
        difficulty: "Beginner",
        duration: "4 weeks",
        resources: ["Video lectures", "E-books", "Live Q&A sessions"],
      },
      {
        id: 2,
        title: "Permaculture & Crop Rotation",
        description: "Sustainable techniques for improving soil fertility and crop health.",
        modules: 8,
        difficulty: "Intermediate",
        duration: "6 weeks",
        resources: ["Case studies", "Infographics", "Hands-on exercises"],
      },
      {
        id: 3,
        title: "Natural Pest & Disease Control",
        description: "Organic methods to protect crops from pests and diseases.",
        modules: 5,
        difficulty: "Beginner",
        duration: "3 weeks",
        resources: ["Video guides", "Expert webinars", "Pest management toolkits"],
      },
    ],
  },
  {
    id: 2,
    title: "Soil Health & Regeneration",
    description: "Understand soil biology, improve fertility, and implement conservation techniques.",
    courses: [
      {
        id: 4,
        title: "Understanding Soil Composition",
        description: "Learn about soil types, pH balance, and essential nutrients.",
        modules: 7,
        difficulty: "Intermediate",
        duration: "5 weeks",
        resources: ["Soil analysis reports", "Interactive quizzes", "Field assignments"],
      },
      {
        id: 5,
        title: "Composting & Soil Enrichment",
        description: "Use organic matter to improve soil fertility and structure.",
        modules: 6,
        difficulty: "Beginner",
        duration: "4 weeks",
        resources: ["Step-by-step guides", "Live workshops", "DIY composting techniques"],
      },
      {
        id: 6,
        title: "Erosion Prevention & Soil Conservation",
        description: "Techniques to prevent soil degradation and enhance sustainability.",
        modules: 9,
        difficulty: "Advanced",
        duration: "6 weeks",
        resources: ["Case studies", "Soil conservation handbook", "Interactive simulations"],
      },
    ],
  },
  {
    id: 3,
    title: "Irrigation & Water Management",
    description: "Optimize water usage in farming with modern irrigation techniques.",
    courses: [
      {
        id: 7,
        title: "Drip & Sprinkler Irrigation",
        description: "Learn efficient water distribution techniques for better crop yield.",
        modules: 4,
        difficulty: "Beginner",
        duration: "3 weeks",
        resources: ["Irrigation system blueprints", "Video tutorials", "Hands-on practice"],
      },
      {
        id: 8,
        title: "Rainwater Harvesting & Storage",
        description: "Collect and store water effectively for irrigation purposes.",
        modules: 5,
        difficulty: "Intermediate",
        duration: "4 weeks",
        resources: ["Water storage design templates", "Community case studies", "DIY harvesting kits"],
      },
      {
        id: 9,
        title: "IoT & Smart Irrigation Systems",
        description: "Use modern technology to automate and optimize irrigation.",
        modules: 6,
        difficulty: "Advanced",
        duration: "6 weeks",
        resources: ["IoT device integration guides", "Data analytics for irrigation", "Expert interviews"],
      },
    ],
  },
  {
    id: 4,
    title: "AgriTech & Modern Farming",
    description: "Leverage cutting-edge technology to revolutionize traditional farming practices.",
    courses: [
      {
        id: 10,
        title: "AI & Machine Learning in Farming",
        description: "How AI helps monitor crops, predict yields, and automate farm management.",
        modules: 8,
        difficulty: "Advanced",
        duration: "8 weeks",
        resources: ["ML model implementation", "Data visualization tools", "Real-world AI case studies"],
      },
      {
        id: 11,
        title: "Precision Farming with Drones",
        description: "Using drones for crop monitoring, spraying, and yield analysis.",
        modules: 7,
        difficulty: "Intermediate",
        duration: "6 weeks",
        resources: ["Drone operation manuals", "GIS mapping software", "Live demonstrations"],
      },
      {
        id: 12,
        title: "Hydroponics & Vertical Farming",
        description: "Grow plants without soil using innovative indoor farming techniques.",
        modules: 10,
        difficulty: "Advanced",
        duration: "10 weeks",
        resources: ["Hydroponic system setup guide", "Industry expert consultations", "Hands-on experiments"],
      },
    ],
  },
];


const EducationDashboard: React.FC = () => {
  return (
    <div className="bg-background p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <BookOpen className="w-8 h-8 text-green-600 mr-3" />
          Study Section
        </h1>
        <p className="text-gray-400 mt-2">
          Explore courses on soil, farming, irrigation, and AgriTech to enhance your knowledge.
        </p>
      </header>

      {categories.map((category) => (
        <section key={category.id} className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {category.title}
          </h2>
          <p className="text-gray-400 mb-4">{category.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.courses.map((course) => (
              <div
                key={course.id}
                className="bg-background border-white border-[2px] shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <PlayCircle className="w-6 h-6 text-green-500 mr-2" />
                  {course.title}
                </h3>
                <p className="text-gray-400 mt-2">{course.description}</p>

                {/* Course Details */}
                <div className="mt-4 space-y-2 text-gray-400 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-500 mr-2" />
                    Duration: {course.duration}
                  </div>
                  <div className="flex items-center">
                    <BarChart2 className="w-4 h-4 text-green-500 mr-2" />
                    Difficulty: {course.difficulty}
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-green-500 mr-2" />
                    {course.modules} Modules
                  </div>
                </div>

                {/* View Course Button */}
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/course/${course.id}`}
                    className="text-green-500 flex items-center hover:underline"
                  >
                    View Course <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default EducationDashboard;

