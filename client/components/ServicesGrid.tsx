import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ShoppingBag,
  GraduationCap,
  Hammer,
  Truck,
  Users,
  ArrowRight,
  Download,
  Star,
} from "lucide-react";

export default function ServicesGrid() {
  const navigate = useNavigate();

  const services = [
    {
      id: "floor-plans",
      title: "Floor Plans",
      subtitle: "2D & 3D Designs",
      description: "500+ Ready-made floor plans in AutoCAD & PDF formats",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgPattern: "bg-blue-50",
      iconColor: "text-blue-600",
      count: "500+",
      badge: "Popular",
      route: "/floor-plans",
    },
    {
      id: "furniture",
      title: "Furniture Store",
      subtitle: "Custom Manufacturing",
      description: "1000+ Furniture items with custom options",
      icon: ShoppingBag,
      color: "from-green-500 to-green-600",
      bgPattern: "bg-green-50",
      iconColor: "text-green-600",
      count: "1000+",
      badge: "New Arrivals",
      route: "/furniture",
    },
    {
      id: "courses",
      title: "Design Courses",
      subtitle: "Professional Training",
      description: "Learn AutoCAD, 3ds Max, SketchUp & more",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600",
      bgPattern: "bg-purple-50",
      iconColor: "text-purple-600",
      count: "50+",
      badge: "Certified",
      route: "/courses",
    },
    {
      id: "projects",
      title: "Project Execution",
      subtitle: "End-to-End Service",
      description: "Complete project management & execution",
      icon: Hammer,
      color: "from-orange-500 to-orange-600",
      bgPattern: "bg-orange-50",
      iconColor: "text-orange-600",
      count: "200+",
      badge: "Professional",
      route: "/projects",
    },
    {
      id: "caravans",
      title: "Caravan Designs",
      subtitle: "Mobile Solutions",
      description: "Food trucks, mobile homes & custom designs",
      icon: Truck,
      color: "from-red-500 to-red-600",
      bgPattern: "bg-red-50",
      iconColor: "text-red-600",
      count: "100+",
      badge: "Custom",
      route: "/caravans",
    },
    {
      id: "community",
      title: "Engineer Hub",
      subtitle: "Professional Network",
      description: "Connect with professional designers & engineers",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
      bgPattern: "bg-indigo-50",
      iconColor: "text-indigo-600",
      count: "500+",
      badge: "Expert",
      route: "/community",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-dark mb-4">
            Explore Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover all our comprehensive interior design and execution
            services in one place
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white"
                onClick={() => navigate(service.route)}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <Badge className="bg-white/90 text-gray-700 shadow-sm">
                    {service.badge}
                  </Badge>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-50">
                  <div className={`w-full h-full ${service.bgPattern}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                  </div>
                </div>

                <CardContent className="relative p-0 aspect-square">
                  {/* Top Section - Visual */}
                  <div className="relative h-2/3 flex items-center justify-center overflow-hidden">
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>

                    {/* Icon Container */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-20 h-20 rounded-2xl ${service.bgPattern} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className={`w-10 h-10 ${service.iconColor}`} />
                      </div>

                      {/* Count Badge */}
                      <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">
                          {service.count}
                        </span>
                        <span className="text-xs text-gray-500">items</span>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/20 blur-xl"></div>
                    <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/30 blur-lg"></div>
                  </div>

                  {/* Bottom Section - Content */}
                  <div className="h-1/3 p-6 bg-white relative">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-lg text-brand-dark group-hover:text-brand-secondary transition-colors">
                          {service.title}
                        </h3>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-secondary group-hover:translate-x-1 transition-all duration-300" />
                      </div>

                      <p className="text-sm font-medium text-brand-secondary">
                        {service.subtitle}
                      </p>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-muted-foreground">
            <Download className="w-4 h-4" />
            <span className="text-sm">
              All services available for immediate download and booking
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
