import { SeatsPage } from "@/features/shows/pages/seatsPage"

export default async function SeatsRoute({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <SeatsPage id={id} />
}
