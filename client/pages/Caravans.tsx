import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Caravans() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center py-16">
          <CardHeader>
            <CardTitle className="text-3xl font-display font-bold text-brand-dark mb-4">
              Caravan Designs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized caravan designs for various uses including sleeping
              caravans, food trucks, and custom projects. Request personalized
              caravan designs coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
