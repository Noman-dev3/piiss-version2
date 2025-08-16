
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
async function fetchData<T extends { id: string }>(dbPath: string, schema: z.ZodType<T, any, any>): Promise<T[]> {
  try {
    const dataRef = ref(db, dbPath);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const dataArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      
      const validItems = dataArray
        .map(item => {
          const result = schema.safeParse(item);
          if (result.success) {
            return result.data;
          } else {
            // console.warn(`Zod validation failed for item in ${dbPath} with id ${item.id}:`, result.error.flatten());
            return null;
          }
        })
        .filter((item): item is T => item !== null);

      let sortedData = validItems;
      // Generic date sorting for schemas that have it
      if (sortedData.length > 0 && 'date' in sortedData[0]) {
          sortedData.sort((a, b) => new Date((b as any).date).getTime() - new Date((a as any).date).getTime());
      } else if (sortedData.length > 0 && 'submittedAt' in sortedData[0]) {
          sortedData.sort((a, b) => new Date((b as any).submittedAt).getTime() - new Date((a as any).submittedAt).getTime());
      } else if (sortedData.length > 0 && 'date_created' in sortedData[0]) {
          sortedData.sort((a, b) => new Date((b as any).date_created).getTime() - new Date((a as any).date_created).getTime());
      }
      return sortedData;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching data from ${dbPath}:`, error);
    return [];
  }
}

export const getToppers = () => fetchData<Topper>('toppers', topperSchema);
export const getTeachers = () => fetchData<Teacher>('teachers', teacherSchema);
export const getEvents = () => fetchData<Event>('events', eventSchema);
export const getGalleryItems = () => fetchData<GalleryItem>('gallery', galleryItemSchema);
export const getTestimonials = () => fetchData<Testimonial>('testimonials', testimonialSchema);
export const getFaqs = () => fetchData<FAQ>('faqs', faqSchema);
export const getBoardStudents = () => fetchData<BoardStudent>('boardStudents', boardStudentSchema);
export const getResults = () => fetchData<Result>('results', resultSchema);


// Default settings object to prevent errors on the calling page
const defaultSettings = {
    ourStory: "Our school's story has not been set up yet.",
    logoUrl: "",
    contactPhone: "Not available",
    contactEmail: "Not available",
    contactAddress: "Not available",
    officeHours: "Not available",
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
