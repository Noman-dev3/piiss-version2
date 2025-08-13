import { z } from "zod"

export const admissionSchema = z.object({
  id: z.string(),
  applicantFullName: z.string(),
  applyingForClass: z.string(),
  status: z.string(),
  parentEmail: z.string().email(),
  parentPhone: z.string(),
  submittedAt: z.string(),
})

export type Admission = z.infer<typeof admissionSchema>
