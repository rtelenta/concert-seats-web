## Why

Users can browse shows on the home page but have no way to view show details or navigate to seat selection. This change adds a show detail page and a placeholder seats page to establish the navigation flow.

## What Changes

- Add a show detail page at `/shows/[id]` that fetches and displays show metadata (title, artist, date/time, status)
- Add a "Select Seats" button on the detail page linking to the seats page
- Add a placeholder seats page at `/shows/[id]/seats`

## Capabilities

### New Capabilities

- `show-detail`: Display full details for a single show fetched from `GET /shows/:id`
- `seats-placeholder`: Placeholder page at `/shows/[id]/seats` for future seat selection UI

### Modified Capabilities

- `show-listing`: Each show card/row on the home page should link to `/shows/[id]`

## Impact

- New routes: `app/shows/[id]/page.tsx`, `app/shows/[id]/seats/page.tsx`
- New feature files under `features/shows/`
- API: `GET /shows/:id` — returns `{ id, title, artist, dateTime, status, venueId, createdAt, updatedAt }`
- No new environment variables (reuses `NEXT_PUBLIC_API_URL`)
- No Clerk concerns — detail page is public

## Non-goals

- Seat map rendering or actual seat selection logic
- Booking/reservation flow
- Venue detail display beyond what the show response provides
