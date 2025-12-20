import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server"
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";


async function CreateEventButton() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null; 

    const [profileResult, coordinatorResult] = await Promise.all([
        supabase.from('profiles').select('active_role').eq('user_id', user.id).single(),
        supabase.from('coordinator_profiles').select('coordinator_profile_id').eq('user_id', user.id).single()
    ]);

    const isActiveCoordinator = profileResult.data?.active_role === 'coordinator';
    const hasCoordinatorProfile = !!coordinatorResult.data;

    if (!isActiveCoordinator || !hasCoordinatorProfile) {
        return null;
    }
 
    return (
        <Button className="justify-start gap-3" asChild>
            <Link href="/events/create">
                <CirclePlusIcon className="h-5 w-5" />
                <span>Create New Event</span>
            </Link>
        </Button>
    )
}

export default CreateEventButton