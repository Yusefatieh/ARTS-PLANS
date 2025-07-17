import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
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
  ShoppingCart,
  Plus,
  Minus,
  X,
} from "lucide-react";

export default function Shop() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: "floor-plans", name: "Floor Plans", count: 15247 },
    { id: "3d-models", name: "3D Models", count: 8567 },
    { id: "furniture", name: "Furniture Sets", count: 12134 },
    { id: "textures", name: "Textures", count: 6823 },
    { id: "lighting", name: "Lighting Plans", count: 4256 },
    { id: "landscaping", name: "Landscaping", count: 3187 },
  ];

  const products = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Interior Design Asset ${i + 1}`,
    creator: `Designer ${Math.floor(Math.random() * 100) + 1}`,
    category: categories[i % categories.length].id,
    type: ["Floor Plan", "3D Model", "Furniture Set", "Texture Pack"][i % 4],
    downloads: Math.floor(Math.random() * 5000) + 100,
    likes: Math.floor(Math.random() * 1000) + 50,
    rating: 4.0 + Math.random() * 1.0,
    price: i % 5 === 0 ? 0 : Math.floor(Math.random() * 80) + 5,
    originalPrice: i % 3 === 0 ? Math.floor(Math.random() * 40) + 60 : null,
    isPremium: i % 6 === 0,
    isTrending: i % 8 === 0,
    isNew: i % 7 === 0,
    formats: ["DWG", "PDF", "3DS", "OBJ"][i % 4],
    image: `/placeholder-${(i % 6) + 1}.jpg`,
  }));

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label
                htmlFor={category.id}
                className="flex items-center text-sm cursor-pointer flex-1"
              >
                {category.name}
                <span className="ml-auto text-gray-500">
                  ({category.count.toLocaleString()})
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            step={5}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPriceRange([0, 0])}
            >
              Free Only
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPriceRange([1, 200])}
            >
              Paid Only
            </Button>
          </div>
        </div>
      </div>

      {/* File Formats */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">File Formats</h3>
        <div className="space-y-2">
          {["DWG", "PDF", "3DS", "OBJ", "FBX", "SKP"].map((format) => (
            <div key={format} className="flex items-center space-x-2">
              <Checkbox id={format} />
              <label htmlFor={format} className="text-sm cursor-pointer">
                {format}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 100]);
        }}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Shopping Cart Sidebar */}
      <Sheet open={showCart} onOpenChange={setShowCart}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Shopping Cart ({totalItems})</SheetTitle>
            <SheetDescription>
              Review your items before checkout
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-600">
                          by {item.creator}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-blue-600">
                            ${item.price}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity === 1}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Interior Design Shop
            </h1>
            <p className="text-lg text-gray-600">
              Professional design assets for your projects
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                  {totalItems}
                </Badge>
              )}
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/upload")}
            >
              Sell Your Designs
            </Button>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-600">
                    {category.count.toLocaleString()} items
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Filters
                </h2>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
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

                <div className="text-sm text-gray-600">
                  {products.length.toLocaleString()} products found
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="downloads">Most Downloads</SelectItem>
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
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {products.map((product) => (
                <Card
                  key={product.id}
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
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/design/${product.id}`);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Top badges */}
                      <div className="absolute top-3 left-3 flex space-x-2">
                        {product.isPremium && (
                          <Badge className="bg-yellow-500 text-yellow-900">
                            Premium
                          </Badge>
                        )}
                        {product.isTrending && (
                          <Badge className="bg-red-500 text-white">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-green-500 text-white">New</Badge>
                        )}
                        <Badge variant="secondary" className="bg-white/90">
                          {product.formats}
                        </Badge>
                      </div>

                      {/* Heart button */}
                      <button
                        className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(product.id);
                        }}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(product.id)
                              ? "text-red-500 fill-current"
                              : "text-gray-600 hover:text-red-500"
                          }`}
                        />
                      </button>

                      {/* Stats */}
                      <div className="absolute bottom-3 left-3 flex space-x-3">
                        <div className="flex items-center text-white text-xs bg-black/50 rounded-full px-2 py-1">
                          <Download className="w-3 h-3 mr-1" />
                          {product.downloads.toLocaleString()}
                        </div>
                        <div className="flex items-center text-white text-xs bg-black/50 rounded-full px-2 py-1">
                          <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                          {product.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                            {product.title}
                          </h3>
                          <p className="text-xs text-gray-600">
                            by {product.creator}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            {product.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                            <span className="font-bold text-blue-600">
                              {product.price === 0
                                ? "Free"
                                : `$${product.price}`}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {product.type}
                        </Badge>
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Add to Cart
                        </Button>
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
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
