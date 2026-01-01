import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { login } from './actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
    return (
        <>
            <CardHeader>
                <h2>Login to view and manage events.</h2>
            </CardHeader>
            <CardContent>
                <form action={login}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Email:</FieldLabel>
                            <Input id="email" name="email" type="email" placeholder="hello@vigri.art" />
                        </Field>
                        <Field>
                            <FieldLabel>Password:</FieldLabel>
                            <Input id="password" name="password" type="password" placeholder="Enter password"/>
                        </Field>
                        <p className="text-xs"><Link className="text-blue-500 hover:text-blue-600 underline" href="/forgot-password">Forgot your password?</Link></p>
                    </FieldGroup>
                    <Button type="submit">Log In</Button>
                    <p className="flex flex-col justify-center items-center text-sm">Don't have an account?<Link className="text-blue-500 hover:text-blue-600 underline" href="/signup">Sign up today.</Link></p>
                </form>
            </CardContent>
        </>
    );
}