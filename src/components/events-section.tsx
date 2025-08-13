
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, ArrowRight, PartyPopper } from "lucide-react";
import { eventsSection } from "@/lib/data";
import { db } from "@/lib/firebase";
import { ref, onValue, query, limitToLast } from "firebase/database";
import { Event, eventSchema } from "@/app/admin/events/data/schema";
import { z } from "zod";
import { format } from "date-fns";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = query(ref(db, 'events'), limitToLast(3));
    const unsubscribe = onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const itemsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key],
            })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
            const parsedItems = z.array(eventSchema).safeParse(itemsArray);
            if (parsedItems.success) {
                setEvents(parsedItems.data);
            } else {
                console.error("Zod validation error for events:", parsedItems.error.flatten());
            }
        }
        setLoading(false);
    }, (error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="events" className="py-20 lg:py-32 px-6 lg:px-12 bg-secondary/50">
      <div className="container mx-auto text-center">
        <Badge
          variant="outline"
          className="mb-4 bg-background/50"
        >
          <PartyPopper className="w-4 h-4 mr-2" />
          {eventsSection.badge}
        </Badge>
        <h2 className="text-4xl font-bold mb-4 font-headline">{eventsSection.title}</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          {eventsSection.description}
        </p>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse" />)}
           </div>
        ) : events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {events.map((event, index) => (
                <div key={index} className="group perspective-1000">
                    <Card className="h-full bg-background/60 rounded-xl shadow-lg transition-all duration-500 transform-style-3d group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-muted-foreground mb-4">
                                <CalendarDays className="w-5 h-5 mr-3 text-primary" />
                                <span className="text-sm font-medium">{format(new Date(event.date), "PPP")}</span>
                            </div>
                            <p className="text-muted-foreground/80">{event.description}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
            </div>
        )}

        <div className="mt-16 text-center">
            <Button size="lg" variant="outline" asChild>
                <Link href="/events">{eventsSection.viewAllButton} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
