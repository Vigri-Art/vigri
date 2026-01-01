import { Card } from "@/components/ui/card"
import { RefreshCcw } from "lucide-react"
// import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button";

function NavSwapCard() {
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