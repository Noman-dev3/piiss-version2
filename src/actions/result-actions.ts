
"use server";

import { adminDb } from "@/lib/firebase-admin";
import { ref, update, remove, set } from "firebase/database";
import { resultSchema } from "@/app/admin/results/data/schema";
import { revalidatePath } from "next/cache";

const updateResultSchema = resultSchema.omit({ id: true, date_created: true });

export async function updateResult(id: string, data: unknown) {
  if (!adminDb) {
    console.error("Firebase Admin SDK not initialized. Check your server environment variables.");
    return { success: false, error: "Database not initialized." };
  }
  try {
    const parsedData = updateResultSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, error: parsedData.error.flatten().fieldErrors };
    }
    
    const resultRef = ref(adminDb, `results/${id}`);
    await update(resultRef, parsedData.data);
    
    revalidatePath("/admin/results");
    return { success: true };
  } catch (error) {
    console.error("Error updating result:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteResult(id: string) {
    if (!adminDb) {
      console.error("Firebase Admin SDK not initialized. Check your server environment variables.");
      return { success: false, error: "Database not initialized." };
    }
    try {
        const resultRef = ref(adminDb, `results/${id}`);
        await remove(resultRef);
        revalidatePath("/admin/results");
        return { success: true };
    } catch (error) {
        console.error("Error deleting result:", error);
        return { success: false, error: (error as Error).message };
    }
}
