import { createClient } from "@/lib/supabase/server";


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
            <h1>Upcoming Events</h1>
            <hr></hr>
            <br></br>
            <div>
                {events?.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                <h2>{event.event_name}</h2>
                                <p>Hosted by: {event.groups?.group_name || 'No Group Assigned'}</p>
                                <p>{event.event_description}</p>
                                <p>{new Date(event.event_start_at).toLocaleDateString()}</p>
                                <span>{event.status}</span>
                            </li>
                        ))}
                    </ul>
                )
                }
            </div>
        </div>
    )
}

export default Events;