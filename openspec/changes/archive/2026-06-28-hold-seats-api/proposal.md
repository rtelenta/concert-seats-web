## Why

Users can select seats on the seat selection page but have no way to reserve them — without a hold, two users can select the same seat simultaneously and only one will succeed at checkout. This change wires up the `POST /shows/:id/seats/hold` backend endpoint so selected seats are temporarily held before the user proceeds.

## What Changes

- Add a `useHoldSeats` mutation hook that calls `POST /shows/:id/seats/hold` with `{ seatIds: string[] }` and attaches the Clerk bearer token as an `Authorization` header
- Integrate the mutation into the seat selection page's summary bar so the user can trigger a hold on their selected seats

## Capabilities

### New Capabilities
- `seat-hold`: Mutation hook and UI trigger to POST a seat hold request to the backend, authenticated with the Clerk bearer token

### Modified Capabilities
- `seat-selection`: Summary bar gains a "Hold Seats" action that invokes the seat-hold mutation; loading and error states are added to the bar

## Impact

- `features/shows/hooks/` — new `useHoldSeats` hook using TanStack Query mutation
- `features/shows/components/` — `SeatsSummaryBar` updated with a hold button, loading state, and error feedback
- No new environment variables (gateway URL already exists in `lib/constants.ts`)
- Clerk: uses `useAuth().getToken()` (client-side only) to retrieve the JWT — no new Clerk config required
- No new backend endpoints — the gateway endpoint already exists; this change is frontend-only

## Non-goals

- Payment / checkout flow beyond the hold step
- Hold expiry countdown UI
- Optimistic seat status updates after a successful hold
