'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

export function SortSelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentSort = searchParams.get('sort') || 'asc'

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`/events?${params.toString()}`)
  }

  return (
    <Select value={currentSort} onValueChange={handleSort}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by Date" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">Date: Soonest First</SelectItem>
        <SelectItem value="desc">Date: Furthest First</SelectItem>
      </SelectContent>
    </Select>
  )
}