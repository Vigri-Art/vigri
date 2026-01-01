import { CardContent, CardHeader } from "@/components/ui/card";

export default function ConfirmPage() {
    return (
        <>
            <CardHeader>
                <h2>Need to confirm your email</h2>
            </CardHeader>
            <CardContent>
                <p>
                Check your email for a message from Supabase to confirm sign up. Once you get that done, you'll be ready to access vigri!
                </p>
            </CardContent>
        </>
    );
}