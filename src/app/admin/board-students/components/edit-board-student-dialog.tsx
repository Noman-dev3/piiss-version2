
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { BoardStudent, boardStudentSchema } from "../data/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { ref, update } from "firebase/database"
import { revalidatePath } from "next/cache"

interface EditBoardStudentDialogProps {
  student: BoardStudent;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const updateBoardStudentSchema = boardStudentSchema.omit({ id: true });


export function EditBoardStudentDialog({ student, isOpen, onOpenChange }: EditBoardStudentDialogProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof updateBoardStudentSchema>>({
        resolver: zodResolver(updateBoardStudentSchema),
        defaultValues: {
            ...student,
        },
    });

    async function onSubmit(values: z.infer<typeof updateBoardStudentSchema>) {
       try {
            const itemRef = ref(db, `boardStudents/${student.id}`);
            await update(itemRef, values);
            revalidatePath('/');
            revalidatePath('/admin/board-students');
            toast({
                title: "Board Student Updated",
                description: "The student's details have been successfully updated.",
            });
            onOpenChange(false);
       } catch (error) {
            toast({
                title: "Update Failed",
                description: (error as Error).message,
                variant: "destructive"
            });
       }
    }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Board Student: {student.name}</DialogTitle>
          <DialogDescription>
            Update the student&apos;s board result details below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Student Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Ahmed Hassan" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="class"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Class</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 9th" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="boardRollNo"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Board Roll No.</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 123456" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image URL (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/image.png" {...field} value={field.value ?? ''}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="obtainedMarks"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Obtained Marks</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 950" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="totalMarks"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Total Marks</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 1100" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                    </DialogFooter>
                </form>
             </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
