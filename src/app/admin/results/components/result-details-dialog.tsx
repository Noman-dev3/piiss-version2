
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Result } from "../data/schema"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface ResultDetailsDialogProps {
  result: Result;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DetailItem = ({ label, value, className }: { label: string, value: string | number | undefined, className?: string }) => (
  <div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className={`text-base font-semibold ${className}`}>{value ?? 'N/A'}</p>
  </div>
);


export function ResultDetailsDialog({ result, isOpen, onOpenChange }: ResultDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-headline">Result for {result.student_name}</DialogTitle>
            <DialogDescription>
                Roll No: {result.roll_number} | Class: {result.class}
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto pr-4">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
              <DetailItem label="Grade" value={result.grade} />
              <DetailItem label="Percentage" value={`${result.percentage}%`} />
              <DetailItem label="Total Marks" value={result.total_marks} />
              <DetailItem label="Max Marks" value={result.max_marks} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-4">
                 <DetailItem label="Session" value={result.session} />
                 <DetailItem label="Date Created" value={format(new Date(result.date_created), "PPP")} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Subject-wise Marks</h3>
             <div className="space-y-2">
                {Object.entries(result.subjects).map(([subject, marks]) => (
                    <div key={subject} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                        <p className="font-medium">{subject}</p>
                        <Badge variant="secondary">{marks}</Badge>
                    </div>
                ))}
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
