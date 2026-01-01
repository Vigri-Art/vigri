'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/server';

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { data: userData, error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.error("SUPABASE LOGIN ERROR: ", error.message)
        redirect(`/error?message=${encodeURIComponent(error.message)}`);
    }

    if (userData?.user && userData?.user.identities?.length === 0) {
        redirect('/check-email');
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();

    const { data: vendorProfile, error: vendorProfileError } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();

    const { data: coordinatorProfile, error: coordinatorProfileError } = await supabase
        .from('coordinator_profiles')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();

    if (!profile && (!vendorProfile || !coordinatorProfile)) {
        // Authenticated but no profile record exists
        redirect('/onboarding');
    }

    // 3. Authenticated AND Onboarded
    revalidatePath('/', 'layout');
    redirect('/');
}