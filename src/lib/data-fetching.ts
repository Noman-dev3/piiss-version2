import { db } from "@/lib/firebase";
import { get, query, ref } from "firebase/database";
import { z } from "zod";
import {
  topperSchema, Topper,
  teacherSchema, Teacher,
  eventSchema, Event,
  galleryItemSchema, GalleryItem,
  testimonialSchema, Testimonial,
  faqSchema, FAQ,
  boardStudentSchema, BoardStudent
} from "@/app/admin/data-schemas";

// A generic function to fetch data once from Firebase
async function fetchData<T>(dbPath: string, schema: z.ZodType<T[]>): Promise<T[]> {
  try {
    const dataRef = ref(db, dbPath);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const dataArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      
      const parsedData = schema.safeParse(dataArray);
      if (parsedData.success) {
        // Generic date sorting for schemas that have it
        if (parsedData.data.length > 0 && 'date' in parsedData.data[0]) {
          return (parsedData.data as any[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return parsedData.data.reverse(); // Show newest first by default
      } else {
        console.error(`Zod validation error for ${dbPath}:`, parsedData.error.flatten());
        return [];
      }
    }
    return [];
  } catch (error) {
    console.error(`Error fetching data from ${dbPath}:`, error);
    return [];
  }
}


export const getToppers = () => fetchData<Topper>('toppers', z.array(topperSchema));
export const getTeachers = () => fetchData<Teacher>('teachers', z.array(teacherSchema));
export const getEvents = () => fetchData<Event>('events', z.array(eventSchema));
export const getGalleryItems = () => fetchData<GalleryItem>('gallery', z.array(galleryItemSchema));
export const getTestimonials = () => fetchData<Testimonial>('testimonials', z.array(testimonialSchema));
export const getFaqs = () => fetchData<FAQ>('faqs', z.array(faqSchema));
export const getBoardStudents = () => fetchData<BoardStudent>('boardStudents', z.array(boardStudentSchema));

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
