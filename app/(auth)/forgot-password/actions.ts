'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server'; 

function getRedirectBaseURL() {
    if (process.env.URL) {
        return process.env.URL; 
    }
    if (process.env.DEPLOY_PRIME_URL) {
        return process.env.DEPLOY_PRIME_URL;
    }

    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 3000;
        return `http://localhost:${port}`
    }

    console.warn("Could not determine environment URL. Using generic fallback.");
    return 'https://<YOUR_PRODUCTION_DOMAIN_HERE>';
}

export async function resetPasswordRequest(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get('email') as string;

    if (!email) {
        redirect('/forgot-password?error=Email is required');
    }

    const baseURL = getRedirectBaseURL();
    const redirectToURL = `${baseURL}/update-password`;

    console.log(`Sending reset email with redirectTo: ${redirectToURL}`)

    // 🛑 CRITICAL STEP: Call the password reset API 🛑
    // The redirectTo URL MUST point to the page in your app where the user will
    // land and update their password (e.g., /update-password).
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // You MUST change this URL to your actual production domain
        redirectTo: redirectToURL,
    });

    if (error) {
        console.error("SUPABASE PASSWORD RESET ERROR:", error.message);
        // Do NOT expose the error message to the user for security reasons.
        // We redirect them to a generic confirmation page.
        // Use a generic success message, even on error, to prevent email enumeration.
    }

    // Redirect to a confirmation page, regardless of success or common error (to prevent enumeration)
    redirect('/forgot-password/confirm');
}