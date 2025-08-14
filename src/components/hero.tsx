import Link from "next/link";
import { Button } from "./ui/button";
import { hero } from "@/lib/data";
import TypingAnimation from "./typing-animation";

interface HeroProps {
  taglines: string[];
}

export function Hero({ taglines }: HeroProps) {
  return (
    <section id="home" className="relative text-center py-20 lg:py-32 bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-secondary/30"></div>
        <div className="absolute inset-0 bg-dot-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1 text-sm text-foreground mb-4">
                <span className="mr-2">{hero.badge.icon}</span>
                {hero.badge.text}
            </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground tracking-tight font-headline">
            {hero.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mt-4 mb-10 max-w-3xl mx-auto min-h-8">
             <TypingAnimation titles={taglines.length > 0 ? taglines : [hero.subtitle]} />
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href={hero.primaryAction.href}>{hero.primaryAction.label}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={hero.secondaryAction.href}>{hero.secondaryAction.label}</Link>
            </Button>
          </div>
        </div>
    </section>
  );
}
