"use client";

import * as React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "./ui/badge";

const toppers = [
  {
    name: "Usman",
    grade: "Grade 8",
    score: "98.5%",
    image: "https://placehold.co/128x128.png",
    hint: "student portrait",
  },
  {
    name: "Aisha Khan",
    grade: "Grade 9",
    score: "97.8%",
    image: "https://placehold.co/128x128.png",
    hint: "student portrait",
  },
  {
    name: "Ali Ahmed",
    grade: "Grade 8",
    score: "97.2%",
    image: "https://placehold.co/128x128.png",
    hint: "student portrait",
  },
  {
    name: "Fatima Raza",
    grade: "Grade 9",
    score: "96.9%",
    image: "https://placehold.co/128x128.png",
    hint: "student portrait",
  },
  {
    name: "Hassan Ali",
    grade: "Grade 8",
    score: "96.5%",
    image: "https://placehold.co/128x128.png",
    hint: "student portrait",
  },
];

export default function ToppersSection() {
  return (
    <section id="results" className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="container mx-auto text-center">
        <Badge
          variant="outline"
          className="mb-4 bg-background/50 border-white/20"
        >
          <Star className="w-4 h-4 mr-2" />
          Our Achievers
        </Badge>
        <h2 className="text-4xl font-bold mb-4 font-headline">
          Our Star Performers
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Celebrating the outstanding achievements of our students who have
          excelled through hard work and dedication.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {toppers.map((topper, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="bg-secondary/50 border-border/50 hover:bg-secondary/80 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl">
                    <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                      <Image
                        src={topper.image}
                        alt={topper.name}
                        width={128}
                        height={128}
                        data-ai-hint={topper.hint}
                        className="rounded-full border-4 border-primary/50 object-cover w-32 h-32"
                      />
                      <div className="text-center">
                        <h3 className="text-xl font-bold font-headline">
                          {topper.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {topper.grade}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold text-lg bg-primary/10 px-4 py-2 rounded-full">
                        <Star className="w-5 h-5" />
                        <span>{topper.score}</span>
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
      </div>
    </section>
  );
}