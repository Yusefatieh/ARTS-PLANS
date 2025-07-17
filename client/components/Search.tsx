import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  FileText,
  ShoppingBag,
  GraduationCap,
  Hammer,
  Truck,
  TrendingUp,
  Clock,
  Filter,
  X,
} from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "floor-plans" | "furniture" | "courses" | "projects" | "caravans";
  price?: string;
  rating?: number;
  image?: string;
  tags?: string[];
}

interface SearchProps {
  variant?: "navbar" | "hero" | "full";
  placeholder?: string;
  showFilters?: boolean;
}

export default function SearchComponent({
  variant = "navbar",
  placeholder = "Search floor plans, furniture, courses...",
  showFilters = false,
}: SearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    "Modern villa",
    "2 bedroom apartment",
    "Living room furniture",
    "AutoCAD course",
    "Kitchen design",
    "Food truck layout",
  ]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for search suggestions
  const mockResults: SearchResult[] = [
    {
      id: "1",
      title: "Modern Villa Floor Plan",
      description: "Spacious 3-bedroom villa with open floor concept",
      category: "floor-plans",
      price: "$25",
      rating: 4.8,
      tags: ["villa", "modern", "3bed"],
    },
    {
      id: "2",
      title: "Scandinavian Dining Set",
      description: "6-piece dining set with natural wood finish",
      category: "furniture",
      price: "$899",
      rating: 4.6,
      tags: ["dining", "scandinavian", "wood"],
    },
    {
      id: "3",
      title: "AutoCAD Fundamentals",
      description: "Complete beginner course for 2D drafting",
      category: "courses",
      price: "$49",
      rating: 4.9,
      tags: ["autocad", "beginner", "2d"],
    },
    {
      id: "4",
      title: "Kitchen Renovation Project",
      description: "Complete kitchen makeover with modern appliances",
      category: "projects",
      price: "$12,500",
      tags: ["kitchen", "renovation", "modern"],
    },
    {
      id: "5",
      title: "Mobile Coffee Cart",
      description: "Compact coffee cart design for mobility",
      category: "caravans",
      price: "$35",
      rating: 4.7,
      tags: ["coffee", "mobile", "compact"],
    },
  ];

  const categoryIcons = {
    "floor-plans": FileText,
    furniture: ShoppingBag,
    courses: GraduationCap,
    projects: Hammer,
    caravans: Truck,
  };

  const categoryColors = {
    "floor-plans": "bg-blue-100 text-blue-700",
    furniture: "bg-green-100 text-green-700",
    courses: "bg-purple-100 text-purple-700",
    projects: "bg-orange-100 text-orange-700",
    caravans: "bg-red-100 text-red-700",
  };

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Filter results based on query
    if (query.trim()) {
      const filtered = mockResults.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tags?.some((tag) =>
            tag.toLowerCase().includes(query.toLowerCase()),
          ),
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const updated = [
      searchQuery,
      ...recentSearches.filter((s) => s !== searchQuery),
    ].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));

    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setOpen(false);
    setQuery("");
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(`/${result.category}/${result.id}`);
    setOpen(false);
    setQuery("");
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return "w-full max-w-2xl";
      case "full":
        return "w-full";
      default:
        return "w-64 lg:w-80";
    }
  };

  return (
    <div className={`relative ${getVariantStyles()}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`justify-start text-left font-normal ${
              variant === "hero" ? "h-12 px-4 text-base" : "h-9 px-3 text-sm"
            }`}
            onClick={() => setOpen(true)}
          >
            <Search
              className={`${variant === "hero" ? "w-5 h-5" : "w-4 h-4"} mr-2 text-muted-foreground`}
            />
            <span className="text-muted-foreground">
              {query || placeholder}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`p-0 ${getVariantStyles()}`}
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput
              ref={inputRef}
              placeholder={placeholder}
              value={query}
              onValueChange={setQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  handleSearch(query);
                }
              }}
            />
            <CommandList className="max-h-96">
              {!query.trim() && (
                <>
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <CommandGroup heading="Recent Searches">
                      <div className="flex items-center justify-between px-2 py-1">
                        <span className="text-xs text-muted-foreground">
                          Recent
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearRecentSearches}
                          className="h-auto p-1 text-xs"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      {recentSearches.map((search, index) => (
                        <CommandItem
                          key={index}
                          onSelect={() => handleSearch(search)}
                          className="flex items-center"
                        >
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          {search}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  <CommandSeparator />

                  {/* Popular Searches */}
                  <CommandGroup heading="Popular Searches">
                    <div className="flex items-center px-2 py-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span className="text-xs text-muted-foreground">
                        Trending
                      </span>
                    </div>
                    {popularSearches.map((search, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => handleSearch(search)}
                        className="flex items-center"
                      >
                        <TrendingUp className="w-4 h-4 mr-2 text-muted-foreground" />
                        {search}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {query.trim() && (
                <>
                  {results.length > 0 ? (
                    <CommandGroup heading="Search Results">
                      {results.map((result) => {
                        const Icon = categoryIcons[result.category];
                        return (
                          <CommandItem
                            key={result.id}
                            onSelect={() => handleResultClick(result)}
                            className="flex items-start p-3"
                          >
                            <div
                              className={`flex items-center justify-center w-8 h-8 rounded-lg mr-3 ${categoryColors[result.category]}`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm truncate">
                                  {result.title}
                                </h4>
                                {result.price && (
                                  <span className="font-semibold text-brand-secondary text-sm ml-2">
                                    {result.price}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {result.description}
                              </p>
                              <div className="flex items-center mt-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs mr-2"
                                >
                                  {result.category.replace("-", " ")}
                                </Badge>
                                {result.rating && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    ⭐ {result.rating}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CommandItem>
                        );
                      })}
                      <CommandSeparator />
                      <CommandItem
                        onSelect={() => handleSearch(query)}
                        className="justify-center text-brand-secondary"
                      >
                        View all results for "{query}"
                      </CommandItem>
                    </CommandGroup>
                  ) : (
                    <CommandEmpty>
                      <div className="text-center py-4">
                        <Search className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          No results found for "{query}"
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSearch(query)}
                        >
                          Search anyway
                        </Button>
                      </div>
                    </CommandEmpty>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {showFilters && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => navigate("/search")}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      )}
    </div>
  );
}
