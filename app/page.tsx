import { createClient } from "@/lib/supabase/server";
import QuoteBox from "./components/ui/QuoteBox";
import StatDisplay, { StatDisplayProps } from "./components/ui/StatDisplay";
import { StatDisplayElement } from "./components/ui/StatDisplayCard";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

const DEFAULT_QUOTE = "That brain of mine is something more than merely mortal; as time will show."
const DEFAULT_ATTRIBUTION = "Ada Lovelace, Countess"

export default async function Home() {

  const supabase = await createClient();
  
  const { data : { user }, } = await supabase.auth.getUser();

  const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user?.id)
      .single();

  if (profileError) {
    return <div>Something went wrong with your profile.</div>
  }

  // TO-DO: Get Stats for HomePage, likely needs to be async
  const statsData: StatDisplayElement[] = [
    {
      statLabel: "$24,582",
      statNumberString: "Total Revenue",
    },
    {
      statLabel: "13",
      statNumberString: "Total Events Completed",
    },
    {
      statLabel: "5",
      statNumberString: "Open Applications",
    },
    {
      statLabel: "26",
      statNumberString: "New Events Near You",
    },
  ];

  return (
    <div className="mx-auto">
      <h1 className="mb-8 text-2xl font-bold">{`Welcome Back, ${profile.display_name}`}</h1>
      <p>Here's what's happening with your creative work today:</p>
      <QuoteBox quote={DEFAULT_QUOTE} attribution={DEFAULT_ATTRIBUTION} />
      <StatDisplay stats={statsData} />
      <h2 className="mt-8 mb-4 text-xl">Quick Actions</h2>
      <ButtonGroup>
        <ButtonGroup><Button>Find Events</Button></ButtonGroup>
        <ButtonGroup><Button>View Applications</Button></ButtonGroup>
      </ButtonGroup>
      <h2 className="my-8 text-xl">Recent Updates</h2>
      
    </div>
  );
}
