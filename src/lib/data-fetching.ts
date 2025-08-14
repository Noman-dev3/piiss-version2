
import { db } from "@/lib/firebase";
import { get, ref } from "firebase/database";
import { z } from "zod";
import {
  topperSchema, Topper,
  teacherSchema, Teacher,
  eventSchema, Event,
  galleryItemSchema, GalleryItem,
  testimonialSchema, Testimonial,
  faqSchema, FAQ,
  boardStudentSchema, BoardStudent,
  resultSchema, Result,
} from "@/app/admin/data-schemas";
import { hero } from "./data";

// A generic function to fetch data once from Firebase
async function fetchData<T extends { id: string }>(dbPath: string, schema: z.ZodArray<z.AnyZodObject>): Promise<T[]> {
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
        let sortedData = parsedData.data as T[];
        // Generic date sorting for schemas that have it
        if (sortedData.length > 0 && 'date' in sortedData[0]) {
           sortedData.sort((a, b) => new Date((a as any).date).getTime() - new Date((b as any).date).getTime());
        } else if (sortedData.length > 0 && 'submittedAt' in sortedData[0]) {
            sortedData.sort((a, b) => new Date((a as any).submittedAt).getTime() - new Date((b as any).submittedAt).getTime());
        } else if (sortedData.length > 0 && 'date_created' in sortedData[0]) {
            sortedData.sort((a, b) => new Date((a as any).date_created).getTime() - new Date((b as any).date_created).getTime());
        }
        return sortedData;
      } else {
        console.error(`Zod validation error for ${dbPath}:`, parsedData.error.flatten());
        // Return valid items even if some fail validation
         const validItems = dataArray
          .map(item => {
            const result = schema.element.safeParse(item);
            return result.success ? result.data as T : null;
          })
          .filter((item): item is T => item !== null);
        return validItems;
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
export const getResults = () => fetchData<Result>('results', z.array(resultSchema));


// Default settings object to prevent errors on the calling page
const defaultSettings = {
    ourStory: "",
    logoUrl: "",
    contactPhone: "",
    contactEmail: "",
    contactAddress: "",
    officeHours: "",
    aboutImageUrl: "",
    contactImageUrl: "",
    schoolDataUrl: "",
    heroTaglines: [hero.subtitle],
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
};

export async function getSettings() {
    try {
        const settingsRef = ref(db, 'settings');
        const snapshot = await get(settingsRef);
        if (snapshot.exists()) {
            const fetchedSettings = snapshot.val();
             // Ensure heroTaglines is an array for backward compatibility
             if (typeof fetchedSettings.heroTaglines === 'string') {
                fetchedSettings.heroTaglines = fetchedSettings.heroTaglines.split('\n').filter((line: string) => line.trim() !== '');
            } else if (!Array.isArray(fetchedSettings.heroTaglines) || fetchedSettings.heroTaglines.length === 0) {
                fetchedSettings.heroTaglines = [hero.subtitle];
            }
            return { ...defaultSettings, ...fetchedSettings };
        }
    } catch (error) {
        console.error("Error fetching settings:", error);
    }
    return defaultSettings;
}
