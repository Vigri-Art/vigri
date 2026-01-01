'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client'; // Use your client-side Supabase helper
import { CardContent, CardHeader } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Updating password...');

        const { error } = await supabase.auth.updateUser({
            password: password
        });

        if (error) {
            setMessage(`Error updating password: ${error.message}`);
        } else {
            setMessage('Success! Your password has been updated. Redirecting...');
            // Redirect the user to login or a protected page after success
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        }
    };

    return (
        <>
            <CardHeader>
                <h2>Set New Password</h2>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdate}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>New Password:</FieldLabel>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        required />
                        </Field>
                    </FieldGroup>
                    <Button type="submit">Update Password</Button>
                    {message && <p className="mt-2 text-sm">{message}</p>}
                </form>
            </CardContent>
        </>
        
    );
}