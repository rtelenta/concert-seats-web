"use client"

import { useMemo } from "react"
import type { Seat } from "@/features/shows/types"
import { SeatTile } from "@/features/shows/components/seatTile"
import { t } from "@/utils/t"

interface SeatGridProps {
  seats: Seat[]
  selectedIds: Set<string>
  onToggle: (seatId: string) => void
}

export function SeatGrid({ seats, selectedIds, onToggle }: SeatGridProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, Seat[]>>()
    for (const seat of seats) {
      if (!map.has(seat.section)) map.set(seat.section, new Map())
      const rowMap = map.get(seat.section)!
      if (!rowMap.has(seat.row)) rowMap.set(seat.row, [])
      rowMap.get(seat.row)!.push(seat)
    }
    for (const rowMap of map.values()) {
      for (const rowSeats of rowMap.values()) {
        rowSeats.sort((a, b) => a.number - b.number)
      }
    }
    return map
  }, [seats])

  return (
    <div className="space-y-8">
      {Array.from(grouped.entries()).map(([section, rowMap]) => (
        <div key={section}>
          <h2 className="mb-4 text-lg font-semibold">
            {t("shows.seats.section")}: {section}
          </h2>
          <div className="space-y-3">
            {Array.from(rowMap.entries()).map(([row, rowSeats]) => (
              <div key={row} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-sm text-muted-foreground">
                  {t("shows.seats.row")} {row}
                </span>
                <div className="flex flex-wrap gap-2">
                  {rowSeats.map((seat) => (
                    <SeatTile
                      key={seat.seatId}
                      seat={seat}
                      selected={selectedIds.has(seat.seatId)}
                      onToggle={onToggle}
                    />
                  ))}
                </div>
                <span className="ml-auto text-xs text-muted-foreground">
                  ${rowSeats[0].price}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
