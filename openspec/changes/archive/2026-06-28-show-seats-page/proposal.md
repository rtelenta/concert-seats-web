## Why

The seats page currently shows a placeholder. Now that `GET /shows/:id/seats` is available, the page can be built out to let users browse and select seats before booking.

## What Changes

- Replace the `SeatsPage` placeholder with a real seat selection UI
- Fetch seats from `GET /shows/:id/seats`, group by section and row, and render each seat as a clickable tile
- Show seat status visually: available seats are selectable; other statuses (HELD, SOLD) are greyed out
- Track the user's selected seats locally and display a running total price

## Capabilities

### New Capabilities

- `seat-selection`: Fetch, display, and locally select seats for a show. Grouped by section → row. Shows price and availability status.

### Modified Capabilities

- `seats-placeholder`: Replaced entirely — the placeholder spec is superseded by `seat-selection`. The route (`/shows/[id]/seats`) and back-link behavior are preserved.

## Impact

- Replaces `features/shows/pages/seatsPage.tsx` (placeholder) with a full implementation
- New hook: `features/shows/hooks/useSeats.ts` — fetches `GET /shows/:id/seats`
- New type: `Seat` added to `features/shows/types.ts`
- New locale keys under `shows.seats.*`
- API: `GET /shows/:id/seats` — returns `Seat[]` (see response shape below)
- No new env vars (reuses `NEXT_PUBLIC_API_URL`)
- No Clerk concerns — seats page is public

### Seat response shape
```
{ seatId, showId, seatDefinitionId, section, row, number, price, status, heldBy, heldUntil, version, createdAt }
status: "AVAILABLE" | "HELD" | "SOLD"
```

## Non-goals

- Submitting a booking or reservation (no POST calls in this change)
- Real-time seat availability updates (polling/websockets)
- Maximum seat selection limits
- Seat map diagram/theatre layout (grid list is sufficient)
