import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Grid,
  List,
  Filter,
  Search,
  Heart,
  Download,
  Eye,
  Star,
} from "lucide-react";

export default function Browse() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  // Mock data for browsing
  const items = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Interior Design ${i + 1}`,
    creator: `Designer ${i + 1}`,
    type: ["Floor Plan", "3D Model", "Furniture"][i % 3],
    downloads: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 1000) + 50,
    rating: 4.5 + Math.random() * 0.5,
    price: i % 4 === 0 ? "Free" : `$${Math.floor(Math.random() * 50) + 5}`,
    isPremium: i % 5 === 0,
  }));

  const filters = [
    { name: "All", count: 24567 },
    { name: "Floor Plans", count: 8234 },
    { name: "3D Models", count: 6542 },
    { name: "Furniture", count: 4321 },
    { name: "Textures", count: 3456 },
    { name: "Lighting", count: 2134 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Browse All Designs
          </h1>
          <p className="text-gray-600">
            Discover millions of interior design resources from our community
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter, index) => (
                <Button
                  key={index}
                  variant={index === 0 ? "default" : "outline"}
                  size="sm"
                  className={
                    index === 0
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "hover:bg-blue-50 hover:border-blue-200"
                  }
                >
                  {filter.name}
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-gray-100 text-gray-600"
                  >
                    {filter.count.toLocaleString()}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="downloads">Most Downloads</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {items.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
            >
              <CardContent className="p-0">
                {/* Image/Preview */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-gray-400" />
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {item.isPremium && (
                      <Badge className="bg-yellow-500 text-yellow-900">
                        Premium
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90">
                      {item.type}
                    </Badge>
                  </div>

                  {/* Heart button */}
                  <button className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>

                  {/* Stats */}
                  <div className="absolute bottom-3 left-3 flex space-x-3">
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
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600">by {item.creator}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600 text-sm">
                        {item.price}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                        {item.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 hover:bg-blue-50 hover:border-blue-200"
          >
            Load More Designs
          </Button>
        </div>
      </div>
    </div>
  );
}
