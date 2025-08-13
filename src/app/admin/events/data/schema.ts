
import { z } from "zod";

export const eventSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
});

export type Event = z.infer<typeof eventSchema>;
