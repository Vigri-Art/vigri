import { createClient } from "@/lib/supabase/server";
import { BarChartIcon, CalendarIcon, HomeIcon, ListIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

const links = [
    { href:"/", label:"Home", icon:HomeIcon },
    { href:"/events", label:"Events", icon:CalendarIcon },
    { href:"/applications", label:"Applications", icon:ListIcon },
    { href:"/messages", label:"Messages", icon:MessageCircleIcon },
    { href:"/analytics", label:"Analytics", icon:BarChartIcon },
    { href:"/profile", label:"Profile", icon:UserIcon },
]

export async function NavLinks() {
    const supabase = await createClient();
    const { data : { user }, } = await supabase.auth.getUser();

    if (!user) {
        return <div>Log in to view navigation.</div>
    }

    return (
        <div className="flex flex-col space-y-1">
            {links.map((link) => (
                <Button key={link.href} variant="ghost" className="justify-start gap-3" asChild>
                    <Link href={link.href}>
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                    </Link>
                </Button>
            ))}
        </div>
    );
}