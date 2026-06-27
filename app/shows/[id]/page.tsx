import { t } from "@/utils/t"

export default function ShowDetailPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-2xl font-bold text-foreground">{t("shows.detailStubTitle")}</h1>
      <p className="text-muted-foreground">{t("shows.detailStubSubtitle")}</p>
    </main>
  )
}
