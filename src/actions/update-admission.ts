
"use server";

import { adminDb } from "@/lib/firebase-admin";
import { ref, update, remove } from "firebase/database";
import { sendEmail } from "./send-email";
import { revalidatePath } from "next/cache";


export async function updateAdmissionStatus(id: string, status: 'approved' | 'rejected', email: string, name: string) {
  try {
    const admissionRef = ref(adminDb, `admissionSubmissions/${id}`);
    await update(admissionRef, { status });

    const subject = status === 'approved' 
      ? "Congratulations! Your Admission to PIISS is Approved" 
      : "Update on Your Admission Application to PIISS";
      
    const body = status === 'approved'
      ? `<p>Dear ${name},</p><p>We are delighted to inform you that your admission to Pakistan Islamic International School System (PIISS) has been approved. Welcome to our community!</p><p>Further details regarding orientation and class commencement will be shared with you shortly.</p><p>Best regards,<br/>PIISS Admissions Office</p>`
      : `<p>Dear ${name},</p><p>Thank you for your interest in Pakistan Islamic International School System (PIISS). After careful consideration, we regret to inform you that we are unable to offer you a place at this time.</p><p>We wish you the best in your academic future.</p><p>Sincerely,<br/>PIISS Admissions Office</p>`;

    const emailResult = await sendEmail({ to: email, subject, html: body });

    if (!emailResult.success) {
      // Even if email fails, the status update was successful. 
      // Log the email error but return success for the overall operation for now.
      console.error("Failed to send email but status updated:", emailResult.error);
    }
    
    revalidatePath("/admin/admissions");
    return { success: true };
  } catch (error) {
    console.error("Error updating admission status:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteAdmission(id: string) {
    try {
        const admissionRef = ref(adminDb, `admissionSubmissions/${id}`);
        await remove(admissionRef);
        revalidatePath("/admin/admissions");
        return { success: true };
    } catch (error) {
        console.error("Error deleting admission:", error);
        return { success: false, error: (error as Error).message };
    }
}
