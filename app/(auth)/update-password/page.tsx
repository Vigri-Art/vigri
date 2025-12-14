'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'; // Use your client-side Supabase helper

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const supabase = createClient(); // The client needs to be initialized here

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Updating password...');

        // 🛑 The user is temporarily authenticated because they clicked the link.
        // We can now call updateUser() which uses the current session.
        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setMessage(`Error updating password: ${error.message}`);
        } else {
            setMessage('Success! Your password has been updated.');
            // Redirect the user to login or a protected page after success
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="p-4">
            <h2>Set New Password</h2>
            <label htmlFor="password">New Password:</label>
            <input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Update Password</button>
            {message && <p className="mt-2 text-sm">{message}</p>}
        </form>
    );
}