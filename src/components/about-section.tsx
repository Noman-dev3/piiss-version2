
"use client"
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Image from 'next/image';
import { about } from "@/lib/data";

interface AboutSectionProps {
  content: {
    description: string;
    imageUrl: string;
  };
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge
              variant="outline"
              className="mb-4 bg-background/50 border-white/20"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              {about.badge}
            </Badge>
            <h2 className="text-4xl font-bold mb-6 font-headline">{about.title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {content.description || about.description}
            </p>
          </div>
          <div>
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <Image
                src={content.imageUrl || about.image.src}
                alt={about.image.alt}
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                data-ai-hint={about.image.hint}
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
