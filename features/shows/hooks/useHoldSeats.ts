"use client"

import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"
import { API_URL } from "@/lib/constants"
import { t } from "@/utils/t"

type HoldSeatsInput = { showId: string; seatIds: string[] }

export function useHoldSeats() {
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async ({ showId, seatIds }: HoldSeatsInput) => {
      const token = await getToken()
      if (!token) throw new Error(t("errors.sessionExpired"))
      const res = await fetch(`${API_URL}/shows/${showId}/seats/hold`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatIds }),
      })
      if (!res.ok) throw new Error(t("errors.holdFailed"))
    },
  })
}
