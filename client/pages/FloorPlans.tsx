import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Eye,
  Search,
  Filter,
  Grid,
  List,
  Star,
} from "lucide-react";

export default function FloorPlans() {
  const plans = [
    {
      id: 1,
      title: "Modern Villa Floor Plan",
      description: "Spacious 3-bedroom villa with open floor concept",
      bedrooms: 3,
      bathrooms: 2,
      area: "150m²",
      price: "$25",
      rating: 4.8,
      downloads: 234,
      image: "/placeholder.svg",
      tags: ["Villa", "Modern", "Open Plan"],
    },
    {
      id: 2,
      title: "Compact Apartment Design",
      description: "Efficient 2-bedroom apartment layout",
      bedrooms: 2,
      bathrooms: 1,
      area: "85m²",
      price: "$15",
      rating: 4.6,
      downloads: 156,
      image: "/placeholder.svg",
      tags: ["Apartment", "Compact", "Efficient"],
    },
    {
      id: 3,
      title: "Family House Blueprint",
      description: "Traditional 4-bedroom family home",
      bedrooms: 4,
      bathrooms: 3,
      area: "200m²",
      price: "$35",
      rating: 4.9,
      downloads: 389,
      image: "/placeholder.svg",
      tags: ["Family", "Traditional", "Spacious"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-brand-dark mb-4">
            Floor Plans & Downloads
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse our extensive collection of professionally designed floor
            plans. Download in AutoCAD (.dwg) and PDF formats with 3D preview
            capabilities.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-brand-light rounded-xl">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search floor plans..."
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Grid className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button variant="outline" size="sm">
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className="group hover:shadow-xl transition-all duration-300 border border-border overflow-hidden"
            >
              <div className="aspect-video bg-brand-neutral/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 flex items-center justify-center">
                  <FileText className="w-16 h-16 text-brand-primary/50" />
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Badge className="bg-white text-brand-dark">
                    {plan.downloads} downloads
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="flex items-center bg-white rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-xs font-medium">{plan.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg group-hover:text-brand-secondary transition-colors">
                    {plan.title}
                  </CardTitle>
                  <span className="text-lg font-bold text-brand-secondary">
                    {plan.price}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent>
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span>{plan.bedrooms} Bed</span>
                  <span>{plan.bathrooms} Bath</span>
                  <span>{plan.area}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {plan.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-brand-secondary hover:bg-brand-secondary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 hover:bg-brand-secondary hover:text-white"
          >
            Load More Plans
          </Button>
        </div>
      </div>
    </div>
  );
}
