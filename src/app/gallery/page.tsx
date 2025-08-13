import { Header } from "@/components/header";
import { db } from "@/lib/firebase";
import { ref, get, query } from "firebase/database";
import { GalleryItem, galleryItemSchema } from "@/app/admin/gallery/data/schema";
import { z } from "zod";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";


async function getAllGalleryItems(): Promise<GalleryItem[]> {
    const dbRef = query(ref(db, 'gallery'));
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
                return parsedItems.data.reverse();
            }
        }
        return [];
    } catch (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }
}


export default async function AllGalleryPage() {
  const galleryItems = await getAllGalleryItems();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline">School Gallery</h1>
                <p className="text-muted-foreground mt-2">A glimpse into our vibrant campus life.</p>
            </div>
            {galleryItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            ) : (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-bold tracking-tight">Gallery is empty</h3>
                    <p className="text-sm text-muted-foreground">We&apos;ll be adding photos soon. Stay tuned!</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
