import { ShowDetailPage } from "@/features/shows/pages/showDetailPage"

export default async function ShowPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ShowDetailPage id={id} />
}
