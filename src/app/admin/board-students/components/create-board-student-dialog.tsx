
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { boardStudentSchema } from "../data/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/firebase"
import { ref, set, push } from "firebase/database"

interface CreateBoardStudentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const createBoardStudentSchema = boardStudentSchema.omit({ id: true });


export function CreateBoardStudentDialog({ isOpen, onOpenChange }: CreateBoardStudentDialogProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof createBoardStudentSchema>>({
        resolver: zodResolver(createBoardStudentSchema),
        defaultValues: {
            name: "",
            class: "",
            boardRollNo: "",
            obtainedMarks: 0,
            totalMarks: 0,
            imageUrl: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createBoardStudentSchema>) {
       try {
           const boardStudentsRef = ref(db, 'boardStudents');
           const newBoardStudentRef = push(boardStudentsRef);
           await set(newBoardStudentRef, values);
           toast({
               title: "Board Student Added",
               description: "The new board student has been successfully added.",
           });
           onOpenChange(false);
           form.reset();
       } catch (error) {
            toast({
                title: "Creation Failed",
                description: (error as Error).message,
                variant: "destructive"
            });
       }
    }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Board Student</DialogTitle>
          <DialogDescription>
            Fill in the student's board result details below. Click add when you're done.
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
                                    <Input placeholder="https://example.com/image.png" {...field} />
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
                        <Button type="submit">Add Student</Button>
                    </DialogFooter>
                </form>
             </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
