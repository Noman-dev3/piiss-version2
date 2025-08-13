
import { z } from "zod";

export const galleryItemSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().optional(),
  imageUrl: z.string().url("Please enter a valid URL."),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;
