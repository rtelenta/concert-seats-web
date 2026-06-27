import { useQuery } from "@tanstack/react-query"
import { fetchShows } from "@/features/shows/api/fetchShows"

export function useShows() {
  return useQuery({
    queryKey: ["shows"],
    queryFn: fetchShows,
  })
}
