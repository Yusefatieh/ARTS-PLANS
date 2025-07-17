import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SearchComponent from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FileText,
  ShoppingBag,
  GraduationCap,
  Hammer,
  Truck,
  Filter,
  Grid,
  List,
  Star,
  Download,
  Eye,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "floor-plans" | "furniture" | "courses" | "projects" | "caravans";
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  downloads?: number;
  image: string;
  tags: string[];
  featured?: boolean;
}

interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: string;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    sortBy: "relevance",
  });

  const query = searchParams.get("q") || "";

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "Modern Villa Floor Plan",
      description:
        "Spacious 3-bedroom villa with open floor concept, perfect for modern families. Includes detailed measurements and 3D visualization.",
      category: "floor-plans",
      price: "$25",
      rating: 4.8,
      reviews: 234,
      downloads: 1250,
      image: "/placeholder.svg",
      tags: ["villa", "modern", "3bed", "open-plan"],
      featured: true,
    },
    {
      id: "2",
      title: "Compact Apartment Design",
      description:
        "Efficient 2-bedroom apartment layout optimized for small spaces with clever storage solutions.",
      category: "floor-plans",
      price: "$15",
      rating: 4.6,
      reviews: 156,
      downloads: 890,
      image: "/placeholder.svg",
      tags: ["apartment", "compact", "2bed", "storage"],
    },
    {
      id: "3",
      title: "Scandinavian Dining Set",
      description:
        "6-piece dining set with natural oak finish. Sustainably sourced wood with modern minimalist design.",
      category: "furniture",
      price: "$899",
      originalPrice: "$1199",
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg",
      tags: ["dining", "scandinavian", "oak", "sustainable"],
    },
    {
      id: "4",
      title: "AutoCAD Fundamentals Course",
      description:
        "Complete beginner course for 2D drafting and design. Includes 40+ hours of video content and practice files.",
      category: "courses",
      price: "$49",
      originalPrice: "$99",
      rating: 4.9,
      reviews: 2340,
      image: "/placeholder.svg",
      tags: ["autocad", "beginner", "2d", "certification"],
      featured: true,
    },
    {
      id: "5",
      title: "Kitchen Renovation Project",
      description:
        "Complete kitchen makeover with modern appliances, custom cabinetry, and granite countertops.",
      category: "projects",
      price: "$12,500",
      rating: 4.7,
      reviews: 45,
      image: "/placeholder.svg",
      tags: ["kitchen", "renovation", "modern", "granite"],
    },
    {
      id: "6",
      title: "Mobile Coffee Cart Design",
      description:
        "Compact coffee cart design for food truck entrepreneurs. Includes equipment layout and electrical plans.",
      category: "caravans",
      price: "$35",
      rating: 4.7,
      reviews: 78,
      image: "/placeholder.svg",
      tags: ["coffee", "mobile", "food-truck", "compact"],
    },
  ];

  const categories = [
    { id: "floor-plans", name: "Floor Plans", icon: FileText, count: 245 },
    { id: "furniture", name: "Furniture", icon: ShoppingBag, count: 1240 },
    { id: "courses", name: "Courses", icon: GraduationCap, count: 89 },
    { id: "projects", name: "Projects", icon: Hammer, count: 156 },
    { id: "caravans", name: "Caravans", icon: Truck, count: 67 },
  ];

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Popular" },
  ];

  useEffect(() => {
    // Simulate search API call
    setIsLoading(true);
    setTimeout(() => {
      if (query) {
        const filtered = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase()) ||
            result.tags.some((tag) =>
              tag.toLowerCase().includes(query.toLowerCase()),
            ),
        );
        setResults(filtered);
      } else {
        setResults(mockResults);
      }
      setIsLoading(false);
    }, 500);
  }, [query]);

  useEffect(() => {
    // Apply filters
    let filtered = [...results];

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((result) =>
        filters.categories.includes(result.category),
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((result) => result.rating >= filters.rating);
    }

    // Sort
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) =>
            parseFloat(a.price.replace(/[$,]/g, "")) -
            parseFloat(b.price.replace(/[$,]/g, "")),
        );
        break;
      case "price-high":
        filtered.sort(
          (a, b) =>
            parseFloat(b.price.replace(/[$,]/g, "")) -
            parseFloat(a.price.replace(/[$,]/g, "")),
        );
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredResults(filtered);
  }, [results, filters]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter("categories", newCategories);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      rating: 0,
      sortBy: "relevance",
    });
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-brand-dark mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <label
                  htmlFor={category.id}
                  className="flex items-center text-sm cursor-pointer flex-1"
                >
                  <Icon className="w-4 h-4 mr-2 text-muted-foreground" />
                  {category.name}
                  <span className="ml-auto text-muted-foreground">
                    ({category.count})
                  </span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-brand-dark mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={() => updateFilter("rating", rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="flex items-center text-sm cursor-pointer"
              >
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2">& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        <X className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-brand-dark">
                {query ? `Search results for "${query}"` : "Browse All"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredResults.length} results found
              </p>
            </div>
            <SearchComponent variant="full" showFilters={false} />
          </div>

          {/* Active Filters */}
          {(filters.categories.length > 0 || filters.rating > 0) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  {categories.find((c) => c.id === category)?.name}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {filters.rating > 0 && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => updateFilter("rating", 0)}
                >
                  {filters.rating}+ Stars
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filters */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Narrow down your search results
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterPanel />
                    </div>
                  </SheetContent>
                </Sheet>

                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => updateFilter("sortBy", value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Results */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted"></div>
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-4"></div>
                      <div className="h-6 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredResults.map((result) => (
                  <Card
                    key={result.id}
                    className={`group hover:shadow-xl transition-all duration-300 ${
                      result.featured ? "ring-2 ring-brand-secondary" : ""
                    } ${viewMode === "list" ? "flex" : ""}`}
                  >
                    {result.featured && (
                      <Badge className="absolute top-2 left-2 z-10 bg-brand-secondary">
                        Featured
                      </Badge>
                    )}

                    <div
                      className={`${
                        viewMode === "grid" ? "aspect-video" : "w-48 h-32"
                      } bg-brand-neutral/20 relative overflow-hidden ${
                        viewMode === "list" ? "flex-shrink-0" : ""
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                        <FileText className="w-16 h-16 text-brand-primary/50" />
                      </div>

                      {result.downloads && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-white">
                            {result.downloads} downloads
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <CardHeader className={viewMode === "list" ? "pb-2" : ""}>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg group-hover:text-brand-secondary transition-colors">
                            {result.title}
                          </CardTitle>
                          <div className="text-right">
                            <div className="font-bold text-brand-secondary">
                              {result.price}
                            </div>
                            {result.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">
                                {result.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">
                              {result.rating}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({result.reviews} reviews)
                          </span>
                          <Badge variant="secondary" className="ml-auto">
                            {result.category.replace("-", " ")}
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {result.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {result.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-brand-secondary hover:bg-brand-secondary/90">
                            <Download className="w-4 h-4 mr-2" />
                            {result.category === "courses"
                              ? "Enroll"
                              : "Download"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredResults.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>Clear all filters</Button>
              </div>
            )}

            {/* Load More */}
            {!isLoading && filteredResults.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Results
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
