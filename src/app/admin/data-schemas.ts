
// This file centralizes schemas that are used across both admin and public pages
// to avoid circular dependencies and import errors.

import { z } from "zod";

export const topperSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  class: z.string().min(1, "Class cannot be empty."),
  score: z.string().min(1, "Score cannot be empty."),
  imageUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
});
export type Topper = z.infer<typeof topperSchema>;


export const teacherSchema = z.object({
  id: z.string(),
  name: z.string(),
  bio: z.string().optional().nullable(),
  contact: z.string(),
  dateJoined: z.string(),
  department: z.string(),
  experience: z.string(),
  imageUrl: z.string().url().optional().or(z.literal("")).nullable(),
});
export type Teacher = z.infer<typeof teacherSchema>;

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

export const galleryItemSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().optional(),
  imageUrl: z.string().url("Please enter a valid URL."),
});
export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const testimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long."),
  role: z.string().min(2, "Role must be at least 2 characters long."),
  quote: z.string().min(10, "Quote must be at least 10 characters long."),
  rating: z.coerce.number().min(1, "Rating is required").max(5, "Rating cannot be more than 5"),
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const faqSchema = z.object({
  id: z.string(),
  question: z.string().min(10, "Question must be at least 10 characters long."),
  answer: z.string().min(10, "Answer must be at least 10 characters long."),
});
export type FAQ = z.infer<typeof faqSchema>;


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
