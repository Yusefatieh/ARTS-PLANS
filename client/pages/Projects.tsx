import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center py-16">
          <CardHeader>
            <CardTitle className="text-3xl font-display font-bold text-brand-dark mb-4">
              Project Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your plans and get competitive quotes from our network of
              trusted execution partners. Project tracking and installment
              payment options available.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
