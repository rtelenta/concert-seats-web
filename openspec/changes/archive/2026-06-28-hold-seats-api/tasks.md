## 1. Locale Strings

- [x] 1.1 Add `seats.holdSeats`, `seats.holding`, `errors.sessionExpired`, and `errors.holdFailed` keys to `locales/en.json`

## 2. Hold Seats Mutation Hook

- [x] 2.1 Create `features/shows/hooks/useHoldSeats.ts` with a `useMutation` that retrieves the Clerk token via `useAuth().getToken()`, throws if null, then POSTs to `${API_URL}/shows/${showId}/seats/hold` with the bearer token header and `{ seatIds }` body

## 3. Summary Bar Integration

- [x] 3.1 Import `useHoldSeats` in `SeatsSummaryBar` and wire up the mutation's `mutate`, `isPending`, and `isError`/`error` states
- [x] 3.2 Add the "Hold Seats" button (disabled when no seats selected or `isPending`; shows loading text from locale when `isPending`)
- [x] 3.3 Render `mutation.error?.message` as an error message below the bar when `isError`
