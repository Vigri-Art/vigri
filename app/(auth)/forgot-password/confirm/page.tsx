import { CardContent, CardHeader } from "@/components/ui/card";

export default function ConfirmPage() {
    return (
        <>
            <CardHeader>
                <h2>Check Your Inbox</h2>
            </CardHeader>
            <CardContent>
                <p>
                If an account with that email address exists, we have sent a password reset link. 
                Check your spam folder if you don't see it in a few minutes.
                </p>
            </CardContent>
        </>
    );
}