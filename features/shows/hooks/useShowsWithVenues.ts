import { useMemo } from "react"
import { useShows } from "@/features/shows/hooks/useShows"
import { useVenues } from "@/features/shows/hooks/useVenues"
import type { ShowWithVenue } from "@/features/shows/types"

export function useShowsWithVenues(): {
  data: ShowWithVenue[]
  isLoading: boolean
  isError: boolean
} {
  const shows = useShows()
  const venues = useVenues()

  const data = useMemo<ShowWithVenue[]>(() => {
    if (!shows.data || !venues.data) return []
    const venueMap = new Map(venues.data.map((v) => [v.id, v]))
    return shows.data.map((show) => ({
      ...show,
      venue: venueMap.get(show.venueId) ?? null,
    }))
  }, [shows.data, venues.data])

  return {
    data,
    isLoading: shows.isLoading || venues.isLoading,
    isError: shows.isError || venues.isError,
  }
}
