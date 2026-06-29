## Overview

Wire up `POST /shows/:id/seats/hold` from the seat selection page. The work splits into two pieces: a TanStack Query mutation hook that owns the API call and auth token retrieval, and an update to the summary bar component to expose the action.

## Hook: `useHoldSeats`

**Location**: `features/shows/hooks/useHoldSeats.ts`

Uses `useMutation` from TanStack Query. On `mutate`, it:
1. Calls `useAuth().getToken()` from `@clerk/nextjs` to get the Clerk JWT
2. If the token is `null`, throws an error (session expired — caller handles this as an error state)
3. POSTs to `${API_URL}/shows/${showId}/seats/hold` with body `{ seatIds }` and header `Authorization: Bearer <token>`

```ts
type HoldSeatsInput = { showId: string; seatIds: string[] };

export function useHoldSeats() {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async ({ showId, seatIds }: HoldSeatsInput) => {
      const token = await getToken();
      if (!token) throw new Error(t("errors.sessionExpired"));
      const res = await fetch(`${API_URL}/shows/${showId}/seats/hold`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatIds }),
      });
      if (!res.ok) throw new Error(t("errors.holdFailed"));
    },
  });
}
```

`API_URL` comes from `lib/constants.ts` (already exists).

## Component: `SeatsSummaryBar` update

**Location**: `features/shows/components/SeatsSummaryBar.tsx`

Add the `useHoldSeats` mutation. Render a "Hold Seats" button alongside the existing count and price summary.

Button states:
- **Disabled**: `selectedSeatIds.length === 0` or `isPending`
- **Loading**: show a spinner / loading text when `isPending`
- **Error**: render `mutation.error?.message` below the bar when `isError`

All button label text goes into `locales/en.json` (`seats.holdSeats`, `seats.holding`, `errors.sessionExpired`, `errors.holdFailed`).

## API Contract

```
POST /shows/:id/seats/hold
Authorization: Bearer <clerk-jwt>
Content-Type: application/json

{ "seatIds": ["uuid1", "uuid2"] }
```

Response on success: `2xx` (body shape not consumed by the frontend in this change).
Response on failure: non-2xx triggers the error state.

## Files Changed

| File | Change |
|---|---|
| `features/shows/hooks/useHoldSeats.ts` | New — mutation hook |
| `features/shows/components/SeatsSummaryBar.tsx` | Add Hold Seats button, loading, error |
| `locales/en.json` | Add `seats.holdSeats`, `seats.holding`, `errors.sessionExpired`, `errors.holdFailed` |
