
'use server';

import { db } from '@/lib/firebase';
import { ref, update, remove } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { studentSchema } from '@/app/admin/students/data/schema';

// We can omit fields that we don't want to be editable from the update schema
const updateStudentSchema = studentSchema.omit({ id: true, Date_Added: true, Fee_Slip_Path: true });


export async function updateStudent(id: string, data: z.infer<typeof updateStudentSchema>) {
    try {
        const validatedData = updateStudentSchema.parse(data);
        const studentRef = ref(db, `students/${id}`);
        await update(studentRef, validatedData);
        revalidatePath('/admin/students');
        return { success: true, message: "Student updated successfully." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.flatten().fieldErrors };
        }
        return { success: false, error: { _form: [(error as Error).message] } };
    }
}

export async function deleteStudent(id: string) {
    try {
        const studentRef = ref(db, `students/${id}`);
        await remove(studentRef);
        revalidatePath('/admin/students');
        return { success: true, message: 'Student deleted successfully.' };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
