import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Add any specific wrappers or styling needed for auth pages (e.g., centering the form)
  return (
    <Card className="flex flex-col p-16">
        <h1 className="flex justify-center text-2xl font-bold">Vigri</h1>
        {children}
        <CardFooter className="flex flex-col justify-end gap-2">
            <p className="justify-center text-xs font-thin">Copyright 2025 <Link className="font-light text-blue-500 hover:text-blue-600 underline" href="https://vigri.art">Vigri Art</Link></p>
            <p className="justify-center text-xs font-thin">Contact: <Link className="font-light text-blue-500 hover:text-blue-600 underline" href="mailto:andres@redmage.cc">andres@redmage.cc</Link></p>
        </CardFooter>
    </Card>
  )
}