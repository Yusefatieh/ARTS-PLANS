import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Download,
  Eye,
  Star,
  FileText,
  Image,
  Box,
  Bookmark,
} from "lucide-react";

export default function FeaturedContent() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("trending");

  const tabs = [
    { id: "trending", label: "Trending", icon: Star },
    { id: "recent", label: "Recent", icon: FileText },
    { id: "popular", label: "Popular", icon: Heart },
    { id: "premium", label: "Premium", icon: Bookmark },
  ];

  const featuredItems = [
    {
      id: 1,
      title: "Modern Villa Floor Plan",
      creator: "ArchDesign Studio",
      type: "Floor Plan",
      format: "DWG, PDF",
      image: "/placeholder.svg",
      downloads: 2341,
      likes: 456,
      views: 12450,
      rating: 4.8,
      price: "Free",
      isPremium: false,
      tags: ["modern", "villa", "3-bedroom"],
    },
    {
      id: 2,
      title: "Luxury Kitchen 3D Model",
      creator: "InteriorPro",
      type: "3D Model",
      format: "3DS, OBJ",
      image: "/placeholder.svg",
      downloads: 1876,
      likes: 234,
      views: 8920,
      rating: 4.9,
      price: "$15",
      isPremium: true,
      tags: ["kitchen", "luxury", "modern"],
    },
    {
      id: 3,
      title: "Minimalist Living Room Set",
      creator: "DesignMaster",
      type: "Furniture Pack",
      format: "DWG, 3DS",
      image: "/placeholder.svg",
      downloads: 3102,
      likes: 678,
      views: 15320,
      rating: 4.7,
      price: "Free",
      isPremium: false,
      tags: ["minimalist", "living-room", "furniture"],
    },
    {
      id: 4,
      title: "Complete Office Layout",
      creator: "WorkspaceDesigns",
      type: "Floor Plan",
      format: "DWG, PDF",
      image: "/placeholder.svg",
      downloads: 1567,
      likes: 289,
      views: 7890,
      rating: 4.6,
      price: "$25",
      isPremium: true,
      tags: ["office", "workspace", "commercial"],
    },
    {
      id: 5,
      title: "Scandinavian Bedroom",
      creator: "NordicDesigns",
      type: "Room Design",
      format: "DWG, 3DS",
      image: "/placeholder.svg",
      downloads: 2445,
      likes: 512,
      views: 11230,
      rating: 4.8,
      price: "Free",
      isPremium: false,
      tags: ["scandinavian", "bedroom", "minimalist"],
    },
    {
      id: 6,
      title: "Industrial Loft Layout",
      creator: "UrbanLoft Co.",
      type: "Floor Plan",
      format: "DWG, PDF, 3DS",
      image: "/placeholder.svg",
      downloads: 1234,
      likes: 189,
      views: 5670,
      rating: 4.5,
      price: "$35",
      isPremium: true,
      tags: ["industrial", "loft", "urban"],
    },
  ];

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Designs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the most popular and trending interior design resources
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white overflow-hidden"
              onClick={() => navigate(`/design/${item.id}`)}
            >
              <CardContent className="p-0">
                {/* Image/Preview */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {/* Placeholder for actual image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">{item.type}</p>
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {item.isPremium && (
                      <Badge className="bg-yellow-500 text-yellow-900 border-0">
                        Premium
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-700"
                    >
                      {item.type}
                    </Badge>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(item.id)
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Stats overlay */}
                  <div className="absolute bottom-3 left-3 flex space-x-4">
                    <div className="flex items-center text-white text-xs bg-black/50 rounded-full px-2 py-1">
                      <Download className="w-3 h-3 mr-1" />
                      {item.downloads.toLocaleString()}
                    </div>
                    <div className="flex items-center text-white text-xs bg-black/50 rounded-full px-2 py-1">
                      <Heart className="w-3 h-3 mr-1" />
                      {item.likes}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">by {item.creator}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-blue-600">
                        {item.price}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                        {item.rating}
                      </div>
                    </div>
                  </div>

                  {/* Format info */}
                  <div className="text-sm text-gray-600 mb-4">
                    Formats: {item.format}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs text-gray-600 border-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/design/${item.id}`);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => navigate("/browse")}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            View All Designs
          </Button>
        </div>
      </div>
    </section>
  );
}
