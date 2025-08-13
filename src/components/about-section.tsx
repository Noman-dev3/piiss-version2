import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Image from 'next/image';

export default function AboutSection() {
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
              About Our School
            </Badge>
            <h2 className="text-4xl font-bold mb-6 font-headline">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pakistan Islamic International School System (PIISS) began with a
              vision: to provide quality education rooted in Islamic values and
              modern knowledge. At PIISS, learning goes beyond books. We guide
              our students to think deeply, act kindly, and aim high. Our
              classrooms inspire curiosity, our teachers nurture confidence, and
              our community fosters respect. We believe in shaping leaders of
              tomorrow — young minds ready to excel in academics, contribute to
              society, and live with faith and integrity.
            </p>
          </div>
          <div>
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <Image
                src="https://placehold.co/600x450.png"
                alt="Students in a classroom at PIISS"
                width={600}
                height={450}
                className="w-full h-auto object-cover"
                data-ai-hint="students classroom"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
