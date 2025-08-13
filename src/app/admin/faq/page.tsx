
"use client"
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { FAQ, faqSchema } from './data/schema';
import { z } from 'zod';
import { FaqItem } from './components/faq-item';
import { Accordion } from '@/components/ui/accordion';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CreateFaqDialog } from './components/create-faq-dialog';

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, 'faqs');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const itemsArray = Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key],
            }));

        const parsedItems = z.array(faqSchema).safeParse(itemsArray);
        if (parsedItems.success) {
          setFaqs(parsedItems.data);
        } else {
          console.error("Zod validation error:", parsedItems.error.flatten());
          const validItems = itemsArray
            .map(item => {
              const result = faqSchema.safeParse(item);
              return result.success ? result.data : null;
            })
            .filter((item): item is FAQ => item !== null);
          setFaqs(validItems);
        }
      } else {
        console.log("No FAQ data available");
        setFaqs([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching FAQs:", error);
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
          <Skeleton className="h-10 w-36" />
        </div>
        <div className="space-y-4">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
       </div>
    )
  }

  return (
    <>
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Manage the questions and answers on your public FAQ page.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        {faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item) => (
                <FaqItem key={item.id} faq={item} />
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div className="flex flex-col items-center gap-1 text-center py-20">
                  <h3 className="text-2xl font-bold tracking-tight">
                  No FAQs found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                  Click &quot;Add FAQ&quot; to create a new one.
                  </p>
              </div>
          </div>
        )}
      </div>
    </div>
    <CreateFaqDialog isOpen={isCreateOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
