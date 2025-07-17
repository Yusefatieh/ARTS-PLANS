import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  FileText,
  Image,
  Box,
  Palette,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Star,
  Download,
} from "lucide-react";

export default function Sell() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description: "Get paid for every download of your designs",
      detail: "Earn 50-70% commission on all sales",
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Access millions of customers worldwide",
      detail: "Over 10M active users monthly",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Brand",
      description: "Build your reputation as a designer",
      detail: "Get featured in our marketplace",
    },
    {
      icon: Award,
      title: "Quality Recognition",
      description: "Join our exclusive creator community",
      detail: "Special badges and perks",
    },
  ];

  const fileTypes = [
    {
      icon: FileText,
      name: "Floor Plans",
      formats: "DWG, PDF, DXF",
      description: "2D and 3D architectural plans",
      earnings: "$5-50 per download",
    },
    {
      icon: Box,
      name: "3D Models",
      formats: "3DS, OBJ, FBX",
      description: "Furniture and architectural models",
      earnings: "$10-100 per download",
    },
    {
      icon: Image,
      name: "Textures",
      formats: "JPG, PNG, PSD",
      description: "Material and surface textures",
      earnings: "$3-25 per download",
    },
    {
      icon: Palette,
      name: "Design Sets",
      formats: "Various",
      description: "Complete room design packages",
      earnings: "$25-200 per download",
    },
  ];

  const plans = [
    {
      id: "free",
      name: "Free Creator",
      price: "Free",
      commission: "50%",
      features: [
        "Upload up to 20 designs/month",
        "Basic analytics",
        "Community support",
        "Standard review process",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro Creator",
      price: "$29/month",
      commission: "60%",
      features: [
        "Unlimited uploads",
        "Advanced analytics",
        "Priority support",
        "Fast-track review",
        "Featured placement",
        "Custom profile page",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Contact us",
      commission: "70%",
      features: [
        "Everything in Pro",
        "Dedicated account manager",
        "Custom commission rates",
        "White-label options",
        "API access",
        "Volume discounts",
      ],
      popular: false,
    },
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      title: "Architectural Designer",
      avatar: "SC",
      earnings: "$15,000/month",
      downloads: "50K+",
      testimonial:
        "ArtsPlans has transformed my freelance business. I can focus on creating while the platform handles everything else.",
    },
    {
      name: "Mike Rodriguez",
      title: "3D Artist",
      avatar: "MR",
      earnings: "$8,500/month",
      downloads: "25K+",
      testimonial:
        "The quality of customers and consistent income has allowed me to pursue my passion full-time.",
    },
    {
      name: "Emma Watson",
      title: "Interior Designer",
      avatar: "EW",
      earnings: "$12,000/month",
      downloads: "40K+",
      testimonial:
        "Amazing platform with great community support. My designs reach clients I never could have found otherwise.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Your Designs Into
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Passive Income
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Join thousands of creators earning money by selling their interior
              design assets. Upload once, earn forever.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4"
                onClick={() => navigate("/upload")}
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Selling Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-blue-50 px-8 py-4"
                onClick={() => navigate("/creator-guide")}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Watch How It Works
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">$2.5M+</div>
              <div className="text-gray-600">Paid to Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50K+</div>
              <div className="text-gray-600">Active Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10M+</div>
              <div className="text-gray-600">Monthly Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Creator Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Sell on ArtsPlans?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join the world's largest marketplace for interior design assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{benefit.description}</p>
                    <p className="text-sm text-blue-600 font-medium">
                      {benefit.detail}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* File Types Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Can You Sell?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We accept a wide variety of interior design assets and formats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fileTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <Icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {type.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {type.description}
                    </p>
                    <Badge variant="outline" className="mb-3 text-xs">
                      {type.formats}
                    </Badge>
                    <div className="text-green-600 font-semibold text-sm">
                      {type.earnings}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Creator Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the plan that best fits your needs and start earning today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative hover:shadow-xl transition-shadow duration-300 ${
                  plan.popular ? "ring-2 ring-blue-600" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {plan.price}
                  </div>
                  <div className="text-lg text-green-600 font-semibold">
                    {plan.commission} Commission
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-900 hover:bg-gray-800"
                    }`}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      navigate(`/signup?plan=${plan.id}`);
                    }}
                  >
                    {plan.id === "enterprise" ? "Contact Sales" : "Get Started"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Creator Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how our creators are building successful businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      {story.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{story.name}</h3>
                      <p className="text-gray-600 text-sm">{story.title}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {story.earnings}
                      </div>
                      <div className="text-xs text-gray-600">
                        Monthly Earnings
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {story.downloads}
                      </div>
                      <div className="text-xs text-gray-600">
                        Total Downloads
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-gray-600 italic text-sm">
                    "{story.testimonial}"
                  </blockquote>

                  <div className="flex justify-center mt-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Creator Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of creators who are already earning from their
            designs. It takes less than 5 minutes to get started.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4"
              onClick={() => navigate("/signup")}
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Selling Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4"
              onClick={() => navigate("/help")}
            >
              Get Help & Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
