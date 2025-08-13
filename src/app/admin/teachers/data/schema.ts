
import { z } from "zod";

const timeSlotSchema = z.object({
  time: z.string().optional(),
  period: z.string().optional(),
  subject: z.string(),
  class: z.string(),
});

// The values of a day object are time slots, but the keys are numeric strings ("0", "1", etc.)
const daySchema = z.record(timeSlotSchema);

const timetableSchema = z.record(daySchema);

export const teacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().optional(),
  contact: z.string(),
  dateJoined: z.string(),
  department: z.string(),
  experience: z.string(),
  imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
  // Timetables is an object where the key is the teacher's ID
  timetables: z.record(timetableSchema).optional().nullable(),
});

export type Teacher = z.infer<typeof teacherSchema>;
export type Timetable = z.infer<typeof timetableSchema>;
