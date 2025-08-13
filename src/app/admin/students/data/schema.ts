import { z } from "zod";

export const studentSchema = z.object({
  id: z.string(),
  studentName: z.string(),
  fatherName: z.string(),
  rollNumber: z.string(),
  currentClass: z.string(),
  gender: z.string(),
  dob: z.string(),
  contactNumber: z.string(),
  address: z.string(),
  profilePicture: z.string().url().optional().or(z.literal('')),
});

export type Student = z.infer<typeof studentSchema>;
