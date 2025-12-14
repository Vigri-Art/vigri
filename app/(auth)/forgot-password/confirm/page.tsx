export default function ConfirmPage() {
    return (
        <div className="p-4">
            <h2>Check Your Inbox</h2>
            <p className="mt-2 text-gray-600">
                If an account with that email address exists, we have sent a password reset link. 
                Check your spam folder if you don't see it in a few minutes.
            </p>
        </div>
    );
}