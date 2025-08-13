
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Student, studentSchema } from "../data/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { updateStudent } from "@/actions/student-actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface EditStudentDialogProps {
  student: Student;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const updateStudentSchema = studentSchema.omit({ id: true, Date_Added: true, Fee_Slip_Path: true });


export function EditStudentDialog({ student, isOpen, onOpenChange }: EditStudentDialogProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof updateStudentSchema>>({
        resolver: zodResolver(updateStudentSchema),
        defaultValues: {
            Name: student.Name,
            Class: student.Class,
            Section: student.Section,
            Contact: student.Contact,
            Gender: student.Gender,
            Address: student.Address,
            profilePicture: student.profilePicture || '',
        },
    });

    async function onSubmit(values: z.infer<typeof updateStudentSchema>) {
       const result = await updateStudent(student.id, values);
       if (result.success) {
           toast({
               title: "Student Updated",
               description: "The student's details have been successfully updated.",
           });
           onOpenChange(false);
       } else {
           if(typeof result.error === 'string') {
                toast({
                    title: "Update Failed",
                    description: result.error,
                    variant: "destructive"
                });
           } else {
               // Handle Zod error object if needed, for now just show a generic message
                toast({
                    title: "Update Failed",
                    description: "Please check the form for errors.",
                    variant: "destructive"
                });
           }
       }
    }
  
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Student: {student.Name}</DialogTitle>
          <DialogDescription>
            Update the student&apos;s information below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="Name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Student's full name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="Contact"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Parent or student contact" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="Class"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Class</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 8th, 9th" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="Section"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Section</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., A, B" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="Gender"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Gender</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="Address"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Student's home address" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="profilePicture"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Profile Picture URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/image.png" {...field} />
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
