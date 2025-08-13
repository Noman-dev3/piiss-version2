
'use server';

import { db } from '@/lib/firebase';
import { ref, update, remove } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { teacherSchema } from '@/app/admin/teachers/data/schema';

// We can omit fields that we don't want to be editable from the update schema
const updateTeacherSchema = teacherSchema.omit({ id: true });


export async function updateTeacher(id: string, data: z.infer<typeof updateTeacherSchema>) {
    try {
        const validatedData = updateTeacherSchema.parse(data);
        const teacherRef = ref(db, `teachers/${id}`);
        await update(teacherRef, validatedData);
        revalidatePath('/admin/teachers');
        return { success: true, message: "Teacher updated successfully." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.flatten().fieldErrors };
        }
        return { success: false, error: { _form: [(error as Error).message] } };
    }
}

export async function deleteTeacher(id: string) {
    try {
        const teacherRef = ref(db, `teachers/${id}`);
        await remove(teacherRef);
        revalidatePath('/admin/teachers');
        return { success: true, message: 'Teacher deleted successfully.' };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
