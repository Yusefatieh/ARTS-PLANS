import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Courses() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="text-center py-16">
          <CardHeader>
            <CardTitle className="text-3xl font-display font-bold text-brand-dark mb-4">
              Professional Design Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn industry-standard design software from certified
              professionals. Courses covering AutoCAD, 3ds Max, SketchUp, Revit,
              and Photoshop coming soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
