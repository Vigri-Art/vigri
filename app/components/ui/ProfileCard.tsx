

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { User } from "@supabase/supabase-js";
import { RefreshCcw } from "lucide-react";

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function ProfileCard({user, profile}: {user: User, profile: any}) {
    console.log(user)
  
    return (
    <div className="flex w-full max-w-lg flex-col gap-6 my-4">
      <Item variant="outline">
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>VG</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{profile?.display_name || "Bungus"}</ItemTitle>
          <ItemDescription>{user?.app_metadata?.role === 'admin' && <Badge variant="destructive">Admin</Badge>}</ItemDescription>
          <ItemDescription>{`${capitalizeFirstLetter(profile?.active_role) || "Couldn't get role."}`}</ItemDescription>
        </ItemContent>
        <ItemActions>
            {user?.app_metadata?.role === 'admin' && <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <RefreshCcw />
          </Button>}
        </ItemActions>
      </Item>
    </div>
  )
}
