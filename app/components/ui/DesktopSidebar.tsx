// components/ui/DesktopSidebar.tsx
import { logout } from "@/app/(auth)/actions";
import { NavLinks } from "./NavLinks";
import Link from "next/link";
import NavSwapCard from "./NavSwapCard";
import { createClient } from "@/lib/supabase/server";

export async function DesktopSidebar() {
  const supabase = await createClient();
  
  const { data : { user }, } = await supabase.auth.getUser();

  if (!user) {
    return <div className="hidden"></div>
  }

  return (
    <div className="hidden lg:flex flex-col h-full sticky top-0 pt-8">
      <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider flex-grow">
          Vigri
      </Link>
      <hr></hr>
      <NavSwapCard />
      <NavLinks />
      <form action={logout} className="mt-6">
        <button
          type="submit"
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </form>
    </div>
  );
}