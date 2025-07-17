import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Heart,
  Download,
  Eye,
  Star,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceFilter, setPriceFilter] = useState("all");

  // Mock category data
  const categoryInfo = {
    "floor-plans": {
      name: "Floor Plans",
      description:
        "Complete architectural floor plans for all types of buildings and spaces",
      totalItems: 15247,
      subcategories: [
        "Residential",
        "Commercial",
        "Industrial",
        "Apartment",
        "Villa",
        "Office",
      ],
    },
    "living-room": {
      name: "Living Room",
      description: "Furniture layouts and design ideas for living spaces",
      totalItems: 8567,
      subcategories: [
        "Modern",
        "Traditional",
        "Minimalist",
        "Luxury",
        "Small Space",
        "Entertainment",
      ],
    },
    kitchen: {
      name: "Kitchen",
      description: "Kitchen layouts, appliances, and design elements",
      totalItems: 12134,
      subcategories: [
        "Island",
        "Galley",
        "L-Shape",
        "U-Shape",
        "Open Plan",
        "Compact",
      ],
    },
    // Add more categories as needed
  };

  const currentCategory = categoryInfo[
    categoryId as keyof typeof categoryInfo
  ] || {
    name: "Category",
    description: "Design assets and resources",
    totalItems: 0,
    subcategories: [],
  };

  // Mock data for items
  const items = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `${currentCategory.name} Design ${i + 1}`,
    creator: `Designer ${Math.floor(Math.random() * 100) + 1}`,
    type: ["Floor Plan", "3D Model", "Furniture", "Texture"][i % 4],
    downloads: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 1000) + 50,
    rating: 4.0 + Math.random() * 1.0,
    price: i % 5 === 0 ? "Free" : `$${Math.floor(Math.random() * 50) + 5}`,
    isPremium: i % 6 === 0,
    isTrending: i % 8 === 0,
    uploadDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
  }));

  const filterOptions = [
    { name: "All", count: currentCategory.totalItems },
    { name: "Free", count: Math.floor(currentCategory.totalItems * 0.3) },
    { name: "Premium", count: Math.floor(currentCategory.totalItems * 0.7) },
    { name: "Popular", count: Math.floor(currentCategory.totalItems * 0.2) },
  ];

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <span
              className="cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/")}
            >
              Home
            </span>
            <span className="mx-2">/</span>
            <span
              className="cursor-pointer hover:text-blue-600"
              onClick={() => navigate("/categories")}
            >
              Categories
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{currentCategory.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {currentCategory.name}
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                {currentCategory.description}
              </p>
              <div className="text-sm text-gray-500">
                {currentCategory.totalItems.toLocaleString()} items available
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/upload")}
                className="hover:bg-blue-50 hover:border-blue-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Upload Your Design
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/browse")}
              >
                Browse All Categories
              </Button>
            </div>
          </div>
        </div>

        {/* Subcategories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button variant="default" size="sm" className="bg-blue-600">
              All {currentCategory.name}
            </Button>
            {currentCategory.subcategories.map((sub, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="hover:bg-blue-50 hover:border-blue-200"
                onClick={() =>
                  navigate(`/category/${categoryId}?sub=${sub.toLowerCase()}`)
                }
              >
                {sub}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter, index) => (
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
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="under-10">Under $10</SelectItem>
                  <SelectItem value="10-50">$10 - $50</SelectItem>
                  <SelectItem value="over-50">Over $50</SelectItem>
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

        {/* Results Grid */}
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
              onClick={() => navigate(`/design/${item.id}`)}
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
                    {item.isTrending && (
                      <Badge className="bg-red-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/90">
                      {item.type}
                    </Badge>
                  </div>

                  {/* Heart button */}
                  <button
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(item.id)
                          ? "text-red-500 fill-current"
                          : "text-gray-600 hover:text-red-500"
                      }`}
                    />
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

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor(
                        (Date.now() - item.uploadDate.getTime()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days ago
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

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-3 hover:bg-blue-50 hover:border-blue-200"
          >
            Load More {currentCategory.name}
          </Button>
        </div>

        {/* Related Categories */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Related Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Living Room", "Bedroom", "Kitchen", "Bathroom"].map(
              (category, index) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  onClick={() =>
                    navigate(
                      `/category/${category.toLowerCase().replace(" ", "-")}`,
                    )
                  }
                >
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900">{category}</h3>
                    <p className="text-sm text-gray-600">
                      {Math.floor(Math.random() * 5000) + 1000} items
                    </p>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
