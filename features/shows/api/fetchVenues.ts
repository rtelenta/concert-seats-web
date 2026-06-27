import { API_URL } from "@/lib/constants"
import type { Venue } from "@/features/shows/types"

export async function fetchVenues(): Promise<Venue[]> {
  const res = await fetch(`${API_URL}/venues`, {
    headers: { accept: "application/json" },
  })
  if (!res.ok) throw new Error("Failed to fetch venues")
  return res.json()
}
