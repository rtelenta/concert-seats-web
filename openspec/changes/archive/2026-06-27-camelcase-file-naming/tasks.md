## 1. Rename files (git mv)

- [x] 1.1 `git mv components/site-header.tsx components/siteHeader.tsx`
- [x] 1.2 `git mv features/home/pages/home-page.tsx features/home/pages/homePage.tsx`
- [x] 1.3 `git mv features/shows/api/fetch-shows.ts features/shows/api/fetchShows.ts`
- [x] 1.4 `git mv features/shows/api/fetch-venues.ts features/shows/api/fetchVenues.ts`
- [x] 1.5 `git mv features/shows/components/show-card.tsx features/shows/components/showCard.tsx`
- [x] 1.6 `git mv features/shows/components/show-filters.tsx features/shows/components/showFilters.tsx`
- [x] 1.7 `git mv features/shows/components/show-grid.tsx features/shows/components/showGrid.tsx`
- [x] 1.8 `git mv features/shows/hooks/use-shows.ts features/shows/hooks/useShows.ts`
- [x] 1.9 `git mv features/shows/hooks/use-venues.ts features/shows/hooks/useVenues.ts`
- [x] 1.10 `git mv features/shows/hooks/use-shows-with-venues.ts features/shows/hooks/useShowsWithVenues.ts`

## 2. Update import paths in consumer files

- [x] 2.1 `app/layout.tsx` — update `@/components/site-header` → `@/components/siteHeader`
- [x] 2.2 `app/page.tsx` — update `@/features/home/pages/home-page` → `@/features/home/pages/homePage`
- [x] 2.3 `features/home/pages/homePage.tsx` — update `@/features/shows/components/show-grid` → `@/features/shows/components/showGrid`
- [x] 2.4 `features/shows/hooks/useShows.ts` — update `@/features/shows/api/fetch-shows` → `@/features/shows/api/fetchShows`
- [x] 2.5 `features/shows/hooks/useVenues.ts` — update `@/features/shows/api/fetch-venues` → `@/features/shows/api/fetchVenues`
- [x] 2.6 `features/shows/hooks/useShowsWithVenues.ts` — update `use-shows` → `useShows` and `use-venues` → `useVenues`
- [x] 2.7 `features/shows/components/showGrid.tsx` — update `use-shows-with-venues` → `useShowsWithVenues`, `show-card` → `showCard`, `show-filters` → `showFilters`

## 3. Verify

- [x] 3.1 Run `bun run build` and confirm zero TypeScript errors
