import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { signup } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CardContent, CardHeader } from '@/components/ui/card';

export default function SignupPage() {
    return (
        <>
            <CardHeader>
                <h2>Sign up for access to events.</h2>
                <p>Already have an account? <Link className="text-blue-500 hover:text-blue-600 underline" href="/login">Log in here.</Link></p>
            </CardHeader>
            <CardContent>
                <form action={signup}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Email:</FieldLabel>
                            <Input id="email" name="email" type="email" placeholder="hello@vigri.art" required/>
                        </Field>
                        <Field>
                            <FieldLabel>Password:</FieldLabel>
                            <Input id="password" name="password" type="password" placeholder="Enter password" required/>
                        </Field>
                    </FieldGroup>
                    <Button type="submit">Sign Up</Button>
                </form>
            </CardContent>
        </>
    );
}