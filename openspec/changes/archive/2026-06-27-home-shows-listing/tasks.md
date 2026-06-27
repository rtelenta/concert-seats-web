## 1. Environment & Constants

- [x] 1.1 Add `NEXT_PUBLIC_API_URL=http://localhost:5000` to `.env` and `.env.example`
- [x] 1.2 Add `API_URL` export to `lib/constants.ts`

## 2. Types & Locale Keys

- [x] 2.1 Create `features/shows/types.ts` with `Show`, `Venue`, and `ShowWithVenue` types
- [x] 2.2 Add `shows.*` and ensure `home.subtitle` keys exist in `locales/en.json`

## 3. Data Layer

- [x] 3.1 Create `features/shows/api/fetch-shows.ts` — fetch `/shows`, filter `status === "PUBLISHED"`
- [x] 3.2 Create `features/shows/api/fetch-venues.ts` — fetch `/venues`, return `Venue[]`
- [x] 3.3 Create `features/shows/hooks/use-shows.ts` — `useQuery` wrapping `fetchShows`
- [x] 3.4 Create `features/shows/hooks/use-venues.ts` — `useQuery` wrapping `fetchVenues` with `staleTime: Infinity`
- [x] 3.5 Create `features/shows/hooks/use-shows-with-venues.ts` — join both queries into `ShowWithVenue[]`

## 4. Show Card

- [x] 4.1 Create `features/shows/components/show-card.tsx` with gradient placeholder image (hash title → palette index), artist, title, formatted dateTime, venue name + city
- [x] 4.2 Wrap the entire card in `<Link href={/shows/${show.id}}>` from `next/link`

## 5. Filters

- [x] 5.1 Create `features/shows/components/show-filters.tsx` with search input, city dropdown, and month dropdown
- [x] 5.2 Wire all filter values to URL search params via `useSearchParams` + `useRouter().replace()`
- [x] 5.3 Populate city dropdown from unique venue cities; populate month dropdown from unique `YYYY-MM` values in show dateTimes

## 6. Show Grid

- [x] 6.1 Create `features/shows/components/show-grid.tsx` — responsive grid (1/2/3 cols), apply client-side filtering from URL params against `ShowWithVenue[]`
- [x] 6.2 Add skeleton loading state (shown while either query is loading)
- [x] 6.3 Add empty state with "no shows" message and clear-filters action

## 7. Home Page Integration

- [x] 7.1 Update `features/home/pages/home-page.tsx` to render `ShowFilters` and `ShowGrid`, and display `t("home.subtitle")` above the grid
- [x] 7.2 Mark `home-page.tsx` as `"use client"` (URL params require client context)

## 8. Routing Stub

- [x] 8.1 Create `app/shows/[id]/page.tsx` as a minimal stub (renders placeholder heading using locale keys)
