
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Event, eventSchema } from "../data/schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { updateEvent } from "@/actions/event-actions"
import { Textarea } from "@/components/ui/textarea"

interface EditEventDialogProps {
  event: Event;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const updateEventSchema = eventSchema.omit({ id: true });


export function EditEventDialog({ event, isOpen, onOpenChange }: EditEventDialogProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof updateEventSchema>>({
        resolver: zodResolver(updateEventSchema),
        defaultValues: {
            ...event,
        },
    });

    async function onSubmit(values: z.infer<typeof updateEventSchema>) {
       const result = await updateEvent(event.id, values);
       if (result.success) {
           toast({
               title: "Event Updated",
               description: "The event has been successfully updated.",
           });
           onOpenChange(false);
       } else {
           if(typeof result.error !== 'string' && result.error?._form) {
                 toast({
                    title: "Update Failed",
                    description: result.error._form.join(", "),
                    variant: "destructive"
                });
           } else {
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
          <DialogTitle>Edit Event: {event.title}</DialogTitle>
          <DialogDescription>
            Update the event details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Event Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Annual Sports Gala" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
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
                                <FormLabel>Image URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/image.png" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short description of the event." {...field} />
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
