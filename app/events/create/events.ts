'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(values: any) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated.")

    const { data: profile } = await supabase
        .from('profiles')
        .select('active_role')
        .eq('user_id', user?.id)
        .single();

    if (profile?.active_role !== 'coordinator') {
        throw new Error("Unauthorized: Only coordinators can create events.");
    }

    console.log("Server Action receiving: ", values)

    const { error } = await supabase.from('events').insert([{
        event_name: values.event_name,
        event_description: values.event_description,
        group_id: values.group_id,
        event_start_at: values.event_start_at,
        event_end_at: values.event_end_at,
        application_deadline_at: values.application_deadline_at,
        status: 'active',
        created_at: new Date().toISOString(), 
    }]);

    if (error) {
        console.error("Supabase Insert Error: ", error)
        throw new Error(error.message);
    }

    revalidatePath('/events');
    redirect('/events')
}