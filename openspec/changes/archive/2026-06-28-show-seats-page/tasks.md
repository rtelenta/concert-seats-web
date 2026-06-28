## 1. Data Layer

- [x] 1.1 Add `Seat` type to `features/shows/types.ts` — `{ seatId, showId, seatDefinitionId, section, row, number, price, status: "AVAILABLE" | "HELD" | "SOLD", heldBy, heldUntil, version, createdAt }`
- [x] 1.2 Create `features/shows/hooks/useSeats.ts` — fetches `GET ${API_URL}/shows/${id}/seats` with query key `["shows", id, "seats"]`
- [x] 1.3 Add locale keys under `shows.seats` in `locales/en.json`: `loading`, `error`, `section`, `row`, `selected`, `total`

## 2. Seat Components

- [x] 2.1 Create `features/shows/components/seatTile.tsx` — a `<button>` displaying the seat number; disabled and muted when `status !== "AVAILABLE"`; uses `aria-pressed` and distinct Tailwind classes for available / selected / unavailable states
- [x] 2.2 Create `features/shows/components/seatGrid.tsx` — groups `Seat[]` by section then row, renders section headings and row sub-headings, renders `SeatTile` for each seat sorted by number; receives `selectedIds: Set<string>` and `onToggle: (seatId: string) => void` as props

## 3. Seats Page

- [x] 3.1 Replace `features/shows/pages/seatsPage.tsx` — `"use client"` component; calls `useSeats(id)`; owns `useState<Set<string>>` for selected seat ids; renders `SeatGrid`; shows loading skeletons and error state; displays sticky summary bar (count + total price) when at least one seat is selected; includes back link to `/shows/[id]`
