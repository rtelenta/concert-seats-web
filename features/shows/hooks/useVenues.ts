import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import type { Venue } from "@/features/shows/types";

async function fetchVenues(): Promise<Venue[]> {
  const res = await fetch(`${API_URL}/venues`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch venues");
  return res.json();
}

export const VENUES_QUERY_KEY = "venues";

export function useVenues() {
  return useQuery({
    queryKey: [VENUES_QUERY_KEY],
    staleTime: Infinity,
    queryFn: fetchVenues,
  });
}
