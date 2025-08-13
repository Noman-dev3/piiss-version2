
import { z } from "zod";

export const teacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  contact: z.string(),
  dateJoined: z.string(),
  department: z.string(),
  experience: z.string(),
  imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
  // The timetables field is no longer needed.
  // timetables: z.record(timetableSchema).optional().nullable(),
});

export type Teacher = z.infer<typeof teacherSchema>;
