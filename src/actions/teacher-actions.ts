
"use server";

import { adminDb } from "@/lib/firebase-admin";
import { ref, update, remove } from "firebase/database";
import { teacherSchema } from "@/app/admin/teachers/data/schema";
import { revalidatePath } from "next/cache";

const updateTeacherSchema = teacherSchema.omit({ id: true });

export async function updateTeacher(id: string, data: unknown) {
  try {
    const parsedData = updateTeacherSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, error: parsedData.error.flatten().fieldErrors };
    }
    
    const teacherRef = ref(adminDb, `teachers/${id}`);
    await update(teacherRef, parsedData.data);
    
    revalidatePath("/admin/teachers");
    return { success: true };
  } catch (error) {
    console.error("Error updating teacher:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteTeacher(id: string) {
    try {
        const teacherRef = ref(adminDb, `teachers/${id}`);
        await remove(teacherRef);
        revalidatePath("/admin/teachers");
        return { success: true };
    } catch (error) {
        console.error("Error deleting teacher:", error);
        return { success: false, error: (error as Error).message };
    }
}
