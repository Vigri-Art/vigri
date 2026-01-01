import { CardContent, CardHeader } from '@/components/ui/card';
import { resetPasswordRequest } from './actions'; // We will create this next
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
    return (
        <>
            <CardHeader>
                <h2>Forgot Your Password?</h2>
                <p className="font-light">Enter your email address and we'll send you a password reset link.</p>
            </CardHeader>
            <CardContent>
                <form action={resetPasswordRequest}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Email:</FieldLabel>
                            <Input id="email" name="email" type="email" required placeholder="hello@vigri.art"></Input>
                        </Field>
                    </FieldGroup>
                    <Button className="w-full" type="submit">Send Reset Link</Button>
                </form>
            </CardContent>
        </>
        
    );
}