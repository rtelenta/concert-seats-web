import { useQuery } from "@tanstack/react-query"
import { fetchVenues } from "@/features/shows/api/fetchVenues"

export function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: fetchVenues,
    staleTime: Infinity,
  })
}
