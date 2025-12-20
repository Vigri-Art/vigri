// components/SearchForm.tsx
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentQuery = searchParams.get('query') || ""

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const queryValue = formData.get('query') as string
        
        // Create a new URL search params object based on existing ones
        const params = new URLSearchParams(searchParams.toString())
        
        if (queryValue) {
            params.set('query', queryValue)
        } else {
            params.delete('query')
        }

        // Navigate to the same page with new params: /events?query=pizza
        router.push(`/events?${params.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
                key={currentQuery}
                name="query" 
                placeholder="Search events..." 
                defaultValue={currentQuery} 
                className="w-[300px]"
            />
            <Button type="submit">Search</Button>
        </form>
    )
}