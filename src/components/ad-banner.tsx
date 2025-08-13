import { Card, CardContent } from "@/components/ui/card";

export function AdBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <Card className="flex items-center justify-center h-24 bg-muted/50 border-dashed">
          <CardContent className="p-0">
            <p className="text-muted-foreground text-sm">Advertisement</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
