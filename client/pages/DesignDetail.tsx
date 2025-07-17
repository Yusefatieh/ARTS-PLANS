import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Download,
  Share2,
  Star,
  Eye,
  Calendar,
  FileText,
  Palette,
  Ruler,
  Award,
  Users,
  MessageSquare,
  ShoppingCart,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function DesignDetail() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock design data
  const design = {
    id: designId,
    title: "Modern Villa Floor Plan",
    description:
      "This contemporary villa design features an open-concept layout perfect for modern living. The design includes a spacious kitchen with an island, a large living area, three bedrooms including a master suite, and two and a half bathrooms. The plan maximizes natural light and creates seamless indoor-outdoor flow.",
    creator: {
      name: "ArchDesign Studio",
      username: "archdesign",
      avatar: "AS",
      verified: true,
      followers: 25600,
      rating: 4.9,
      totalDesigns: 234,
    },
    price: "$25",
    originalPrice: "$35",
    downloads: 2341,
    likes: 456,
    views: 12450,
    rating: 4.8,
    reviewCount: 89,
    uploadDate: "2024-01-15",
    category: "Floor Plans",
    tags: ["modern", "villa", "3-bedroom", "open-plan", "luxury"],
    formats: ["DWG", "PDF", "DXF"],
    fileSize: "2.4 MB",
    dimensions: "150m² / 1,615 sq ft",
    specifications: {
      bedrooms: 3,
      bathrooms: 2.5,
      floors: 1,
      garage: 2,
      style: "Modern Contemporary",
    },
    features: [
      "Open concept living",
      "Master suite with walk-in closet",
      "Kitchen island with breakfast bar",
      "Large windows for natural light",
      "Private outdoor patio",
      "Utility/laundry room",
    ],
    software: ["AutoCAD 2024", "SketchUp", "Revit"],
    license: "Standard Commercial License",
  };

  const relatedDesigns = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    title: `Related Design ${i + 1}`,
    creator: "Designer Name",
    price: i % 2 === 0 ? "Free" : `$${Math.floor(Math.random() * 30) + 10}`,
    rating: 4.5 + Math.random() * 0.5,
    downloads: Math.floor(Math.random() * 1000) + 100,
  }));

  const reviews = [
    {
      id: 1,
      user: "John Smith",
      avatar: "JS",
      rating: 5,
      date: "2024-01-20",
      comment:
        "Excellent floor plan! Very detailed and professional. The DWG files are clean and well-organized.",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      avatar: "SJ",
      rating: 4,
      date: "2024-01-18",
      comment:
        "Great design with good use of space. Perfect for my client's needs. Fast download and great quality.",
    },
    {
      id: 3,
      user: "Mike Chen",
      avatar: "MC",
      rating: 5,
      date: "2024-01-15",
      comment:
        "Outstanding work! The attention to detail is impressive. Will definitely purchase more from this creator.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
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
          <span
            className="cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/category/floor-plans")}
          >
            {design.category}
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{design.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview Section */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-600">
                        Floor Plan Preview
                      </p>
                      <p className="text-sm text-gray-500">
                        Click to view full size
                      </p>
                    </div>
                  </div>

                  {/* Action buttons overlay */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorited
                            ? "text-red-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90"
                    >
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </Button>
                  </div>

                  {/* Stats overlay */}
                  <div className="absolute bottom-4 left-4 flex space-x-4">
                    <div className="flex items-center text-white text-sm bg-black/60 rounded-full px-3 py-1">
                      <Eye className="w-4 h-4 mr-2" />
                      {design.views.toLocaleString()} views
                    </div>
                    <div className="flex items-center text-white text-sm bg-black/60 rounded-full px-3 py-1">
                      <Download className="w-4 h-4 mr-2" />
                      {design.downloads.toLocaleString()} downloads
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Title and Basic Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      {design.category}
                    </Badge>
                    <Badge variant="outline">
                      {design.specifications.bedrooms} Bed
                    </Badge>
                    <Badge variant="outline">
                      {design.specifications.bathrooms} Bath
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {design.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{design.rating}</span>
                      <span className="ml-1">
                        ({design.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Updated {design.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {design.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => navigate(`/search?q=${tag}`)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tabs Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specifications">Specs</TabsTrigger>
                <TabsTrigger value="files">Files</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Description</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {design.description}
                    </p>

                    <h4 className="font-semibold mb-3">Key Features:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {design.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Property Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Area:</span>
                            <span className="font-medium">
                              {design.dimensions}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bedrooms:</span>
                            <span className="font-medium">
                              {design.specifications.bedrooms}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bathrooms:</span>
                            <span className="font-medium">
                              {design.specifications.bathrooms}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Floors:</span>
                            <span className="font-medium">
                              {design.specifications.floors}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Garage:</span>
                            <span className="font-medium">
                              {design.specifications.garage} cars
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Style:</span>
                            <span className="font-medium">
                              {design.specifications.style}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Technical Info</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">File Size:</span>
                            <span className="font-medium">
                              {design.fileSize}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Formats:</span>
                            <span className="font-medium">
                              {design.formats.join(", ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Software:</span>
                            <span className="font-medium">
                              {design.software.join(", ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">License:</span>
                            <span className="font-medium">
                              {design.license}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="files" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Included Files</h3>
                    <div className="space-y-3">
                      {design.formats.map((format, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <FileText className="w-5 h-5 text-blue-600 mr-3" />
                            <div>
                              <div className="font-medium">
                                Modern_Villa_Plan.{format.toLowerCase()}
                              </div>
                              <div className="text-sm text-gray-600">
                                {format} Format •{" "}
                                {Math.floor(Math.random() * 2) + 1}.
                                {Math.floor(Math.random() * 9)}MB
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{format}</Badge>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 mb-1">
                            Software Requirements
                          </h4>
                          <p className="text-sm text-blue-800">
                            Files are compatible with{" "}
                            {design.software.join(", ")} and other CAD software
                            that supports these formats.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">
                        Reviews ({design.reviewCount})
                      </h3>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{design.rating}</span>
                        <span className="text-gray-600 ml-1">out of 5</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-6 last:border-b-0"
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {review.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">{review.user}</h4>
                                <span className="text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-blue-600">
                      {design.price}
                    </span>
                    {design.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        {design.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    One-time purchase • Commercial license included
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsFavorited(!isFavorited)}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${
                        isFavorited
                          ? "text-red-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                    {isFavorited ? "Saved" : "Save to Favorites"}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Downloads:</span>
                    <span className="font-medium">
                      {design.downloads.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Likes:</span>
                    <span className="font-medium">{design.likes}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">File Size:</span>
                    <span className="font-medium">{design.fileSize}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creator Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-600 text-white text-lg">
                      {design.creator.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-semibold">{design.creator.name}</h3>
                      {design.creator.verified && (
                        <Award className="w-4 h-4 text-blue-600 ml-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      @{design.creator.username}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4 text-center text-sm">
                  <div>
                    <div className="font-semibold">
                      {design.creator.totalDesigns}
                    </div>
                    <div className="text-gray-600">Designs</div>
                  </div>
                  <div>
                    <div className="font-semibold">
                      {(design.creator.followers / 1000).toFixed(1)}K
                    </div>
                    <div className="text-gray-600">Followers</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">
                        {design.creator.rating}
                      </span>
                    </div>
                    <div className="text-gray-600">Rating</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      navigate(`/creator/${design.creator.username}`)
                    }
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Creator
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Designs */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Designs</h3>
                <div className="space-y-4">
                  {relatedDesigns.map((related) => (
                    <div
                      key={related.id}
                      className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                      onClick={() => navigate(`/design/${related.id}`)}
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {related.title}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">
                          by {related.creator}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-blue-600">
                            {related.price}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            {related.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
