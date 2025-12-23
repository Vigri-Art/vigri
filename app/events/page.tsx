import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import CreateEventButton from "./components/CreateEventButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { SearchForm } from "./components/SearchForm";
import { SortSelector } from "./components/SortSelector";
import { ResetFilters } from "./components/ResetFilters";


async function Events({
    searchParams,
} : {
    searchParams: Promise<{ query?: string; sort?: string}>;
}) {
    const { query, sort } = await searchParams;
    const supabase = await createClient();

    let supabaseQuery = supabase
        .from('events_with_group_names')
        .select('*')
        .eq('status', 'active')
        .gte('event_start_at', new Date().toISOString());
            
    if (query) {
        supabaseQuery = supabaseQuery.or(
            `event_name.ilike.%${query}%,group_name.ilike.%${query}%`
        );
    }
    const isSortDescending = sort === 'desc';
    supabaseQuery = supabaseQuery.order('event_start_at', { ascending: !isSortDescending })
   
    const { data: events, error } = await supabaseQuery;

    if (error) {
        return <div>Error loading events: {error.message}</div>
    }

    return (
        <div>
            <CreateEventButton />
            <h1>Upcoming Events</h1>
            <hr></hr>
            <br></br>
            <div className="flex gap-4 mb-8">
                <SearchForm defaultValue={query} />
                <SortSelector/>
                <ResetFilters />
            </div>
            <br></br>
            <div className="grid gap-4">
                {events?.length === 0 ? (
                    <div className="p-10 text-center border rounded-lg bg-slate-50">
                        <p className="text-muted-foreground">No events found.</p>
                        <Button variant="link" asChild>
                            <Link href="/events">Clear all filters</Link>
                        </Button>
                    </div>
                    
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
                                    <CardDescription>{new Date(event.event_start_at).toLocaleDateString()} | <b>Hosted by:</b> {event.group_name || 'No Group Assigned'}</CardDescription>
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