'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server'; 

export async function logout() {
    const supabase = await createClient();
    
    // signOut automatically clears the session cookies.
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error("SUPABASE LOGOUT ERROR:", error.message);
        // We log the error but still redirect the user out.
    }

    // Redirect user to the login page after clearing the session
    revalidatePath('/', 'layout'); 
    redirect('/login');
}