'use client'

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { toast } from "sonner";
import { createEvent } from "../events";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GroupOption {
    id: bigint,
    name: string
}

const eventSchema = z.object({
    event_name: z.string().min(8, "Name is too short."),
    event_description: z.string(),
    group_id: z.string().min(1, "Please select a group."),
    event_start_at: z.string().min(1, "Start date required."),
    event_end_at: z.string().min(1, "End date required."),
    application_deadline_at: z.string().min(1, "Application deadline required."),
})

function CreateEventForm({ groups }: { groups: GroupOption[] }) {

    console.log("Groups in Component: ", groups)

    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            event_name: "",
            event_description: "",
            group_id: "",
            event_start_at: new Date().toISOString(),
            event_end_at: new Date().toISOString(),
            application_deadline_at: new Date().toISOString(),
        }
    });

    async function onSubmit(data: z.infer<typeof eventSchema>) {
        try {
            await createEvent(data);
            toast.success("Event created!");
        } catch (err) {
            toast.error("Error creating event.");
        }
    }

    return (
        <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle>Create New Event</CardTitle>
                <CardDescription>Post a new event for your group.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="create-event-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller 
                            name="event_name"
                            control={form.control}
                            render={({field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Event Name</FieldLabel>
                                    <Input { ...field} placeholder="ex. Yuletide Art Market" />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="group_id"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Target Group</FieldLabel>
                                <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value.toString()}
                                >
                                    <SelectTrigger aria-invalid={fieldState.invalid}>
                                    <SelectValue placeholder="Select a group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {groups.map((group) => (
                                        <SelectItem key={group.id} value={group.id.toString()}>
                                        {group.name}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller 
                            name="event_description"
                            control={form.control}
                            render={({field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Event Description</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea {...field} className="min-h-24" placeholder="ex. This is the best market you'll ever go to! Join now."/>
                                    </InputGroup>
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="event_start_at"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Event Starts On</FieldLabel>
                                <Input {...field} type="datetime-local" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="event_end_at"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Event Ends On</FieldLabel>
                                <Input {...field} type="datetime-local" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="application_deadline_at"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Applications Close On</FieldLabel>
                                <Input {...field} type="datetime-local" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => form.reset()}>Reset Form</Button>
                <Button type="submit" form="create-event-form" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Creating..." : "Save Event"}
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CreateEventForm;