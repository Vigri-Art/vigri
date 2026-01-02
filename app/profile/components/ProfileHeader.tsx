import { ProfileProps } from "@/app/(shared)/interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { User } from "@supabase/supabase-js";

export default function ProfileHeader({ user, profile }: {user: User, profile: ProfileProps}){
    return (
    <Item >
        <ItemMedia>
            <Avatar className="size-24">
                <AvatarImage src="https://github.com/evilrabbit.png" />
                <AvatarFallback>VG</AvatarFallback>
            </Avatar>
        </ItemMedia>
        <ItemContent>
            <ItemTitle className="mb-2 text-2xl">{profile?.display_name}</ItemTitle>
            <span className="">
                {user?.app_metadata.role === 'admin' && <Badge variant="destructive">Admin</Badge>}
                <Badge>Pre-Alpha User</Badge>
            </span>
            <ItemDescription className="mt-4 text-xl">Bio</ItemDescription>
            <ItemDescription className="text-l">username</ItemDescription>
        </ItemContent>
    </Item>
    );
}