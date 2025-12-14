// app/(auth)/layout.tsx
// This layout wraps the /login and /signup routes.

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Add any specific wrappers or styling needed for auth pages (e.g., centering the form)
  return (
    <div className="auth-container">
      {children}
    </div>
  )
}