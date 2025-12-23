import Link from "next/link";
import CreateEventForm from "./components/CreateEventForm";
import { createClient } from "@/lib/supabase/server";

async function CreateEventsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser(); 
    
    if (!user) {
        return <div>You need to be authenticated to create events.</div>
    }

    const [profileResult, coordinatorResult] = await Promise.all([
        supabase.from('profiles').select('active_role').eq('user_id', user.id).single(),
        supabase.from('coordinator_profiles').select('coordinator_profile_id').eq('user_id', user.id).single()
    ]);

    const isActiveCoordinator = profileResult.data?.active_role === 'coordinator';
    const hasCoordinatorProfile = !!coordinatorResult.data;

    if (!isActiveCoordinator || !hasCoordinatorProfile) {
        return <div>You need to set up at least one group before making events on Vigri.</div>;
    }

    const { data: groupsData } = await supabase
        .from('groups_staff')
        .select(`
            group_id,
            groups (
                id,
                group_name
            )
        `)
        .eq('coordinator_id', coordinatorResult.data.coordinator_profile_id)
    
    const availableGroups = groupsData?.map(item => {
        const group = Array.isArray(item.groups) ? item.groups[0] : item.groups;
        return {
            id: group?.id,
            name: group?.group_name
        };
        
    }) || []
    
    return (
        <div>
            <Link href="/events">{`<- Back to Events`}</Link>
            <hr></hr>
            <br></br>
            <CreateEventForm groups={availableGroups}/>
        </div>
        
    )
}

export default CreateEventsPage;