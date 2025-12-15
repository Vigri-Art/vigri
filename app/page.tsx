
import { createClient } from "@/lib/supabase/server";
import { logout } from "./(auth)/actions";
import QuoteBox from "./components/ui/QuoteBox";

const DEFAULT_QUOTE = "That brain of mine is something more than merely mortal; as time will show."
const DEFAULT_ATTRIBUTION = "Ada Lovelace, Countess"

export default async function Home() {

  const supabase = await createClient();
  
  const { data : { user }, } = await supabase.auth.getUser();

  return (
    <div className="mx-auto">
      <h1>Welcome Back, $$USER$$</h1>
      <QuoteBox quote={DEFAULT_QUOTE} attribution={DEFAULT_ATTRIBUTION} />
    </div>
  );
}
