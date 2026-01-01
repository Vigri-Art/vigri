// components/ui/DesktopSidebar.tsx
import { logout } from "@/app/(auth)/actions";
import { NavLinks } from "./NavLinks";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { ProfileCard } from "./ProfileCard";

export function DesktopSidebar({ user, profile }: {user: User, profile: any}) {
  return (
    <div className="flex flex-col h-full sticky top-0 pt-8">
      <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
          Vigri
      </Link>
      <ProfileCard user={user} profile={profile}/>
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