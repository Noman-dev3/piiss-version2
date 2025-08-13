
"use client"
import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Event, eventSchema } from './data/schema';
import { z } from 'zod';
import { EventCard } from './components/event-card';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { CreateEventDialog } from './components/create-event-dialog';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, 'events');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Sort by date, newest first
        const eventsArray = Object.keys(data)
            .map(key => ({
                id: key,
                ...data[key],
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        const parsedEvents = z.array(eventSchema).safeParse(eventsArray);
        if (parsedEvents.success) {
          setEvents(parsedEvents.data);
        } else {
          console.error("Zod validation error:", parsedEvents.error.flatten());
          const validEvents = eventsArray
            .map(item => {
              const result = eventSchema.safeParse(item);
              return result.success ? result.data : null;
            })
            .filter((item): item is Event => item !== null);
          setEvents(validEvents);
        }
      } else {
        console.log("No event data available");
        setEvents([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching events:", error);
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
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-80 rounded-xl" />)}
        </div>
       </div>
    )
  }

  return (
    <>
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <p className="text-muted-foreground">
            Manage upcoming and past school events.
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>
      
      {events.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-1 text-center py-20">
                <h3 className="text-2xl font-bold tracking-tight">
                No events found
                </h3>
                <p className="text-sm text-muted-foreground">
                Click "Create Event" to add a new event.
                </p>
            </div>
        </div>
      )}
    </div>
    <CreateEventDialog isOpen={isCreateOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
