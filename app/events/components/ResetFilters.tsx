// components/events/ResetFilters.tsx
'use client'

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react" // Optional: for a "close" icon

export function ResetFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Only show if there's a query or a non-default sort
  const hasFilters = searchParams.has('query') || searchParams.get('sort') === 'desc'

  if (!hasFilters) return null

  return (
    <Button 
      variant="ghost" 
      onClick={() => router.push('/events')}
      className="text-muted-foreground hover:text-foreground"
    >
      <X className="mr-2 h-4 w-4" />
      Clear Filters
    </Button>
  )
}