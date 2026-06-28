## Context

The placeholder `SeatsPage` at `features/shows/pages/seatsPage.tsx` is being replaced with a real implementation. The route (`app/shows/[id]/seats/page.tsx`) and its async shell remain unchanged — only the feature component is replaced.

## Goals / Non-Goals

**Goals:**
- Fetch `GET /shows/:id/seats` via TanStack Query
- Render seats grouped by section → row → seat number
- Toggle seat selection locally with visual feedback
- Show running total (count + price)

**Non-Goals:**
- Submitting a booking (no POST)
- Real-time availability updates
- Max seat selection cap

## Decisions

### Component tree

```
app/shows/[id]/seats/page.tsx   ← unchanged async shell
  └── features/shows/pages/seatsPage.tsx        ← "use client", replaced
        ├── features/shows/components/seatGrid.tsx   ← section/row grouping
        └── features/shows/components/seatTile.tsx   ← individual seat button
```

### Data fetching

New hook `features/shows/hooks/useSeats.ts`:

```ts
// query key
["shows", id, "seats"]

// endpoint
GET ${API_URL}/shows/${id}/seats

// response shape (added to features/shows/types.ts)
type Seat = {
  seatId: string
  showId: string
  seatDefinitionId: string
  section: string
  row: string
  number: number
  price: number
  status: "AVAILABLE" | "HELD" | "SOLD"
  heldBy: string | null
  heldUntil: string | null
  version: number
  createdAt: string
}
```

### Grouping logic

Group seats client-side (inside `SeatGrid`) using a two-level `Map<section, Map<row, Seat[]>>`. Sections and rows are rendered in insertion order (which matches the API's natural sort: Floor before Balcony, A before B before C). Seats within a row are sorted by `number`.

### Selection state

`useState<Set<string>>` in `SeatsPage`, keyed by `seatId`. Passed as props to `SeatGrid` / `SeatTile`.

### SeatTile

A `<button>` element:
- `disabled` when `status !== "AVAILABLE"`
- `aria-pressed` when selected
- Visual states via Tailwind: available (border-primary), selected (bg-primary text-primary-foreground), unavailable (bg-muted text-muted-foreground opacity-50 cursor-not-allowed)
- Displays seat number only (e.g. "3")

### Summary bar

Sticky bottom bar inside `SeatsPage` showing: `{count} seat(s) selected · $${total}`. Hidden when count is 0.

### Locale keys

New keys added to `locales/en.json` under `shows.seats`:
- `shows.seats.backToShow` — already exists
- `shows.seats.loading`
- `shows.seats.error`
- `shows.seats.section`
- `shows.seats.row`
- `shows.seats.selected` (e.g., "{count} seat(s) selected")
- `shows.seats.total`

## Risks / Trade-offs

- [No booking CTA] → The summary bar shows count/price but has no "Book" button. A future change adds the booking flow.
- [Client-side grouping] → Fine for the data volume (30 seats in the example). If venues have 1000s of seats, this could be moved to the hook.
