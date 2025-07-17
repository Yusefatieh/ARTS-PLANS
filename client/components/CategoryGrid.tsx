import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Home,
  Utensils,
  Bed,
  Bath,
  Sofa,
  Lightbulb,
  Car,
  Building,
  Trees,
  Palette,
  Ruler,
} from "lucide-react";

export default function CategoryGrid() {
  const navigate = useNavigate();

  const categories = [
    {
      id: "floor-plans",
      name: "Floor Plans",
      count: "15,000+",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      description: "2D & 3D floor plans for all spaces",
    },
    {
      id: "living-room",
      name: "Living Room",
      count: "8,500+",
      icon: Sofa,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      description: "Furniture and layout designs",
    },
    {
      id: "kitchen",
      name: "Kitchen",
      count: "12,000+",
      icon: Utensils,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      description: "Kitchen layouts and equipment",
    },
    {
      id: "bedroom",
      name: "Bedroom",
      count: "6,800+",
      icon: Bed,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      description: "Bedroom designs and furniture",
    },
    {
      id: "bathroom",
      name: "Bathroom",
      count: "4,200+",
      icon: Bath,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      description: "Bathroom layouts and fixtures",
    },
    {
      id: "office",
      name: "Office",
      count: "5,500+",
      icon: Building,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      description: "Office and workspace designs",
    },
    {
      id: "lighting",
      name: "Lighting",
      count: "3,200+",
      icon: Lightbulb,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Lighting plans and fixtures",
    },
    {
      id: "outdoor",
      name: "Outdoor",
      count: "2,800+",
      icon: Trees,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Garden and outdoor spaces",
    },
    {
      id: "furniture",
      name: "Furniture",
      count: "25,000+",
      icon: Home,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      description: "Individual furniture pieces",
    },
    {
      id: "architectural",
      name: "Architectural",
      count: "7,500+",
      icon: Ruler,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      description: "Architectural elements and details",
    },
    {
      id: "materials",
      name: "Materials",
      count: "4,800+",
      icon: Palette,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      description: "Textures and material samples",
    },
    {
      id: "garage",
      name: "Garage",
      count: "1,500+",
      icon: Car,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      description: "Garage and storage layouts",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you need with our organized collection of interior
            design resources
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CardContent className="p-0">
                  {/* Icon Section */}
                  <div
                    className={`${category.bgColor} p-8 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-white/80 text-gray-700"
                      >
                        {category.count}
                      </Badge>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white/30 rounded-full blur-lg"></div>
                  </div>

                  {/* Description */}
                  <div className="p-4 bg-white">
                    <p className="text-sm text-gray-600 text-center">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/browse")}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
          >
            Browse All Categories
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
