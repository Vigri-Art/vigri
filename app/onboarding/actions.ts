'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server';

export async function create_profiles(formData: FormData) {
    const supabase = await createClient();

    const { data : { user }, } = await supabase.auth.getUser();
    const userId = user?.id

    const userType = formData.get('userType') as string;
    const displayName = formData.get('displayname') as string;
    const username = formData.get('username') as string;

    // Create profile record on profiles table
    const { error: profileError } = await supabase
        .from('profiles')
        .insert({
            user_id: userId,
            username: username,
            display_name: displayName,
            active_role: userType
    });

    if (profileError) {
        console.error("PROFILE CREATION ERROR: ", profileError.message);
        return redirect('/error?message=Profile creation failed');
    }

    // Create User Profiles based on type 
    switch(userType) {
        case "vendor":
            const { error: vendorError } = await supabase
                .from('vendor_profiles')
                .insert({
                    user_id: userId,
            });

            if (vendorError) {
                console.error("VENDOR PROFILE ERROR: ", vendorError.message);
                return redirect('/error?message=Profile creation failed');
            }

            break;

        default:
            console.warn("No specific profile type created for:", userType);
    }

    revalidatePath('/', 'layout');
    redirect('/')
}