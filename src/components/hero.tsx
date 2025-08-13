import Link from "next/link";
import { Button } from "./ui/button";
import { hero } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="relative text-center py-20 lg:py-32 bg-gradient-to-br from-background via-background to-secondary/40">
        <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:invert"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center rounded-full bg-secondary/80 px-3 py-1 text-sm text-foreground mb-4">
                <span className="mr-2">{hero.badge.icon}</span>
                {hero.badge.text}
            </div>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground tracking-tight font-headline">
            {hero.title}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mt-4 mb-10 max-w-3xl mx-auto">
            {hero.subtitle}
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
