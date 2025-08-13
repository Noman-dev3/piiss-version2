
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { galleryItemSchema } from "../data/schema"
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

interface CreateGalleryItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const createGalleryItemSchema = galleryItemSchema.omit({ id: true });


export function CreateGalleryItemDialog({ isOpen, onOpenChange }: CreateGalleryItemDialogProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof createGalleryItemSchema>>({
        resolver: zodResolver(createGalleryItemSchema),
        defaultValues: {
            title: "",
            description: "",
            imageUrl: "",
        },
    });

    async function onSubmit(values: z.infer<typeof createGalleryItemSchema>) {
       try {
           const galleryRef = ref(db, 'gallery');
           const newGalleryItemRef = push(galleryRef);
           await set(newGalleryItemRef, values);
           toast({
               title: "Image Added",
               description: "The new image has been successfully added to the gallery.",
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
          <DialogTitle>Add New Image to Gallery</DialogTitle>
          <DialogDescription>
            Provide the image details below. Click add when you're done.
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
                                <FormLabel>Image Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Annual Sports Day" {...field} />
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
                                <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A short description of the image." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit">Add Image</Button>
                    </DialogFooter>
                </form>
             </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
