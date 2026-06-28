"use client"

import Link from "next/link"
import { t } from "@/utils/t"

interface SeatsPageProps {
  id: string
}

export function SeatsPage({ id }: SeatsPageProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link
        href={`/shows/${id}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        ← {t("shows.seats.backToShow")}
      </Link>

      <div className="rounded-xl border border-border bg-card p-12 text-center shadow-sm">
        <p className="text-xl font-medium text-muted-foreground">
          {t("shows.seats.comingSoon")}
        </p>
        <p className="mt-2 text-sm text-muted-foreground opacity-60">Show: {id}</p>
      </div>
    </div>
  )
}
