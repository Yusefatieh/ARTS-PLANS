import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedContent from "@/components/FeaturedContent";
import CreatorSpotlight from "@/components/CreatorSpotlight";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CategoryGrid />
      <FeaturedContent />
      <CreatorSpotlight />
    </div>
  );
}
