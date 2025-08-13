import { featuresSection } from "@/lib/data";

export function Features() {
  return (
    <section id="features" className="py-20 lg:py-32">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">{featuresSection.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuresSection.features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 flex items-center gap-4 hover:bg-accent transition-colors cursor-pointer"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold text-card-foreground">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
