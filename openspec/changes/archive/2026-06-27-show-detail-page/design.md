## Context

The home page already lists shows via `features/shows/`. We need a detail page at `/shows/[id]` that fetches a single show and links to a placeholder seats page at `/shows/[id]/seats`.

## Goals / Non-Goals

**Goals:**
- Render show detail from `GET /shows/:id`
- "Select Seats" button linking to `/shows/[id]/seats`
- Placeholder seats page with back-nav to show detail

**Non-Goals:**
- Seat map rendering or any booking logic
- Venue detail lookup (venueId is displayed as-is or omitted)
- Authentication gating

## Decisions

### Component tree

```
app/shows/[id]/page.tsx          ← thin shell (Server Component)
  └── features/shows/pages/ShowDetailPage.tsx   ← "use client", owns query

app/shows/[id]/seats/page.tsx    ← thin shell (Server Component)
  └── features/shows/pages/SeatsPage.tsx        ← placeholder, reads params
```

### Data fetching

TanStack Query hook in `features/shows/hooks/useShow.ts`:

```ts
// query key
["shows", id]

// endpoint
GET ${API_URL}/shows/${id}

// response shape
{
  id: string;
  title: string;
  artist: string;
  dateTime: string;   // ISO 8601
  status: "PUBLISHED" | "DRAFT";
  venueId: string;
  createdAt: string;
  updatedAt: string;
}
```

The existing `features/shows/hooks/` already contains `useShows.ts` — `useShow.ts` follows the same pattern.

### Route param access

Next.js 16 App Router passes `params` as a Promise to page components. The shell unwraps it with `React.use()`:

```ts
// app/shows/[id]/page.tsx
export default function ShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  return <ShowDetailPage id={id} />;
}
```

### Locale keys

New keys added to `locales/en.json` under `shows`:
- `shows.detail.backToShows`
- `shows.detail.selectSeats`
- `shows.detail.status`
- `shows.seats.comingSoon`
- `shows.seats.backToShow`

## Risks / Trade-offs

- [No venue name on detail page] → The `GET /shows/:id` response only includes `venueId`. Displaying venue name would require a second fetch. Deferred to a future change.
- [SSR vs CSR] → Using `"use client"` + TanStack Query keeps the pattern consistent with the existing show listing. A Server Component fetch would be faster but diverges from the current pattern.
