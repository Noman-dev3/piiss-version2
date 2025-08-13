
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Result, resultSchema } from "../data/schema"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { updateResult } from "@/actions/result-actions"
import { Trash2, PlusCircle } from "lucide-react"

interface EditResultDialogProps {
  result: Result;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const updateResultSchema = resultSchema.omit({ id: true, date_created: true }).extend({
    // To handle the dynamic subjects form, we'll represent subjects as an array of objects
    subjectEntries: z.array(z.object({
        name: z.string().min(1, "Subject name cannot be empty"),
        marks: z.coerce.number().min(0, "Marks must be a positive number"),
    })).min(1, "At least one subject is required"),
});

type FormValues = Omit<z.infer<typeof updateResultSchema>, "subjects">;

export function EditResultDialog({ result, isOpen, onOpenChange }: EditResultDialogProps) {
    const { toast } = useToast();
    
    // Convert subjects object to array format for the form
    const subjectEntries = Object.entries(result.subjects).map(([name, marks]) => ({ name, marks }));

    const form = useForm<FormValues>({
        resolver: zodResolver(updateResultSchema),
        defaultValues: {
            ...result,
            subjectEntries,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "subjectEntries",
    });

    async function onSubmit(values: FormValues) {
       // Convert subjectEntries array back to the subjects object format
       const subjects = values.subjectEntries.reduce((acc, entry) => {
           acc[entry.name] = entry.marks;
           return acc;
       }, {} as Record<string, number>);

       const finalValues = { ...values, subjects };
       // @ts-ignore - We are removing subjectEntries before sending to server
       delete finalValues.subjectEntries;
       
       const res = await updateResult(result.id, finalValues);
       if (res.success) {
           toast({
               title: "Result Updated",
               description: "The result has been successfully updated.",
           });
           onOpenChange(false);
       } else {
            toast({
                title: "Update Failed",
                description: "Please check the form for errors.",
                variant: "destructive"
            });
       }
    }
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Result: {result.student_name}</DialogTitle>
          <DialogDescription>
            Update the result details below. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="student_name" render={({ field }) => (<FormItem><FormLabel>Student Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="roll_number" render={({ field }) => (<FormItem><FormLabel>Roll Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="class" render={({ field }) => (<FormItem><FormLabel>Class</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="session" render={({ field }) => (<FormItem><FormLabel>Session</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="grade" render={({ field }) => (<FormItem><FormLabel>Grade</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="percentage" render={({ field }) => (<FormItem><FormLabel>Percentage</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="total_marks" render={({ field }) => (<FormItem><FormLabel>Total Marks</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="max_marks" render={({ field }) => (<FormItem><FormLabel>Max Marks</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl><FormMessage /></FormItem>)} />
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-md font-medium">Subjects</h4>
                        {fields.map((field, index) => (
                        <div key={field.id} className="flex items-end gap-2">
                            <FormField
                            control={form.control}
                            name={`subjectEntries.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                <FormLabel className={index !== 0 ? "sr-only" : ""}>Subject</FormLabel>
                                <FormControl><Input placeholder="e.g., English" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name={`subjectEntries.${index}.marks`}
                            render={({ field }) => (
                                <FormItem>
                                 <FormLabel className={index !== 0 ? "sr-only" : ""}>Marks</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 95" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                        ))}
                        <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => append({ name: "", marks: 0 })}
                        >
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
                        </Button>
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
