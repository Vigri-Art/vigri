import { createClient } from "@/lib/supabase/server";
import ProfileHeader from "./components/ProfileHeader";


export default async function ProfilePage() {
    const supabase = await createClient();

    const { data : { user }, } = await supabase.auth.getUser();

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

    return (<div className="flex flex-col">
        <ProfileHeader user={user} profile={profile}/>
        <hr></hr>
    </div>);
}