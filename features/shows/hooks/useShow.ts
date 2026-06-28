import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import type { Show } from "@/features/shows/types";

async function fetchShow(id: string): Promise<Show> {
  const res = await fetch(`${API_URL}/shows/${id}`, {
    headers: { accept: "application/json" },
  });
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (!res.ok) throw new Error("Failed to fetch show");
  return res.json() as Promise<Show>;
}

export function useShow(id: string) {
  return useQuery({
    queryKey: ["shows", id],
    queryFn: () => fetchShow(id),
  });
}
