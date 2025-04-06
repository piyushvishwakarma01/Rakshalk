import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const features = [
  {
    title: "Water Quality Dashboard",
    description: "Real-time monitoring of water quality through IoT sensors",
  },
  {
    title: "Market Linkage",
    description: "Connect farmers directly with buyers for better prices",
  },
  {
    title: "Skill Learning Hub",
    description: "Interactive courses with AI-powered guidance",
  },
  {
    title: "AI Virtual Tutor",
    description: "Multilingual educational support available 24/7",
  },
  {
    title: "Healthcare Support",
    description: "AI-powered disease prediction and telemedicine services",
  },
  {
    title: "Job Opportunities",
    description: "Find local jobs and mentorship programs",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight animate-fade-in">
              Empowering Villages
              <span className="text-primary"> Through Technology</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              A comprehensive platform bringing digital transformation to rural
              communities through advanced technology, education, and sustainable
              development.
            </p>
            <div className="mt-10 flex justify-center gap-4 animate-fade-in">
              <Link
                to="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition duration-200 flex items-center group"
              >
                Get Started
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Everything you need to empower your community
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive solutions for rural development and sustainability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative p-6 bg-background rounded-lg border border-gray-200 hover:border-primary-500 transition-colors duration-200 group animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-200">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-primary-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
                <br />
                Join our community today.
              </h2>
              <p className="mt-4 text-lg text-primary-100">
                Start empowering your village with our comprehensive digital
                solutions.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-primary-50 transition duration-200"
              >
                Register Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
