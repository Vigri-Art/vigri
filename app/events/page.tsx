import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import CreateEventButton from "./components/CreateEventButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


async function Events() {
    const supabase = await createClient();
    const { data: events, error } = await supabase
        .from('events')
        .select(`
            *,
            groups (
                group_name
            )
        `)
        .eq('status', 'active')
        .gte('event_start_at', new Date().toISOString())

    if (error) {
        return <div>Error loading events: {error.message}</div>
    }

    return (
        <div>
            <CreateEventButton />
            <h1>Upcoming Events</h1>
            <hr></hr>
            <br></br>
            <div>
                {events?.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events.map((event) => (
                        <Link 
                            href={`/events/${event.event_id}`}
                            key={event.event_id}
                            className="block transition-transform hover:scale-[1.01]"
                        >
                            <Card className="max-w-xl mx-auto">
                                <CardHeader>
                                    <CardTitle>{event.event_name}</CardTitle>
                                    <CardDescription>{new Date(event.event_start_at).toLocaleDateString()} | <b>Hosted by:</b> {event.groups?.group_name || 'No Group Assigned'}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>{event.event_description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                        
                    ))
                )
                }
            </div>
        </div>
    )
}

export default Events;