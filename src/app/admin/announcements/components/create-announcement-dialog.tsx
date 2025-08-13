
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { announcementSchema } from "../data/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/lib/firebase"
import { ref, set, push } from "firebase/database"

interface CreateAnnouncementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const createAnnouncementSchema = announcementSchema.omit({ id: true, date: true });


export function CreateAnnouncementDialog({ isOpen, onOpenChange }: CreateAnnouncementDialogProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof createAnnouncementSchema>>({
        resolver: zodResolver(createAnnouncementSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createAnnouncementSchema>) {
       try {
           const announcementsRef = ref(db, 'announcements');
           const newAnnouncementRef = push(announcementsRef);
           await set(newAnnouncementRef, {
               ...values,
               date: new Date().toISOString()
           });
           toast({
               title: "Announcement Created",
               description: "The new announcement has been successfully posted.",
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
          <DialogTitle>Create New Announcement</DialogTitle>
          <DialogDescription>
            Fill in the details for the new announcement. Click create when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., School Reopening Date" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} placeholder="Full content of the announcement." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Create Announcement</Button>
                    </DialogFooter>
                </form>
             </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
