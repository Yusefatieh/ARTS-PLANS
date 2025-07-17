import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function Categories() {
  const navigate = useNavigate();

  const mainCategories = [
    {
      id: "floor-plans",
      name: "Floor Plans",
      description:
        "Complete architectural floor plans for all types of buildings",
      count: "15,247",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      trending: true,
      subcategories: [
        "Residential",
        "Commercial",
        "Industrial",
        "Apartment",
        "Villa",
        "Office",
      ],
    },
    {
      id: "living-room",
      name: "Living Room",
      description: "Furniture layouts and design ideas for living spaces",
      count: "8,567",
      icon: Sofa,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      trending: false,
      subcategories: [
        "Modern",
        "Traditional",
        "Minimalist",
        "Luxury",
        "Small Space",
        "Entertainment",
      ],
    },
    {
      id: "kitchen",
      name: "Kitchen",
      description: "Kitchen layouts, appliances, and design elements",
      count: "12,134",
      icon: Utensils,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      trending: true,
      subcategories: [
        "Island",
        "Galley",
        "L-Shape",
        "U-Shape",
        "Open Plan",
        "Compact",
      ],
    },
    {
      id: "bedroom",
      name: "Bedroom",
      description: "Bedroom designs and furniture arrangements",
      count: "6,823",
      icon: Bed,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      trending: false,
      subcategories: [
        "Master",
        "Kids",
        "Guest",
        "Small",
        "Luxury",
        "Minimalist",
      ],
    },
    {
      id: "bathroom",
      name: "Bathroom",
      description: "Bathroom layouts and fixture arrangements",
      count: "4,256",
      icon: Bath,
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      trending: false,
      subcategories: [
        "Modern",
        "Traditional",
        "Spa",
        "Small",
        "Master",
        "Powder Room",
      ],
    },
    {
      id: "office",
      name: "Office",
      description: "Office layouts and workspace designs",
      count: "5,543",
      icon: Building,
      color: "from-gray-500 to-gray-600",
      bgColor: "bg-gray-50",
      trending: true,
      subcategories: [
        "Corporate",
        "Home Office",
        "Coworking",
        "Conference",
        "Open Plan",
        "Private",
      ],
    },
    {
      id: "lighting",
      name: "Lighting",
      description: "Lighting plans and fixture designs",
      count: "3,287",
      icon: Lightbulb,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      trending: false,
      subcategories: [
        "Ambient",
        "Task",
        "Accent",
        "Natural",
        "LED",
        "Chandelier",
      ],
    },
    {
      id: "outdoor",
      name: "Outdoor",
      description: "Garden and outdoor space designs",
      count: "2,891",
      icon: Trees,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      trending: false,
      subcategories: [
        "Garden",
        "Patio",
        "Deck",
        "Pool",
        "Landscape",
        "Terrace",
      ],
    },
    {
      id: "furniture",
      name: "Furniture",
      description: "Individual furniture pieces and collections",
      count: "25,123",
      icon: Home,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50",
      trending: true,
      subcategories: [
        "Seating",
        "Tables",
        "Storage",
        "Beds",
        "Desks",
        "Cabinets",
      ],
    },
    {
      id: "architectural",
      name: "Architectural",
      description: "Architectural elements and building details",
      count: "7,567",
      icon: Ruler,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      trending: false,
      subcategories: [
        "Doors",
        "Windows",
        "Stairs",
        "Columns",
        "Facades",
        "Details",
      ],
    },
    {
      id: "materials",
      name: "Materials",
      description: "Textures, finishes, and material samples",
      count: "4,834",
      icon: Palette,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      trending: false,
      subcategories: ["Wood", "Stone", "Metal", "Fabric", "Glass", "Ceramic"],
    },
    {
      id: "garage",
      name: "Garage",
      description: "Garage and storage area layouts",
      count: "1,567",
      icon: Car,
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      trending: false,
      subcategories: [
        "Single",
        "Double",
        "Workshop",
        "Storage",
        "Electric",
        "Carport",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of interior design resources
            organized by category. Find exactly what you need for your next
            project.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CardContent className="p-0">
                  {/* Header Section */}
                  <div
                    className={`${category.bgColor} p-6 relative overflow-hidden`}
                  >
                    {category.trending && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-500 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                    )}

                    <div className="relative z-10">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4">
                        {category.description}
                      </p>

                      <Badge
                        variant="secondary"
                        className="bg-white/80 text-gray-700"
                      >
                        {category.count} items
                      </Badge>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/30 rounded-full blur-lg"></div>
                  </div>

                  {/* Subcategories */}
                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Popular Subcategories:
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 4).map((sub, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/category/${category.id}?sub=${sub.toLowerCase()}`,
                            );
                          }}
                        >
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 4 && (
                        <Badge
                          variant="outline"
                          className="text-xs text-gray-500"
                        >
                          +{category.subcategories.length - 4} more
                        </Badge>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/category/${category.id}`);
                      }}
                    >
                      Browse {category.name}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Collections */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated collections of our most popular and trending design
              resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => navigate("/collection/modern-minimalist")}
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 mb-4">
                  <div className="text-center">
                    <Home className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Modern Minimalist</h3>
                    <p className="text-sm text-gray-600">
                      Clean, simple designs
                    </p>
                  </div>
                </div>
                <Badge className="w-full justify-center">2,456 items</Badge>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => navigate("/collection/luxury-interiors")}
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-6 mb-4">
                  <div className="text-center">
                    <Palette className="w-12 h-12 text-yellow-600 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Luxury Interiors</h3>
                    <p className="text-sm text-gray-600">High-end designs</p>
                  </div>
                </div>
                <Badge className="w-full justify-center">1,823 items</Badge>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => navigate("/collection/small-spaces")}
            >
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-6 mb-4">
                  <div className="text-center">
                    <Ruler className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <h3 className="font-bold text-lg">Small Spaces</h3>
                    <p className="text-sm text-gray-600">Compact solutions</p>
                  </div>
                </div>
                <Badge className="w-full justify-center">3,142 items</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
