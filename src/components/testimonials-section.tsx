
"use client";

import * as React from "react";
import { Star, MessageCircle, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { testimonialsSection } from "@/lib/data";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { Testimonial, testimonialSchema } from "@/app/admin/testimonials/data/schema";
import { z } from "zod";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);

  React.useEffect(() => {
    const dbRef = ref(db, 'testimonials');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const itemsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        const parsedItems = z.array(testimonialSchema).safeParse(itemsArray);
        if (parsedItems.success) {
          setTestimonials(parsedItems.data);
        }
      }
    });
    return () => unsubscribe();
  }, []);


  return (
    <section id="testimonials" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary/50">
      <div className="container mx-auto text-center">
        <Badge
          variant="outline"
          className="mb-4 bg-background/50"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {testimonialsSection.badge}
        </Badge>
        <h2 className="text-4xl font-bold mb-4 font-headline">
          {testimonialsSection.title}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-3xl mx-auto">
          {testimonialsSection.description}
        </p>
        {testimonials.length > 0 && (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4 group">
                    <Card className="h-full bg-background/60 rounded-xl shadow-lg transition-all duration-500 transform-style-3d group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20">
                      <CardContent className="p-8 flex flex-col items-start text-left">
                        <div className="flex mb-4">
                          {Array(testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 text-amber-400 fill-amber-400"
                              />
                            ))}
                        </div>
                        <blockquote className="text-lg font-medium text-foreground mb-6">
                        &quot;{testimonial.quote}&quot;
                        </blockquote>
                        <div className="flex items-center gap-4 mt-auto">
                          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                              <User className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-bold font-headline">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
