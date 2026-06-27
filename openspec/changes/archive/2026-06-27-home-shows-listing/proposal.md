## Why

The home page is currently an empty shell. Users need to browse available concerts before they can book seats — this change builds the show discovery experience that kicks off the entire booking flow.

## What Changes

- Add `NEXT_PUBLIC_API_URL` env var pointing to the backend gateway
- Fetch published shows (`GET /shows`) and venues (`GET /venues`) in parallel on the home page
- Join shows with venue data client-side to display venue name and city on cards
- Render shows in a responsive grid with placeholder images (gradient + music icon)
- Add URL-param-persisted filters: text search (title/artist), city, and month
- Add a stub `app/shows/[id]/page.tsx` so show card links resolve (content is future work)

## Capabilities

### New Capabilities

- `show-listing`: Browse published shows on the home page with a filterable grid; filters (search, city, month) are persisted as URL search params

### Modified Capabilities

<!-- none -->

## Non-goals

- Show detail page content (stub only — `/shows/[id]` renders a placeholder)
- Seat selection or booking flow
- Real show images (placeholder only)
- Pagination (small dataset, load all)
- Authentication requirement (public browse; auth gates booking, not discovery)

## Impact

- **API**: Consumes `GET /shows` and `GET /venues` from the NestJS gateway; no new endpoints needed
- **Env**: New `NEXT_PUBLIC_API_URL` variable required in `.env` and `.env.example`
- **Clerk**: No auth concerns — show listing is public; Clerk's `Show` component in the header already handles signed-in/out display
- **Files touched**: `features/home/`, new `features/shows/`, `app/shows/[id]/page.tsx`, `locales/en.json`, `lib/constants.ts`
