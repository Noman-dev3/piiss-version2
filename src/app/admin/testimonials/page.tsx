
"use client"
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Testimonial, testimonialSchema } from './data/schema';
import { z } from 'zod';
import { TestimonialCard } from './components/testimonial-card';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CreateTestimonialDialog } from './components/create-testimonial-dialog';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, 'testimonials');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const itemsArray = Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key],
            }));

        const parsedItems = z.array(testimonialSchema).safeParse(itemsArray);
        if (parsedItems.success) {
          setTestimonials(parsedItems.data);
        } else {
          console.error("Zod validation error:", parsedItems.error.flatten());
          const validItems = itemsArray
            .map(item => {
              const result = testimonialSchema.safeParse(item);
              return result.success ? result.data : null;
            })
            .filter((item): item is Testimonial => item !== null);
          setTestimonials(validItems);
        }
      } else {
        console.log("No testimonial data available");
        setTestimonials([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching testimonials:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if(loading) {
    return (
       <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
       </div>
    )
  }

  return (
    <>
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-muted-foreground">
            Manage your school's testimonials.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>
      
      {testimonials.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-1 text-center py-20">
                <h3 className="text-2xl font-bold tracking-tight">
                No testimonials found
                </h3>
                <p className="text-sm text-muted-foreground">
                Click "Add Testimonial" to add a new one.
                </p>
            </div>
        </div>
      )}
    </div>
    <CreateTestimonialDialog isOpen={isCreateOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
