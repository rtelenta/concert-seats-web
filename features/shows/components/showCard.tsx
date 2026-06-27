"use client"

import Link from "next/link"
import { Music2 } from "lucide-react"
import type { ShowWithVenue } from "@/features/shows/types"

const GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-rose-500 to-orange-500",
  "from-teal-500 to-cyan-600",
  "from-amber-500 to-yellow-400",
  "from-emerald-500 to-green-600",
  "from-pink-500 to-rose-600",
]

function hashTitle(title: string): number {
  return title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % GRADIENTS.length
}

function formatDateTime(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) + " · " + date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })
}

type ShowCardProps = {
  show: ShowWithVenue
}

export function ShowCard({ show }: ShowCardProps) {
  const gradient = GRADIENTS[hashTitle(show.title)]

  return (
    <Link
      href={`/shows/${show.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md"
    >
      <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${gradient}`}>
        <Music2 className="h-12 w-12 text-white/80" />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <span className="text-sm text-muted-foreground">{show.artist}</span>
        <span className="font-semibold leading-tight text-foreground group-hover:underline">
          {show.title}
        </span>
        <span className="mt-1 text-sm text-muted-foreground">
          {formatDateTime(show.dateTime)}
        </span>
        {show.venue && (
          <span className="text-sm text-muted-foreground">
            {show.venue.name} · {show.venue.city}
          </span>
        )}
      </div>
    </Link>
  )
}
