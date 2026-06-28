## Why

`fetchShows` and `fetchVenues` are tiny single-call functions each used by exactly one caller — their respective React Query hook. The `api/` layer adds a file and an import hop with no benefit. Inlining the fetch logic directly into the hooks removes the indirection without losing any clarity.

## What Changes

- Move the fetch logic from `features/shows/api/fetchShows.ts` into `features/shows/hooks/useShows.ts`
- Move the fetch logic from `features/shows/api/fetchVenues.ts` into `features/shows/hooks/useVenues.ts`
- Delete `features/shows/api/fetchShows.ts`, `features/shows/api/fetchVenues.ts`, and the now-empty `features/shows/api/` directory

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

<!-- none — behavior is identical, only file organization changes -->

## Non-goals

- Changing any fetch logic, error handling, or filtering behavior
- Extracting a shared API client abstraction

## Impact

- **Files deleted**: `features/shows/api/fetchShows.ts`, `features/shows/api/fetchVenues.ts`
- **Files modified**: `features/shows/hooks/useShows.ts`, `features/shows/hooks/useVenues.ts`
- **No other files affected** — nothing else imported from `features/shows/api/`
