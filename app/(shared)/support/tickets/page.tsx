import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";


async function TicketsPage() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser(); 

    const { data: ticketData, error } = await supabase
        .from('ticket_data')
        .select(`*`)
        .eq('ticket_status', 'open');

    if (error) {
        return <div>Something went wrong getting the tickets.<br></br>{error.message}</div>
    }
    
    return (
        <div className="grid gap-4 mx-auto">
            {ticketData?.length === 0 ? (
                <div className="p-10 text-center border rounded-lg bg-slate-50">
                    <p className="text-muted-foreground">No tickets active.</p>
                </div>
                
            ) : (
                ticketData.map((ticket) => (
                    <Link 
                        href={`/support/tickets/${ticket.ticket_id}`}
                        key={ticket.ticket_id}
                        className="block transition-transform hover:scale-[1.01]"
                    >
                        <Card className="max-w-xl mx-auto">
                            <CardHeader>
                                <CardTitle>{ticket.ticket_name}</CardTitle>
                                <CardDescription>Created by: {ticket.username}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{ticket.ticket_description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                    
                ))
            )
            }
        </div>
)
}

export default TicketsPage;