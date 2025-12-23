// components/ui/MobileSheetNav.tsx (Updated)

import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { NavLinks } from "./NavLinks";
import { logout } from "@/app/(auth)/actions";
import NavSwapCard from "./NavSwapCard";

export function MobileNavbar() {
  return (
    // The main container for the mobile top bar
    <div className="lg:hidden flex items-center h-16 border-b bg-background/95 sticky top-0 z-50 px-4">
      
      {/*
        --- ADJUSTMENT 2 & 3: Order and Justification ---
        We use 'flex' and 'gap-3' to space the items, and ensure the logo
        and trigger are on the left side of the screen.
      */}
      
      {/* 1. Sheet Trigger (Hamburger Icon) - Now on the far left */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        
        {/*
          --- ADJUSTMENT 1: Side="left" ---
          This ensures the sheet slides out from the left edge of the screen,
          matching the expected sidebar placement.
        */}
        <SheetContent side="left" className="w-64 sm:w-80">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col py-4 h-full">
            <NavSwapCard />
            <NavLinks />
            <Button>
              <Link href="/support"></Link>
            </Button>
            <form action={logout} className="mt-auto pt-4 border-t">
              <Button
                type="submit"
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Log Out
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      {/* 2. Logo/Title Section - Right next to the hamburger icon */}
      {/* Added 'ml-3' for spacing between the icon and the logo */}
      <Link 
        href="/" 
        className="text-xl font-bold text-primary font-mono tracking-wider ml-3"
      >
          Vigri
      </Link>
      
      {/* Add an empty div or use justify-start/end on the parent 
          if you want the space on the right, but since we removed 'flex-grow'
          on the Link, it naturally stays on the left.
      */}
      <div className="flex-grow"></div> 
      
    </div>
  );
}