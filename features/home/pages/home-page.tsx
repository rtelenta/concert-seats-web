"use client"

import { t } from "@/utils/t"
import { ShowGrid } from "@/features/shows/components/show-grid"

export function HomePage() {
  return (
    <main className="flex flex-col gap-8 px-6 py-8 md:px-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t("home.title")}
        </h1>
        <p className="text-muted-foreground">{t("home.subtitle")}</p>
      </div>
      <ShowGrid />
    </main>
  )
}
