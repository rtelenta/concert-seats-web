## 1. Data Layer

- [x] 1.1 Add `useShow(id: string)` hook in `features/shows/hooks/useShow.ts` — fetches `GET ${API_URL}/shows/${id}` with TanStack Query key `["shows", id]`
- [x] 1.2 Add locale keys `shows.detail.backToShows`, `shows.detail.selectSeats`, `shows.detail.status`, `shows.seats.comingSoon`, `shows.seats.backToShow` to `locales/en.json`

## 2. Show Detail Page

- [x] 2.1 Create `features/shows/pages/ShowDetailPage.tsx` — `"use client"` component that accepts `id: string`, calls `useShow`, renders title, artist, formatted dateTime, and status badge; includes skeleton loading state and not-found fallback
- [x] 2.2 Add "Back to Shows" link (navigates to `/`) and "Select Seats" button (navigates to `/shows/[id]/seats`) in `ShowDetailPage`
- [x] 2.3 Create thin shell `app/shows/[id]/page.tsx` — unwraps `params` with `React.use()` and renders `<ShowDetailPage id={id} />`

## 3. Seats Placeholder Page

- [x] 3.1 Create `features/shows/pages/SeatsPage.tsx` — placeholder component displaying the show id and a "coming soon" message, plus a back link to `/shows/[id]`
- [x] 3.2 Create thin shell `app/shows/[id]/seats/page.tsx` — unwraps `params` with `React.use()` and renders `<SeatsPage id={id} />`
