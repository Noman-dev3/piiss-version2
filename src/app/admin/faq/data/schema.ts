
import { z } from "zod";

export const faqSchema = z.object({
  id: z.string(),
  question: z.string().min(10, "Question must be at least 10 characters long."),
  answer: z.string().min(10, "Answer must be at least 10 characters long."),
});

export type FAQ = z.infer<typeof faqSchema>;
