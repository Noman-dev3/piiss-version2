import { z } from "zod"

// This schema is used to validate the data from the database
export const admissionSchema = z.object({
  id: z.string(),
  applicantName: z.string(),
  appliedClass: z.string(),
  status: z.string(),
  parentEmail: z.string().email(),
  parentPhone: z.string(),
  submittedAt: z.string(),
})

export type Admission = z.infer<typeof admissionSchema>
