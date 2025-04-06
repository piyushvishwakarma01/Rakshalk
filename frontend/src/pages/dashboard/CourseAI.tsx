import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Install axios if not already installed
import { CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ArticleIcon from "@mui/icons-material/Article";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import GrassIcon from "@mui/icons-material/Grass";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import { DashboardLayout } from "../../components/DashboardLayout";
import FormattedAIResponse from "../../components/FormattedAIResponse";

interface Message {
  sender: "user" | "ai";
  content: string;
}

interface Resource {
  id: number;
  type: "video" | "article";
  title: string;
  description: string;
  image: string;
  duration?: string;
  readTime?: string;
  url: string;
  tags: string[];
}

interface CourseResources {
  Organic_Farming: Resource[];
  Soil_Health: Resource[];
  Irrigation_Technique: Resource[];
  [key: string]: Resource[];
}

// Sample course data
const courseResources: CourseResources = {
  Organic_Farming: [
    {
      id: 1,
      type: "video",
      title: "Introduction to Organic Farming",
      description:
        "Learn the fundamentals of organic farming and sustainable agriculture.",
      image:
        "https://images.unsplash.com/photo-1533062618053-d51e617307ec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhcm1pbmclMjBjb3Vyc2V8ZW58MHx8MHx8fDA%3D",
      duration: "15 min",
      url: "https://example.com",
      tags: ["Organic Farming", "Sustainability", "Agriculture"],
    },
  ],
  Soil_Health: [
    {
      id: 2,
      type: "article",
      title: "Best Practices for Soil Health",
      description:
        "Understand soil composition, nutrients, and conservation techniques.",
      image:
        "https://i0.wp.com/geopard.tech/wp-content/uploads/2022/03/39-min.jpg?w=1200&ssl=1",
      readTime: "10 min",
      url: "https://geopard.tech/blog/6-ways-to-improve-the-quality-of-your-soil/",
      tags: ["Soil Health", "Farming", "Sustainability"],
    },
  ],
  Irrigation_Technique: [
    {
      id: 3,
      type: "video",
      title: "Modern Irrigation Techniques",
      description:
        "Explore drip irrigation, sprinkler systems, and water conservation methods.",
      image:
        "https://images.unsplash.com/photo-1589876568181-a1508b8ef473?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXJyaWdhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      duration: "20 min",
      url: "https://example.com",
      tags: ["Irrigation", "Water Management", "Agriculture"],
    },
  ],
};

// Suggested farming topics
const suggestedTopics = [
  "Organic Farming",
  "Soil Health",
  "Irrigation Techniques",
  "Crop Rotation",
  "Sustainable Agriculture",
];

const supportedLanguages = [
  { code: "english", label: "English" },
  { code: "hindi", label: "Hindi" },
  { code: "tamil", label: "Tamil" },
  { code: "telugu", label: "Telugu" },
  { code: "bengali", label: "Bengali" },
  { code: "gujrati", label: "Gujarati" },
  { code: "kannada", label: "Kannada" },
  { code: "malyalam", label: "Malayalam" },
  { code: "marathi", label: "Marathi" },
  { code: "punjabi", label: "Punjabi" },
];

const CourseAI: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      sender: "ai",
      content:
        "Hello! I'm your AI learning assistant. What would you like to learn about today?",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("Organic_Farming");
  const [savedResources, setSavedResources] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const askAI = async (userMessage: string) => {
    try {
      setLoading(true);

    
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`,
        { 
          contents: [
            { 
              parts: [{ text: `You are a farming specialist AI who has complete knowledge and understanding of crops and farming and related stuff and you respond in ${selectedLanguage}, regardless of the language of the user prompt. ${userMessage}` }] 
            } // User input
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      const aiResponse =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response";

      return aiResponse;
    } catch (error) {
      console.error("Error asking AI:", error);
      return "I'm sorry, I encountered an error. Please try again.";
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", content: userMessage },
    ]);
    setMessage("");

    const aiResponse = await askAI(userMessage);
    setChatHistory((prev) => [...prev, { sender: "ai", content: aiResponse }]);
  };

  return (
    <DashboardLayout>
      <div className="flex min-h-screen bg-background text-white">
        {/* Main Content */}
        <div className="flex-1 py-2 px-4 antialiased">
          {/* Header Section */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
              AI Learning Hub
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Assistant Section */}
            <div className="bg-background rounded-3xl shadow-2xl overflow-hidden border border-primary transform transition-all hover:shadow-3xl">
              <div className="bg-gradient-to-r from-primary to-primary-500 py-5 px-6 flex justify-between items-center">
                <h2 className="text-white text-xl font-semibold flex items-center">
                  <PsychologyIcon className="mr-3" />
                  AI Learning Assistant
                </h2>
                <div className="flex items-center space-x-2">
                  <LanguageIcon className="text-white" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="bg-background text-white border border-white rounded-md px-2 py-1 focus:outline-none"
                  >
                    {supportedLanguages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-[450px] overflow-y-auto p-6 bg-background space-y-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-indigo-300">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                      max-w-[75%] px-4 py-3 rounded-2xl 
                      ${
                        msg.sender === "user"
                          ? "bg-primary-500 text-white rounded-tr-sm"
                          : "text-white rounded-tl-sm shadow-md border border-gray-200"
                      }
                    `}
                    >
                      {msg.sender === "ai" ? (
                        <FormattedAIResponse response={msg.content} />
                      ) : (
                        <p className="text-sm md:text-base">{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-black shadow-md text-white rounded-2xl rounded-tl-sm border border-gray-200 p-4 max-w-[75%] flex items-center">
                      <CircularProgress
                        size={20}
                        className="mr-3 text-indigo-600"
                      />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-5 border-t border-gray-200 bg-">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Ask about any topic..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent text-black transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={loading || !message.trim()}
                    className={`p-3 rounded-full transition-all ${
                      loading || !message.trim()
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-secondary-600 text-white hover:bg-secondary-700 hover:shadow-md"
                    }`}
                  >
                    <SendIcon />
                  </button>
                </div>

                {/* Suggested Topics */}
                <div className="mt-4">
                  <p className="text-sm mb-2 flex items-center">
                    <LightbulbIcon
                      className="text-yellow-500 mr-2"
                      fontSize="small"
                    />
                    Suggested Topics:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => setMessage(topic)}
                        className="px-3 py-1.5 bg-secondary text-white rounded-full text-xs hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Resources Section */}
            <div className="bg-background rounded-3xl shadow-2xl overflow-hidden border border-secondary-400 transform transition-all hover:shadow-3xl">
              <div className="bg-gradient-to-r from-secondary to-secondary-500 py-5 px-6 flex items-center justify-between">
                <h2 className="text-white text-xl font-semibold flex items-center">
                  <MenuBookIcon className="mr-2 text-white" /> Learning
                  Resources
                </h2>
              </div>

              {/* Category Tabs */}
              <div className="flex border-b bg-zinc-800">
                {[
                  {
                    key: "Organic_Farming",
                    icon: <AgricultureIcon />, // Represents farming activities
                    label: "Farming",
                  },
                  {
                    key: "Soil_Health",
                    icon: <GrassIcon />, // Symbolizes soil and plant health
                    label: "Soil Health",
                  },
                  {
                    key: "Irrigation_Technique",
                    icon: <WaterDropIcon />, // Represents water and irrigation
                    label: "Irrigation",
                  },
                ].map(({ key, icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`flex-1 flex items-center justify-center py-4 px-6 transition-all ${
                      category === key
                        ? "bg-primary-500 border-b-2 border-primary-600 text-white font-semibold"
                        : "text-white hover:bg-primary-400 hover:text-white"
                    }`}
                  >
                    {icon && React.cloneElement(icon, { className: "mr-2" })}
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>

              {/* Resource Cards */}
              <div className="p-6 overflow-y-auto h-[510px] scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-indigo-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courseResources[category].map((resource) => (
                    <div
                      key={resource.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-200"
                    >
                      <div className="relative">
                        <img
                          src={resource.image}
                          alt={resource.title}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSavedResources((prev) =>
                              prev.includes(resource.id)
                                ? prev.filter((id) => id !== resource.id)
                                : [...prev, resource.id]
                            );
                          }}
                          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-md hover:bg-white hover:shadow-lg transition-all"
                        >
                          {savedResources.includes(resource.id) ? (
                            <BookmarkIcon className="text-indigo-600" />
                          ) : (
                            <BookmarkBorderIcon className="text-gray-600" />
                          )}
                        </button>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-gray-800 text-lg line-clamp-2">
                            {resource.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            {resource.type === "video" ? (
                              <>
                                <PlayCircleOutlineIcon
                                  fontSize="small"
                                  className="mr-1"
                                />
                                {resource.duration}
                              </>
                            ) : (
                              <>
                                <ArticleIcon
                                  fontSize="small"
                                  className="mr-1"
                                />
                                {resource.readTime}
                              </>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                          {resource.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                        >
                          View Resource
                          <ArrowForwardIosIcon
                            fontSize="small"
                            className="ml-1"
                          />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Browse All Button */}
                <div className="flex justify-center mt-8">
                  <button className="px-6 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-full flex items-center hover:bg-indigo-50 transition-all hover:shadow-md">
                    Browse All Resources
                    <ArrowForwardIosIcon fontSize="small" className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseAI;
