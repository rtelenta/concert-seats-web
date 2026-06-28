"use client"

import Link from "next/link"
import { useShow } from "@/features/shows/hooks/useShow"
import { t } from "@/utils/t"

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

interface ShowDetailPageProps {
  id: string
}

export function ShowDetailPage({ id }: ShowDetailPageProps) {
  const { data: show, isLoading, error } = useShow(id)

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-6 h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
          <div className="h-5 w-1/4 animate-pulse rounded bg-muted" />
        </div>
        <div className="mt-8 h-10 w-36 animate-pulse rounded bg-muted" />
      </div>
    )
  }

  if (error || !show) {
    const isNotFound = error instanceof Error && error.message === "NOT_FOUND"
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">
          {isNotFound ? "Show not found." : "Failed to load show. Please try again."}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm font-medium underline underline-offset-2"
        >
          {t("shows.detail.backToShows")}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← {t("shows.detail.backToShows")}
      </Link>

      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-3xl font-bold">{show.title}</h1>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {show.status}
          </span>
        </div>

        <p className="mb-1 text-lg text-muted-foreground">{show.artist}</p>
        <p className="text-sm text-muted-foreground">{formatDateTime(show.dateTime)}</p>

        <div className="mt-8">
          <Link
            href={`/shows/${id}/seats`}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("shows.detail.selectSeats")}
          </Link>
        </div>
      </div>
    </div>
  )
}
