// components/navigation-wrapper.tsx
"use client"

import { usePathname } from "next/navigation"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopSidebar } from "./DesktopSidebar"
import { User } from '@supabase/supabase-js';
import { ProfileProps } from "@/app/(shared)/interfaces";

interface NavWrapperProps {
  children: React.ReactNode,
  user: User | null,
  profile: ProfileProps
}

export function NavWrapper({ children, user, profile }: NavWrapperProps) {
  const pathname = usePathname()
  const hideMenuRoutes = ["/onboarding"]
  const showMenu = !hideMenuRoutes.includes(pathname)

  if (!user || !showMenu) {
    return (
      <div className="min-h-screen">
        <main className="flex items-center justify-center min-h-screen"> 
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="lg:hidden sticky top-0 z-40 w-full bg-white border-b">
        <MobileNavbar user={user} profile={profile}/> 
      </div>

      <aside className="hidden lg:block w-64 xl:w-72 border-r min-h-screen sticky top-0">
        <DesktopSidebar user={user} profile={profile}/> 
      </aside>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-16 py-8"> 
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}