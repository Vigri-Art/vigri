import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import { logout } from "./(auth)/actions";
import { MobileNavbar } from "@/app/components/ui/MobileNavbar";
import { DesktopSidebar } from "@/app/components/ui/DesktopSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vigri",
  description: "The one-stop platform for artists.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data : { user }, } = await supabase.auth.getUser();

  if (!user) {
    return <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          <main className="flex px-4 h-screen align-middle"> 
            <div className="lg:w-1/3 sm:w-1/2 m-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 lg:pt-8"> 
              <div className="lg:col-span-12">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  }
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          {/* 1. Mobile Top Bar with Sheet Trigger */}
          <MobileNavbar /> 

          <main className="flex max-w-7xl mx-auto px-4 h-screen align-middle"> 
            
            {/* 2. Grid Layout for Desktop (Sidebar + Content) */}
            <div className="mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pt-8 lg:pt-8"> 
              
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
      </body>
    </html>
  );
}
