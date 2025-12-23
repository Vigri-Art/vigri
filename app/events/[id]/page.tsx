import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const supabase = await createClient();
  const { id } = await params;

  // Fetch the specific event and include the related group data
  const { data: event } = await supabase
    .from('events')
    .select(`
      *,
      groups (
        group_name,
        group_description
      )
    `)
    .eq('event_id', id)
    .filter('event_id', 'eq', id)
    .single();

  if (!event) {
    notFound(); // Triggers the default Next.js 404 page
  }

  return (
    <div className="container max-w-3xl py-10">
      <Link href="/events">{`<- Back to Events`}</Link>
      <hr></hr>
      <h1 className="text-4xl font-bold mb-4">{event.event_name}</h1>
      
      <div className="flex gap-4 mb-8 text-muted-foreground">
        <span>{new Date(event.event_start_at).toLocaleString()}</span>
        <span>Venue ID: {event.venue_id || 'TBD'}</span>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg mb-8">
        <h2 className="font-semibold mb-2">Hosted by {event.groups?.group_name}</h2>
        <p className="text-sm">{event.groups?.group_description}</p>
      </div>

      <div className="prose max-w-none">
        <h3 className="text-xl font-semibold mb-2">About this event</h3>
        <p className="whitespace-pre-wrap">{event.event_description}</p>
      </div>
    </div>
  );
}