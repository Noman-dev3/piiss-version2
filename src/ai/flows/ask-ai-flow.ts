
'use server';
/**
 * @fileOverview An AI assistant flow to answer user questions about the school.
 * 
 * - askAI - The main function to call the AI assistant.
 * - AskAiInput - The Zod schema for the input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { faqSchema, teacherSchema, eventSchema, topperSchema, boardStudentSchema } from '@/app/admin/data-schemas';

export const AskAiInputSchema = z.object({
    question: z.string().describe("The user's question about the school."),
    faqs: z.array(faqSchema).describe("A list of frequently asked questions and their answers."),
    settings: z.any().describe("General settings and content for the website, like 'about us' and contact info."),
    teachers: z.array(teacherSchema).describe("A list of the school's teachers."),
    events: z.array(eventSchema).describe("A list of school events."),
    toppers: z.array(topperSchema).describe("A list of class toppers."),
    boardStudents: z.array(boardStudentSchema).describe("A list of students with board results."),
});

export type AskAiInput = z.infer<typeof AskAiInputSchema>;

export async function askAI(input: AskAiInput): Promise<string> {
    const { output } = await askAiPrompt.generate({ input });
    return output!;
}

const askAiPrompt = ai.definePrompt(
  {
    name: 'askAiPrompt',
    input: { schema: AskAiInputSchema },
    output: { format: 'text' },
    prompt: `You are a friendly, expert assistant for the Pakistan Islamic International School System (PIISS). Your goal is to answer the user's question based ONLY on the context provided below.

Be concise and helpful. If the answer isn't in the context, say "I'm sorry, I don't have that information. Please contact the school directly for more details." Do not make up information.

**User's Question:**
"{{{question}}}"

---

**Available Information (Context):**

**1. General Information & About Us:**
- **Our Story/About Us:** {{{settings.ourStory}}}
- **Contact Phone:** {{{settings.contactPhone}}}
- **Contact Email:** {{{settings.contactEmail}}}
- **Address:** {{{settings.contactAddress}}}
- **Office Hours:** {{{settings.officeHours}}}

**2. Frequently Asked Questions:**
{{#each faqs}}
- **Q:** {{question}}
  **A:** {{answer}}
{{/each}}

**3. Faculty/Teachers:**
{{#each teachers}}
- Teacher **{{name}}** is in the **{{department}}** department, has **{{experience}}** of experience, and can be contacted via **{{contact}}**.
{{/each}}

**4. School Events:**
{{#each events}}
- The event **"{{title}}"** is scheduled for **{{date}}**. Description: {{description}}
{{/each}}

**5. Class Toppers (High Achievers):**
{{#each toppers}}
- **{{name}}** from Class **{{class}}** is a top performer with a score/grade of **{{score}}**.
{{/each}}

**6. Board Students Results:**
{{#each boardStudents}}
- **{{name}}** (Roll No: {{boardRollNo}}) from Class **{{class}}** scored **{{obtainedMarks}}** out of **{{totalMarks}}** marks.
{{/each}}
---

Based SOLELY on the information above, please provide the best possible answer to the user's question. Do not mention that you are an AI. Just answer the question directly.
`,
  },
);
