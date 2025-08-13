
'use server';

import { db } from '@/lib/firebase';
import { ref, set, update, remove, push } from 'firebase/database';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { eventSchema } from '@/app/admin/events/data/schema';

const createEventSchema = eventSchema.omit({ id: true });
const updateEventSchema = eventSchema.omit({ id: true });

export async function createEvent(data: z.infer<typeof createEventSchema>) {
    try {
        const validatedData = createEventSchema.parse(data);
        const eventsRef = ref(db, 'events');
        const newEventRef = push(eventsRef);
        await set(newEventRef, validatedData);
        revalidatePath('/admin/events');
        return { success: true, message: "Event created successfully." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.flatten().fieldErrors };
        }
        return { success: false, error: { _form: [(error as Error).message] } };
    }
}


export async function updateEvent(id: string, data: z.infer<typeof updateEventSchema>) {
    try {
        const validatedData = updateEventSchema.parse(data);
        const eventRef = ref(db, `events/${id}`);
        await update(eventRef, validatedData);
        revalidatePath('/admin/events');
        return { success: true, message: "Event updated successfully." };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.flatten().fieldErrors };
        }
        return { success: false, error: { _form: [(error as Error).message] } };
    }
}

export async function deleteEvent(id: string) {
    try {
        const eventRef = ref(db, `events/${id}`);
        await remove(eventRef);
        revalidatePath('/admin/events');
        return { success: true, message: 'Event deleted successfully.' };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}
