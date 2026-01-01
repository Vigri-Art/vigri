// components/navigation-wrapper.tsx
"use client"

import { usePathname } from "next/navigation"
import { MobileNavbar } from "./MobileNavbar"
import { DesktopSidebar } from "./DesktopSidebar"
import { User } from '@supabase/supabase-js';

interface NavWrapperProps {
  children: React.ReactNode,
  user: User | null
}

export function NavWrapper({ children, user }: NavWrapperProps) {
  const pathname = usePathname()

  // Unauthenticated pages are already handled. This handles authenticated pages that require 
  // additional work for the user to be ready to navigate the website. 
  const hideMenuRoutes = [
    "/onboarding"
  ]
  const showMenu = !hideMenuRoutes.includes(pathname)

  if (!user || !showMenu) {
    return (
      <div className="min-h-screen">
        <main className="flex px-4 h-screen align-middle"> 
          <div className="lg:w-2/3 m:w-1/2 sm:w-2/3 m-auto max-w-lg grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 lg:pt-8"> 
            <div className="lg:col-span-12">
              {children}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* 1. Mobile Top Bar with Sheet Trigger */}
      <MobileNavbar /> 

      <main className="flex max-w-7xl mx-auto px-4 h-screen align-middle"> 
        
        {/* 2. Grid Layout for Desktop (Sidebar + Content) */}
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 lg:pt-8"> 
          
          {/* Sidebar Slot - ONLY visible on LG screens and above (lg:block) */}
          <div className="lg:col-span-3">
            {/* DesktopSidebar handles its own 'hidden' on small screens if needed, 
                but here we rely on the parent div's layout to control it. */}
            <DesktopSidebar /> 
          </div>

          {/* Main Content Slot - Takes full width on mobile, 9 columns on desktop */}
          <div className="mx-auto lg:col-span-9">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}