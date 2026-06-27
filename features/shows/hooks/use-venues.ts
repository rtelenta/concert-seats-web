import { useQuery } from "@tanstack/react-query"
import { fetchVenues } from "@/features/shows/api/fetch-venues"

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    staleTime: Infinity,
  })
}
