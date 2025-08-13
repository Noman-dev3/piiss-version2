
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, ArrowRight } from "lucide-react";
import Image from "next/image";
import { gallerySection } from "@/lib/data";
import { db } from "@/lib/firebase";
import { ref, query, limitToLast, get } from "firebase/database";
import { GalleryItem, galleryItemSchema } from "@/app/admin/gallery/data/schema";
import { z } from "zod";
import Link from "next/link";
import React from "react";

async function getGalleryItems(): Promise<GalleryItem[]> {
    const dbRef = query(ref(db, 'gallery'), limitToLast(4));
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const itemsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key],
            }));
            const parsedItems = z.array(galleryItemSchema).safeParse(itemsArray);
            if (parsedItems.success) {
                return parsedItems.data.reverse(); // To show latest first
            } else {
                console.error("Zod validation error for gallery:", parsedItems.error.flatten());
            }
        }
    } catch (error) {
        console.error("Error fetching gallery items:", error);
    }
    return [];
}

export default async function GallerySection() {
  const galleryItems = await getGalleryItems();

  return (
    <section id="gallery" className="py-20 lg:py-32 px-6 lg:px-12">
      <div className="container mx-auto text-center">
        <Badge
          variant="outline"
          className="mb-4 bg-secondary/80"
        >
          <Camera className="w-4 h-4 mr-2" />
          {gallerySection.badge}
        </Badge>
        <h2 className="text-4xl font-bold mb-4 font-headline">
          {gallerySection.title}
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          {gallerySection.description}
        </p>
        {galleryItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryItems.map((item, index) => (
                <div key={index} className="group perspective-1000">
                <Card className="overflow-hidden rounded-xl shadow-lg transition-all duration-500 transform-style-3d group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:rotate-y-3">
                    <CardContent className="p-0 relative">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={600}
                        height={450}
                        className="w-full h-auto object-cover aspect-video transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint="gallery image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <h3 className="text-xl font-bold text-white font-headline">
                        {item.title}
                        </h3>
                        <p className="text-white/80 text-sm">{item.description}</p>
                    </div>
                    </CardContent>
                </Card>
                </div>
            ))}
            </div>
        )}
        <div className="mt-16 text-center">
            <Button size="lg" asChild>
                <Link href="/gallery">{gallerySection.viewAllButton} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
