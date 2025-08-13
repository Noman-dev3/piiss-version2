
"use server";

import { adminDb } from "@/lib/firebase-admin";
import { ref, update, remove } from "firebase/database";
import { studentSchema } from "@/app/admin/students/data/schema";
import { revalidatePath } from "next/cache";

const updateStudentSchema = studentSchema.omit({ id: true, Date_Added: true, Fee_Slip_Path: true });

export async function updateStudent(id: string, data: unknown) {
  if (!adminDb) {
    console.error("Firebase Admin SDK not initialized. Check your server environment variables.");
    return { success: false, error: "Database not initialized." };
  }
  try {
    const parsedData = updateStudentSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, error: parsedData.error.flatten().fieldErrors };
    }
    
    const studentRef = ref(adminDb, `students/${id}`);
    await update(studentRef, parsedData.data);
    
    revalidatePath("/admin/students");
    return { success: true };
  } catch (error) {
    console.error("Error updating student:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteStudent(id: string) {
    if (!adminDb) {
      console.error("Firebase Admin SDK not initialized. Check your server environment variables.");
      return { success: false, error: "Database not initialized." };
    }
    try {
        const studentRef = ref(adminDb, `students/${id}`);
        await remove(studentRef);
        revalidatePath("/admin/students");
        return { success: true };
    } catch (error) {
        console.error("Error deleting student:", error);
        return { success: false, error: (error as Error).message };
    }
}
