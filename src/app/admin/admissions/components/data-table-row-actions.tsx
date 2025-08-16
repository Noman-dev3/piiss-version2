
"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"
import { Check, X, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { admissionSchema } from "../data/schema"
import { useToast } from "@/hooks/use-toast"
import { AdmissionDetailsDialog } from "./admission-details-dialog";
import { db } from "@/lib/firebase";
import { ref, update, remove } from "firebase/database";
import { sendEmail } from "@/actions/send-email";
import { revalidatePath } from "next/cache";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const admission = admissionSchema.parse(row.original)
  const { toast } = useToast();

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    try {
      const admissionRef = ref(db, `admissionSubmissions/${admission.id}`);
      await update(admissionRef, { status });
      revalidatePath('/admin/admissions');

      const subject = status === 'approved' 
        ? "Congratulations! Your Admission to PIISS is Approved" 
        : "Update on Your Admission Application to PIISS";
        
      const body = status === 'approved'
        ? `<p>Dear ${admission.applicantName},</p><p>We are delighted to inform you that your admission to Pakistan Islamic International School System (PIISS) has been approved. Welcome to our community!</p><p>Further details regarding orientation and class commencement will be shared with you shortly.</p><p>Best regards,<br/>PIISS Admissions Office</p>`
        : `<p>Dear ${admission.applicantName},</p><p>Thank you for your interest in Pakistan Islamic International School System (PIISS). After careful consideration, we regret to inform you that we are unable to offer you a place at this time.</p><p>We wish you the best in your academic future.</p><p>Sincerely,<br/>PIISS Admissions Office</p>`;

      await sendEmail({ 
        to: admission.parentEmail, 
        subject, 
        html: body, 
        fromName: "PIISS Admissions Office", 
        fromEmail: "noreply@piiss.edu.pk" 
      });

      toast({ 
        title: `Admission ${status.charAt(0).toUpperCase() + status.slice(1)}`, 
        description: `An email has been sent to ${admission.parentEmail}.` 
      });

    } catch (error) {
      console.error("Error updating admission status:", error);
      toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  }


  const handleDelete = async () => {
    try {
        const admissionRef = ref(db, `admissionSubmissions/${admission.id}`);
        await remove(admissionRef);
        revalidatePath('/admin/admissions');
        toast({ title: "Admission Deleted", description: "The application has been removed." });
    } catch (error) {
        toast({ title: "Error", description: (error as Error).message, variant: "destructive" });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem asChild>
          <AdmissionDetailsDialog admission={admission} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleStatusUpdate('approved')}>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate('rejected')}>
           <X className="mr-2 h-4 w-4 text-red-500" />
          Reject
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
