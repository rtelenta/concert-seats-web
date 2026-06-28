"use client"

import type { Seat } from "@/features/shows/types"

interface SeatTileProps {
  seat: Seat
  selected: boolean
  onToggle: (seatId: string) => void
}

export function SeatTile({ seat, selected, onToggle }: SeatTileProps) {
  const available = seat.status === "AVAILABLE"

  return (
    <button
      type="button"
      disabled={!available}
      aria-pressed={selected}
      aria-label={`Seat ${seat.number}, ${seat.status === "AVAILABLE" ? "available" : seat.status.toLowerCase()}`}
      onClick={() => available && onToggle(seat.seatId)}
      className={[
        "flex h-9 w-9 items-center justify-center rounded text-xs font-medium transition-colors",
        !available
          ? "cursor-not-allowed bg-muted text-muted-foreground opacity-40"
          : selected
          ? "bg-primary text-primary-foreground"
          : "border border-primary text-primary hover:bg-primary/10",
      ].join(" ")}
    >
      {seat.number}
    </button>
  )
}
