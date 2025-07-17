import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchComponent from "@/components/Search";
import {
  Search,
  Sparkles,
  TrendingUp,
  Download,
  Users,
  Star,
} from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();

  const trendingSearches = [
    "Modern kitchen",
    "Living room",
    "Bedroom design",
    "Office layout",
    "Bathroom plans",
    "Villa floor plan",
  ];

  const stats = [
    { value: "50K+", label: "Floor Plans", icon: Download },
    { value: "25K+", label: "3D Models", icon: Sparkles },
    { value: "10K+", label: "Creators", icon: Users },
    { value: "4.8", label: "Rating", icon: Star },
  ];

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Interior Design Resources for Everyone
            </Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Download Beautiful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Interior Designs
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Millions of floor plans, 3D models, and design assets. All ready
              to download and use in your projects.
            </p>
          </div>

          {/* Large Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-200/50">
                <div className="flex items-center">
                  <Search className="w-6 h-6 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search for floor plans, 3D models, furniture..."
                    className="flex-1 px-4 py-4 text-lg bg-transparent border-0 focus:outline-none focus:ring-0"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const query = (e.target as HTMLInputElement).value;
                        if (query.trim()) {
                          navigate(`/search?q=${encodeURIComponent(query)}`);
                        }
                      }
                    }}
                  />
                  <Button
                    size="lg"
                    className="m-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => navigate("/search")}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Trending Searches */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-sm text-gray-500 mr-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Trending:
              </span>
              {trendingSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-blue-50 hover:border-blue-200"
                  onClick={() =>
                    navigate(`/search?q=${encodeURIComponent(search)}`)
                  }
                >
                  {search}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-2 hover:bg-blue-50 hover:border-blue-200"
              onClick={() => navigate("/browse")}
            >
              Browse All Categories
            </Button>
            <Button
              size="lg"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              onClick={() => navigate("/upload")}
            >
              Start Selling Your Designs
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-2">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
