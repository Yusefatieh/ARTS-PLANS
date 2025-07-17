import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Download, Users, Award, TrendingUp, Plus } from "lucide-react";

export default function CreatorSpotlight() {
  const navigate = useNavigate();

  const topCreators = [
    {
      id: 1,
      name: "ArchDesign Studio",
      username: "@archdesign",
      avatar: "AS",
      verified: true,
      followers: 25600,
      downloads: 125000,
      rating: 4.9,
      badge: "Top Creator",
      speciality: "Residential Plans",
      recentWork: [
        { title: "Modern Villa", downloads: 2341 },
        { title: "City Apartment", downloads: 1876 },
        { title: "Beach House", downloads: 3102 },
      ],
    },
    {
      id: 2,
      name: "InteriorPro",
      username: "@interiorpro",
      avatar: "IP",
      verified: true,
      followers: 18400,
      downloads: 89000,
      rating: 4.8,
      badge: "Rising Star",
      speciality: "3D Models",
      recentWork: [
        { title: "Luxury Kitchen", downloads: 1567 },
        { title: "Office Space", downloads: 2445 },
        { title: "Bathroom Design", downloads: 1234 },
      ],
    },
    {
      id: 3,
      name: "DesignMaster",
      username: "@designmaster",
      avatar: "DM",
      verified: true,
      followers: 32100,
      downloads: 156000,
      rating: 4.9,
      badge: "Expert",
      speciality: "Furniture Design",
      recentWork: [
        { title: "Living Room Set", downloads: 3456 },
        { title: "Bedroom Suite", downloads: 2789 },
        { title: "Office Furniture", downloads: 1890 },
      ],
    },
    {
      id: 4,
      name: "NordicDesigns",
      username: "@nordicdesigns",
      avatar: "ND",
      verified: false,
      followers: 12800,
      downloads: 45000,
      rating: 4.7,
      badge: "New Talent",
      speciality: "Scandinavian Style",
      recentWork: [
        { title: "Minimal Kitchen", downloads: 1234 },
        { title: "Cozy Bedroom", downloads: 987 },
        { title: "Clean Living", downloads: 1456 },
      ],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Creators
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented designers and architects sharing their work with
            our community
          </p>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topCreators.map((creator) => (
            <Card
              key={creator.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden"
              onClick={() => navigate(`/creator/${creator.username.slice(1)}`)}
            >
              <CardContent className="p-6 text-center">
                {/* Avatar & Badge */}
                <div className="relative mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300">
                    <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      {creator.avatar}
                    </AvatarFallback>
                  </Avatar>

                  {creator.verified && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-600 rounded-full p-1">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Creator Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                      {creator.name}
                    </h3>
                    <p className="text-sm text-gray-600">{creator.username}</p>
                  </div>

                  {/* Badge */}
                  <Badge
                    className={`${
                      creator.badge === "Top Creator"
                        ? "bg-yellow-100 text-yellow-800"
                        : creator.badge === "Expert"
                          ? "bg-purple-100 text-purple-800"
                          : creator.badge === "Rising Star"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {creator.badge}
                  </Badge>

                  {/* Speciality */}
                  <p className="text-sm text-gray-600">{creator.speciality}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center py-3 border-t border-b border-gray-100">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {creator.followers > 1000
                          ? `${(creator.followers / 1000).toFixed(1)}K`
                          : creator.followers}
                      </div>
                      <div className="text-xs text-gray-600">Followers</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {creator.downloads > 1000
                          ? `${(creator.downloads / 1000).toFixed(0)}K`
                          : creator.downloads}
                      </div>
                      <div className="text-xs text-gray-600">Downloads</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-lg font-bold text-gray-900">
                          {creator.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600">Rating</div>
                    </div>
                  </div>

                  {/* Recent Work */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Recent Work:
                    </h4>
                    {creator.recentWork.slice(0, 2).map((work, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-xs text-gray-600"
                      >
                        <span className="truncate">{work.title}</span>
                        <span className="flex items-center ml-2">
                          <Download className="w-3 h-3 mr-1" />
                          {work.downloads.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Follow Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle follow action
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Join Our Creator Community
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Share your designs with millions of users and earn money from your
              creativity
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">Earn Revenue</h4>
                <p className="text-sm opacity-80">
                  Get paid for every download
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">Global Reach</h4>
                <p className="text-sm opacity-80">
                  Connect with worldwide audience
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">Build Reputation</h4>
                <p className="text-sm opacity-80">
                  Grow your professional brand
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => navigate("/join-creators")}
              >
                Start Selling Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
                onClick={() => navigate("/creator-guide")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* View All Creators */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/creators")}
            className="px-8 py-3 border-2 hover:bg-blue-50 hover:border-blue-200"
          >
            View All Creators
          </Button>
        </div>
      </div>
    </section>
  );
}
