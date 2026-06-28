import { useQuery } from "@tanstack/react-query"
import { API_URL } from "@/lib/constants"
import type { Seat } from "@/features/shows/types"

async function fetchSeats(showId: string): Promise<Seat[]> {
  const res = await fetch(`${API_URL}/shows/${showId}/seats`, {
    headers: { accept: "application/json" },
  })
  if (!res.ok) throw new Error("Failed to fetch seats")
  return res.json() as Promise<Seat[]>
}

export function useSeats(showId: string) {
  return useQuery({
    queryKey: ["shows", showId, "seats"],
    queryFn: () => fetchSeats(showId),
  })
}
