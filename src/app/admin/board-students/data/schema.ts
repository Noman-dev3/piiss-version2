
import { z } from "zod";

export const boardStudentSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  class: z.string().min(1, "Class cannot be empty."),
  boardRollNo: z.string().min(1, "Board Roll No. cannot be empty."),
  obtainedMarks: z.coerce.number().min(0, "Obtained marks must be a positive number."),
  totalMarks: z.coerce.number().min(1, "Total marks must be greater than 0."),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
});

export type BoardStudent = z.infer<typeof boardStudentSchema>;
