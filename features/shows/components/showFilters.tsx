"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { t } from "@/utils/t"
import type { ShowWithVenue } from "@/features/shows/types"

type ShowFiltersProps = {
  shows: ShowWithVenue[]
}

export function ShowFilters({ shows }: ShowFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const search = searchParams.get("search") ?? ""
  const city = searchParams.get("city") ?? ""
  const month = searchParams.get("month") ?? ""

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const cities = Array.from(
    new Set(shows.map((s) => s.venue?.city).filter(Boolean) as string[])
  ).sort()

  const months = Array.from(
    new Set(
      shows.map((s) => {
        const d = new Date(s.dateTime)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      })
    )
  ).sort()

  function formatMonth(ym: string): string {
    const [year, month] = ym.split("-")
    return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => updateParam("search", e.target.value)}
        placeholder={t("shows.searchPlaceholder")}
        className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring min-w-[200px]"
      />
      <select
        value={city}
        onChange={(e) => updateParam("city", e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">{t("shows.allCities")}</option>
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={month}
        onChange={(e) => updateParam("month", e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <option value="">{t("shows.allDates")}</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {formatMonth(m)}
          </option>
        ))}
      </select>
    </div>
  )
}
