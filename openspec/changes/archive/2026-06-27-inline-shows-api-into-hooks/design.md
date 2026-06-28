## Before → After

**`useShows.ts` before:**
```ts
import { useQuery } from "@tanstack/react-query"
import { fetchShows } from "@/features/shows/api/fetchShows"

export function useShows() {
  return useQuery({ queryKey: ["shows"], queryFn: fetchShows })
}
```

**`useShows.ts` after:**
```ts
import { useQuery } from "@tanstack/react-query"
import { API_URL } from "@/lib/constants"
import type { Show } from "@/features/shows/types"

export function useShows() {
  return useQuery({
    queryKey: ["shows"],
    queryFn: async (): Promise<Show[]> => {
      const res = await fetch(`${API_URL}/shows`, { headers: { accept: "application/json" } })
      if (!res.ok) throw new Error("Failed to fetch shows")
      const data: Show[] = await res.json()
      return data.filter((show) => show.status === "PUBLISHED")
    },
  })
}
```

**`useVenues.ts` before:**
```ts
import { useQuery } from "@tanstack/react-query"
import { fetchVenues } from "@/features/shows/api/fetchVenues"

export function useVenues() {
  return useQuery({ queryKey: ["venues"], queryFn: fetchVenues, staleTime: Infinity })
}
```

**`useVenues.ts` after:**
```ts
import { useQuery } from "@tanstack/react-query"
import { API_URL } from "@/lib/constants"
import type { Venue } from "@/features/shows/types"

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    staleTime: Infinity,
    queryFn: async (): Promise<Venue[]> => {
      const res = await fetch(`${API_URL}/venues`, { headers: { accept: "application/json" } })
      if (!res.ok) throw new Error("Failed to fetch venues")
      return res.json()
    },
  })
}
```

## Deletion

After updating both hooks, delete with `git rm`:
```bash
git rm features/shows/api/fetchShows.ts features/shows/api/fetchVenues.ts
rmdir features/shows/api
```
