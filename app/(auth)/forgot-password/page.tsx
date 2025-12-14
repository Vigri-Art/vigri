import { resetPasswordRequest } from './actions'; // We will create this next

export default function ForgotPasswordPage() {
    return (
        <form className="p-4" action={resetPasswordRequest}>
            <h2>Forgot Your Password?</h2>
            <p className="mb-4 text-sm text-gray-600">
                Enter your email address and we'll send you a password reset link.
            </p>
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="w-full p-2 border rounded"
            />
            <button 
                type="submit" 
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Send Reset Link
            </button>
        </form>
    );
}