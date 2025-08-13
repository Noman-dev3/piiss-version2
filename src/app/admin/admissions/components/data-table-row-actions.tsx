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
import { updateAdmissionStatus, deleteAdmission } from "@/actions/update-admission";
import { useToast } from "@/hooks/use-toast";
import { AdmissionDetailsDialog } from "./admission-details-dialog";


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const admission = admissionSchema.parse(row.original)
  const { toast } = useToast();


  const handleApprove = async () => {
    const result = await updateAdmissionStatus(admission.id, "approved", admission.parentEmail, admission.applicantName);
    if (result.success) {
      toast({ title: "Admission Approved", description: "An approval email has been sent." });
      // Optionally, trigger a re-fetch of data here
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  }

  const handleReject = async () => {
    const result = await updateAdmissionStatus(admission.id, "rejected", admission.parentEmail, admission.applicantName);
     if (result.success) {
      toast({ title: "Admission Rejected", description: "A rejection email has been sent." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  }

  const handleDelete = async () => {
    const result = await deleteAdmission(admission.id);
     if (result.success) {
      toast({ title: "Admission Deleted", description: "The application has been removed." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
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
        <DropdownMenuItem onClick={handleApprove}>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleReject}>
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
