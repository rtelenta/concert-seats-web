"use client"

import { Suspense, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useShowsWithVenues } from "@/features/shows/hooks/useShowsWithVenues"
import { ShowCard } from "@/features/shows/components/showCard"
import { ShowFilters } from "@/features/shows/components/showFilters"
import { t } from "@/utils/t"

function ShowGridInner() {
  const { data: shows, isLoading, isError } = useShowsWithVenues()
  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get("search")?.toLowerCase() ?? ""
  const city = searchParams.get("city") ?? ""
  const month = searchParams.get("month") ?? ""

  const filtered = useMemo(() => {
    return shows.filter((show) => {
      if (search && !show.title.toLowerCase().includes(search) && !show.artist.toLowerCase().includes(search)) {
        return false
      }
      if (city && show.venue?.city !== city) return false
      if (month) {
        const d = new Date(show.dateTime)
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        if (ym !== month) return false
      }
      return true
    })
  }, [shows, search, city, month])

  const hasActiveFilters = search || city || month

  function clearFilters() {
    router.replace("?", { scroll: false })
  }

  if (isError) {
    return (
      <p className="text-center text-sm text-destructive">
        Failed to load shows. Please try again later.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {!isLoading && (
        <ShowFilters shows={shows} />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl border border-border bg-muted"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-muted-foreground">{t("shows.noResults")}</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm font-medium text-foreground underline underline-offset-2 hover:no-underline"
            >
              {t("shows.clearFilters")}
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ShowGrid() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-xl border border-border bg-muted"
            />
          ))}
        </div>
      }
    >
      <ShowGridInner />
    </Suspense>
  )
}
