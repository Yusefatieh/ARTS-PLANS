import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  ShoppingBag,
  GraduationCap,
  Hammer,
  Truck,
  Users,
  Download,
  Palette,
  Play,
  CheckCircle,
  ArrowRight,
  Globe,
} from "lucide-react";

export default function Features() {
  const navigate = useNavigate();
  const mainFeatures = [
    {
      icon: FileText,
      title: "Floor Plans & Downloads",
      description:
        "Ready-made 2D floor plans available for instant download in AutoCAD (.dwg) and PDF formats with 3D preview capabilities.",
      features: [
        "AutoCAD & PDF formats",
        "2D/3D block libraries",
        "Interactive 3D viewer",
        "500+ plan variations",
      ],
      color: "bg-blue-500/10 text-blue-600",
      href: "/floor-plans",
    },
    {
      icon: ShoppingBag,
      title: "Furniture Store",
      description:
        "Curated furniture collection with custom manufacturing options linked to contracted factories for personalized solutions.",
      features: [
        "Custom manufacturing",
        "Smart plan suggestions",
        "Quality partnerships",
        "1000+ furniture items",
      ],
      color: "bg-green-500/10 text-green-600",
      href: "/furniture",
    },
    {
      icon: GraduationCap,
      title: "Professional Courses",
      description:
        "Learn industry-standard design software from certified professionals and independent expert engineers.",
      features: [
        "AutoCAD, 3ds Max, SketchUp",
        "Revit, Photoshop courses",
        "Expert instructors",
        "Certification programs",
      ],
      color: "bg-purple-500/10 text-purple-600",
      href: "/courses",
    },
    {
      icon: Hammer,
      title: "Project Execution",
      description:
        "Upload your plans and get competitive quotes from our network of trusted execution partners with project tracking.",
      features: [
        "Competitive quotes",
        "Trusted partners",
        "Project tracking",
        "Installment payments",
      ],
      color: "bg-orange-500/10 text-orange-600",
      href: "/projects",
    },
    {
      icon: Truck,
      title: "Caravan Designs",
      description:
        "Specialized caravan designs for various uses including sleeping caravans, food trucks, and custom projects.",
      features: [
        "Custom designs",
        "Food truck layouts",
        "Sleeping caravans",
        "Personalized requests",
      ],
      color: "bg-red-500/10 text-red-600",
      href: "/caravans",
    },
    {
      icon: Users,
      title: "Engineer Community",
      description:
        "Professional network where engineers showcase portfolios, sell designs, and offer courses with commission-based earnings.",
      features: [
        "Portfolio showcase",
        "Design marketplace",
        "Course creation",
        "Commission earnings",
      ],
      color: "bg-indigo-500/10 text-indigo-600",
      href: "/community",
    },
  ];

  const additionalFeatures = [
    {
      icon: Globe,
      title: "Multi-Language Support",
      description:
        "Full bilingual support with Arabic and English, including RTL layout support.",
    },
    {
      icon: CheckCircle,
      title: "Secure Payments",
      description:
        "Integrated payment processing with Visa, MasterCard, and PayPal support.",
    },
    {
      icon: Download,
      title: "Cloud Storage",
      description:
        "Secure cloud storage for all your uploads, plans, and project files.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-brand-dark mb-4">
            Everything You Need for Interior Design
          </h2>
          <p className="text-lg text-muted-foreground">
            From initial planning to final execution, Arts Plans provides a
            comprehensive ecosystem for homeowners, students, and professional
            designers.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow duration-300 border border-border"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-brand-dark group-hover:text-brand-secondary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-brand-secondary group-hover:text-white group-hover:border-brand-secondary transition-colors"
                    onClick={() => navigate(feature.href)}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="bg-brand-light rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-display font-bold text-brand-dark mb-4">
              Platform Advantages
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and user experience in mind, ensuring
              seamless operation across all devices and languages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-brand-secondary" />
                  </div>
                  <h4 className="text-lg font-semibold text-brand-dark mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-display font-bold mb-4">
            Ready to Transform Your Space?
          </h3>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners, students, and professionals who trust
            Arts Plans for their interior design needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-brand-primary hover:bg-white/90 px-8 py-3 h-auto"
              onClick={() => navigate("/floor-plans")}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-primary px-8 py-3 h-auto"
              onClick={() => navigate("/courses")}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Platform Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
