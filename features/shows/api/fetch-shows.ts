import { API_URL } from "@/lib/constants"
import type { Show } from "@/features/shows/types"

export async function fetchShows(): Promise<Show[]> {
  const res = await fetch(`${API_URL}/shows`, {
    headers: { accept: "application/json" },
  })
  if (!res.ok) throw new Error("Failed to fetch shows")
  const data: Show[] = await res.json()
  return data.filter((show) => show.status === "PUBLISHED")
}
