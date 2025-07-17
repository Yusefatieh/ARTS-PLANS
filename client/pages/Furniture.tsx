import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Furniture() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center py-16">
          <CardHeader>
            <CardTitle className="text-3xl font-display font-bold text-brand-dark mb-4">
              Furniture Store
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our curated furniture collection with custom manufacturing options
              is coming soon. Browse thousands of furniture items with smart
              plan suggestions and quality partnerships.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
