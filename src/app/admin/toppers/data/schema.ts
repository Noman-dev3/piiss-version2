
import { z } from "zod";

export const topperSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  class: z.string().min(1, "Class cannot be empty."),
  score: z.string().min(1, "Score cannot be empty."),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
});

export type Topper = z.infer<typeof topperSchema>;
