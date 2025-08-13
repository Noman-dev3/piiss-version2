
import { z } from "zod";

export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  role: z.string().min(2, "Role must be at least 2 characters long."),
  quote: z.string().min(10, "Quote must be at least 10 characters long."),
  rating: z.coerce.number().min(1, "Rating is required").max(5, "Rating cannot be more than 5"),
});

export type Testimonial = z.infer<typeof testimonialSchema>;
