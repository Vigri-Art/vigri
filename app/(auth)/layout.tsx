"use client"

import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import UnicornScene from "unicornstudio-react/next";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/*
      <div className="absolute inset-0 z-0 h-full w-full">
        <UnicornScene 
          projectId="OSg1eCyFLLs7aLw1OC8w"
          className="h-full w-full pointer-events-none"
          production={true}
        />
      </div>
      */}
      <div className="relative xl:w-1/2 lg:w-2/3 md:w-2/3 sm:w-full z-10 flex flex-col p-16">
        <Card className="flex flex-col p-16">
          <h1 className="flex justify-center text-2xl font-bold">Vigri</h1>
          {children}
          <CardFooter className="flex flex-col justify-end gap-2">
              <p className="justify-center text-xs font-thin">Copyright 2025 <Link className="font-normal text-primary hover:underline" href="https://vigri.art">Vigri Art</Link></p>
              <p className="justify-center text-xs font-thin">Contact: <Link className="font-normal text-primary hover:underline" href="mailto:andres@redmage.cc">andres@redmage.cc</Link></p>
          </CardFooter>
        </Card>
      </div>
    </div>
    
  )
}