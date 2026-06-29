"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useSeats } from "@/features/shows/hooks/useSeats"
import { useHoldSeats } from "@/features/shows/hooks/useHoldSeats"
import { SeatGrid } from "@/features/shows/components/seatGrid"
import { t } from "@/utils/t"

interface SeatsPageProps {
  id: string
}

export function SeatsPage({ id }: SeatsPageProps) {
  const { data: seats, isLoading, isError } = useSeats(id)
  const holdMutation = useHoldSeats()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const handleToggle = useCallback((seatId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(seatId)) {
        next.delete(seatId)
      } else {
        next.add(seatId)
      }
      return next
    })
  }, [])

  const selectedSeats = seats?.filter((s) => selectedIds.has(s.seatId)) ?? []
  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-32">
      <Link
        href={`/shows/${id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← {t("shows.seats.backToShow")}
      </Link>

      {isLoading ? (
        <div className="space-y-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-muted" />
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <div key={k} className="h-9 w-9 animate-pulse rounded bg-muted" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-sm text-destructive">{t("shows.seats.error")}</p>
      ) : (
        <SeatGrid seats={seats ?? []} selectedIds={selectedIds} onToggle={handleToggle} />
      )}

      {selectedIds.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedIds.size} {t("shows.seats.selected")}
              </span>
              <div className="flex items-center gap-4">
                <span className="font-semibold">
                  {t("shows.seats.total")}: ${total}
                </span>
                <button
                  onClick={() =>
                    holdMutation.mutate({ showId: id, seatIds: Array.from(selectedIds) })
                  }
                  disabled={holdMutation.isPending}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {holdMutation.isPending ? t("shows.seats.holding") : t("shows.seats.holdSeats")}
                </button>
              </div>
            </div>
            {holdMutation.isError && (
              <p className="mt-2 text-sm text-destructive">
                {holdMutation.error?.message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
