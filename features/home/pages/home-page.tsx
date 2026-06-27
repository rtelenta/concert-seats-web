import { t } from "@/utils/t";

export function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          {t("home.title")}
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          {t("home.subtitle")}
        </p>
      </div>
    </main>
  );
}
