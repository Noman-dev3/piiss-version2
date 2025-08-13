
'use server';

import { db } from '@/lib/firebase';
import { ref, update, remove } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { resultSchema } from '@/app/admin/results/data/schema';

// We can omit fields that we don't want to be editable from the update schema
const updateResultSchema = resultSchema.omit({ id: true, date_created: true });


export async function updateResult(id: string, data: z.infer<typeof updateResultSchema>) {
    try {
        const validatedData = updateResultSchema.parse(data);
        const resultRef = ref(db, `results/${id}`);
        await update(resultRef, validatedData);
        revalidatePath('/admin/results');
        return { success: true, message: "Result updated successfully." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.flatten().fieldErrors };
        }
        return { success: false, error: { _form: [(error as Error).message] } };
    }
}

export async function deleteResult(id: string) {
    try {
        const resultRef = ref(db, `results/${id}`);
        await remove(resultRef);
        revalidatePath('/admin/results');
        return { success: true, message: 'Result deleted successfully.' };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
