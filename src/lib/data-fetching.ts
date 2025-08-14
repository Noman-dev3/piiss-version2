
"use client";

import { db } from "@/lib/firebase";
import { ref, onValue, query, limitToLast, limitToFirst, get, Unsubscribe } from "firebase/database";
import { z } from "zod";
import {
  topperSchema, Topper,
  teacherSchema, Teacher,
  eventSchema, Event,
  galleryItemSchema, GalleryItem,
  testimonialSchema, Testimonial,
  faqSchema, FAQ
} from "@/app/admin/data-schemas";

function createDataSubscriber<T>(
    schema: z.ZodType<T[], any>, 
    dbPath: string, 
    limit?: number, 
    order: 'asc' | 'desc' = 'desc'
): (callback: (data: T[]) => void) => Unsubscribe {
  return (callback: (data: T[]) => void): Unsubscribe => {
    let dbQuery;
    if (limit) {
        dbQuery = query(ref(db, dbPath), order === 'desc' ? limitToLast(limit) : limitToFirst(limit));
    } else {
        dbQuery = ref(db, dbPath);
    }
    
    const unsubscribe = onValue(dbQuery, (snapshot) => {
      let items: T[] = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        const itemsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        
        const parsedItems = schema.safeParse(itemsArray);
        if (parsedItems.success) {
          items = parsedItems.data;
          if (order === 'desc' && items.length > 0 && 'date' in items[0]) {
              // @ts-ignore
              items.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          }
           if (limit && order === 'desc') {
             items = items.reverse();
           }
        } else {
          console.error(`Zod validation error for ${dbPath}:`, parsedItems.error.flatten());
        }
      }
      callback(items);
    }, (error) => {
      console.error(`Error fetching ${dbPath}:`, error);
      callback([]);
    });

    return unsubscribe;
  };
}

export const subscribeToToppers = createDataSubscriber(z.array(topperSchema), 'toppers');
export const subscribeToTeachers = createDataSubscriber(z.array(teacherSchema), 'teachers', 3, 'asc');
export const subscribeToEvents = createDataSubscriber(z.array(eventSchema), 'events', 3, 'desc');
export const subscribeToGallery = createDataSubscriber(z.array(galleryItemSchema), 'gallery', 4, 'desc');
export const subscribeToTestimonials = createDataSubscriber(z.array(testimonialSchema), 'testimonials');
export const subscribeToFaqs = createDataSubscriber(z.array(faqSchema), 'faqs');


export async function getSettings() {
    try {
        const settingsRef = ref(db, 'settings');
        const snapshot = await get(settingsRef);
        if (snapshot.exists()) {
            return snapshot.val();
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
    }
    return {};
}
