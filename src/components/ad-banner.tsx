import { Card } from "@/components/ui/card";

export function AdBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <Card className="flex items-center justify-center min-h-[100px] bg-muted/50 border-dashed">
          {/* 
            STEP 1: Sign up for an ad network like Google AdSense.
            STEP 2: Get your ad code snippet.
            STEP 3: Paste that code snippet right here.
          */}
        </Card>
      </div>
    </section>
  );
}
