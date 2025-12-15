
import { createClient } from "@/lib/supabase/server";
import { logout } from "./(auth)/actions";
import QuoteBox from "./components/ui/QuoteBox";
import StatDisplay, { StatDisplayProps } from "./components/ui/StatDisplay";
import { StatDisplayElement } from "./components/ui/StatDisplayCard";

const DEFAULT_QUOTE = "That brain of mine is something more than merely mortal; as time will show."
const DEFAULT_ATTRIBUTION = "Ada Lovelace, Countess"

export default async function Home() {

  const supabase = await createClient();
  
  const { data : { user }, } = await supabase.auth.getUser();

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
      <h1 className="mb-8">Welcome Back, $$USER$$</h1>
      <p>Here's what's happening with your creative work today:</p>
      <QuoteBox quote={DEFAULT_QUOTE} attribution={DEFAULT_ATTRIBUTION} />
      <StatDisplay stats={statsData} />
    </div>
  );
}
