'use server';
/**
 * @fileOverview An AI assistant flow to answer user questions about the school.
 * 
 * - askAI - The main function to call the AI assistant.
 * - AskAiInput - The Zod schema for the input.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { FAQ } from '@/app/admin/data-schemas';

export const AskAiInputSchema = z.object({
    question: z.string().describe("The user's question about the school."),
    faqs: z.array(z.object({
        question: z.string(),
        answer: z.string(),
    })).describe("A list of frequently asked questions and their answers."),
    settings: z.any().describe("General settings and content for the website, like 'about us' and contact info."),
});

export type AskAiInput = z.infer<typeof AskAiInputSchema>;

export async function askAI(input: AskAiInput): Promise<string> {
    const { output } = await askAiPrompt.generate({ input });
    return output!;
}

const askAiPrompt = ai.definePrompt(
  {
    name: 'askAiPrompt',
    input: { schema: AskAiTplInputSchema },
    output: { format: 'text' },
    prompt: `You are a friendly and helpful assistant for the Pakistan Islamic International School System (PIISS). Your goal is to answer the user's question based on the context provided below.

Be concise and helpful. If the answer isn't in the context, say "I'm sorry, I don't have that information. Please contact the school directly for more details." Do not make up information.

**User's Question:**
"{{{question}}}"

---

**Available Information (Context):**

**1. General Information & About Us:**
- **Our Story:** {{{settings.ourStory}}}
- **Contact Phone:** {{{settings.contactPhone}}}
- **Contact Email:** {{{settings.contactEmail}}}
- **Address:** {{{settings.contactAddress}}}
- **Office Hours:** {{{settings.officeHours}}}

**2. Frequently Asked Questions:**
{{#each faqs}}
- **Q:** {{question}}
  **A:** {{answer}}
{{/each}}

---

Based on the information above, please provide the best possible answer to the user's question.
`,
  },
);
