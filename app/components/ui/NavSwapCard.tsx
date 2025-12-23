import { Card } from "@/components/ui/card"
import { Button } from "./button"
import { RefreshCcw } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

async function NavSwapCard() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser(); 

    return (
        <Card className="max-h-48">
            <p>User</p>
            <p>Role: Coordinator</p>
            <hr></hr>
            <Button variant="ghost" className="content-start">
                <RefreshCcw />
                <span>Swap Roles</span>
            </Button>
        </Card>
    )
}

export default NavSwapCard;