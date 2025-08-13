
import { z } from "zod";

const timetableSchema = z.record(z.array(z.object({
  time: z.string(),
  subject: z.string(),
  class: z.string(),
})));

export const teacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  contact: z.string(),
  dateJoined: z.string(),
  department: z.string(),
  experience: z.string(),
  imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
  timetables: timetableSchema.optional().nullable(),
});

export type Teacher = z.infer<typeof teacherSchema>;
export type Timetable = z.infer<typeof timetableSchema>;
