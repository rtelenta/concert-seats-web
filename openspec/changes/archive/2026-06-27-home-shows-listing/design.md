## Architecture

### Data Flow

```
app/page.tsx (server component)
  └─▶ features/home/pages/home-page.tsx ("use client")
        ├─▶ ShowFilters (reads/writes URL search params)
        └─▶ ShowGrid
              └─▶ useShowsWithVenues()
                    ├─▶ useShows()   → GET /shows  → filter PUBLISHED
                    └─▶ useVenues()  → GET /venues  → build Map<id, Venue>
                          ↓
                    merge → ShowWithVenue[]
                          ↓
                    client-side filter (search, city, month)
                          ↓
                    ShowCard × N  →  <Link href="/shows/[id]">
```

Both fetches fire in parallel. React Query deduplicates and caches independently — venues with `staleTime: Infinity` since they change rarely.

### File Structure

```
lib/
  constants.ts              ← add API_URL = process.env.NEXT_PUBLIC_API_URL

features/shows/
  types.ts                  ← Show, Venue, ShowWithVenue
  api/
    fetch-shows.ts          ← GET /shows, returns Show[]
    fetch-venues.ts         ← GET /venues, returns Venue[]
  hooks/
    use-shows.ts            ← useQuery({ queryKey: ["shows"], ... })
    use-venues.ts           ← useQuery({ queryKey: ["venues"], staleTime: Infinity })
    use-shows-with-venues.ts ← joins both, returns ShowWithVenue[]
  components/
    show-card.tsx           ← single card
    show-grid.tsx           ← grid + loading + empty state
    show-filters.tsx        ← filter bar

features/home/
  pages/
    home-page.tsx           ← updated: renders ShowFilters + ShowGrid

app/
  shows/
    [id]/
      page.tsx              ← stub shell

locales/
  en.json                   ← add shows.* and home.subtitle keys
```

### Types

```ts
// features/shows/types.ts
export type Show = {
  id: string
  title: string
  artist: string
  dateTime: string        // ISO 8601
  status: "PUBLISHED" | "DRAFT"
  venueId: string
  createdAt: string
  updatedAt: string
}

export type Venue = {
  id: string
  name: string
  city: string
  capacity: number
}

export type ShowWithVenue = Show & { venue: Venue | null }
```

### Data Fetching

**fetch-shows.ts**: `GET ${API_URL}/shows` → filter `status === "PUBLISHED"` → return `Show[]`

**fetch-venues.ts**: `GET ${API_URL}/venues` → return `Venue[]`

**use-shows-with-venues.ts**: Run both queries, then merge:
```ts
const venueMap = new Map(venues.map(v => [v.id, v]))
return shows.map(show => ({ ...show, venue: venueMap.get(show.venueId) ?? null }))
```
Return `{ data: ShowWithVenue[], isLoading, isError }` — loading is true if either query is loading.

### Placeholder Image Strategy

Each show card renders a gradient background derived from the show title. Hash the title string to an index into a fixed palette of 6–8 gradients (e.g., indigo→purple, rose→orange, teal→cyan). This ensures the same show always gets the same color without randomness. A `Music2` icon from `lucide-react` is centered on the gradient. When real image URLs are added to the API, replace the gradient div with `next/image`.

```ts
const GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-rose-500 to-orange-500",
  "from-teal-500 to-cyan-600",
  "from-amber-500 to-yellow-400",
  "from-emerald-500 to-green-600",
  "from-pink-500 to-rose-600",
]
const hashTitle = (title: string) =>
  title.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % GRADIENTS.length
```

### Filter State (URL Params)

Filters live in URL search params. `ShowFilters` uses `useSearchParams()` to read and `useRouter().replace()` to write — no full page reload.

| Filter | Param | Match logic |
|--------|-------|-------------|
| search | `?search=` | `title.includes(term)` OR `artist.includes(term)`, case-insensitive |
| city   | `?city=`   | `show.venue?.city === city` |
| month  | `?month=`  | `dateTime.startsWith(month)` where month = `YYYY-MM` |

Filtering runs inside `useShowsWithVenues` or a `useMemo` in `ShowGrid` — not in the query function — so the raw data stays cached and re-filtering is instant.

### Locale Keys

Add to `locales/en.json` under existing keys:
```json
{
  "home": {
    "title": "ConcertSeats",
    "subtitle": "Find and book the best seats at live concerts"
  },
  "shows": {
    "searchPlaceholder": "Search artist or show...",
    "allCities": "All cities",
    "allDates": "All dates",
    "noResults": "No shows match your filters.",
    "clearFilters": "Clear filters",
    "detailStubTitle": "Show Details",
    "detailStubSubtitle": "Coming soon"
  }
}
```

### Environment

Add to `.env` and `.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Re-export in `lib/constants.ts`:
```ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL!
```

### Routing Stub

`app/shows/[id]/page.tsx` is a minimal server component — just enough for the link to resolve. No data fetching. Renders a placeholder heading using locale keys.
