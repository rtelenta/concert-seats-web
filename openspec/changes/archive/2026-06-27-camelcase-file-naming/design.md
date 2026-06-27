## Overview

Pure mechanical rename: 10 multi-word kebab-case files become camelCase, and all `@/` import paths that reference them are updated. No logic changes.

## Rename Table

| Old path | New path |
|----------|----------|
| `components/site-header.tsx` | `components/siteHeader.tsx` |
| `features/home/pages/home-page.tsx` | `features/home/pages/homePage.tsx` |
| `features/shows/api/fetch-shows.ts` | `features/shows/api/fetchShows.ts` |
| `features/shows/api/fetch-venues.ts` | `features/shows/api/fetchVenues.ts` |
| `features/shows/components/show-card.tsx` | `features/shows/components/showCard.tsx` |
| `features/shows/components/show-filters.tsx` | `features/shows/components/showFilters.tsx` |
| `features/shows/components/show-grid.tsx` | `features/shows/components/showGrid.tsx` |
| `features/shows/hooks/use-shows.ts` | `features/shows/hooks/useShows.ts` |
| `features/shows/hooks/use-venues.ts` | `features/shows/hooks/useVenues.ts` |
| `features/shows/hooks/use-shows-with-venues.ts` | `features/shows/hooks/useShowsWithVenues.ts` |

## Files Untouched

- `button.tsx`, `providers.tsx`, `types.ts`, `constants.ts`, `utils.ts`, `t.ts` — single-word, already unambiguous
- `page.tsx`, `layout.tsx`, `next.config.ts`, `next-env.d.ts` — Next.js reserved names, must not change

## Import Updates Required

Each file that imports a renamed module must update its `@/` path. The affected consumer files are:

| Consumer | Imports to update |
|----------|-------------------|
| `app/layout.tsx` | `@/components/site-header` |
| `app/page.tsx` | `@/features/home/pages/home-page` |
| `app/shows/[id]/page.tsx` | (none — imports only `@/utils/t`) |
| `features/home/pages/homePage.tsx` (itself) | `@/features/shows/components/show-grid` |
| `features/shows/api/fetchShows.ts` (itself) | `@/lib/constants`, `@/features/shows/types` — unchanged |
| `features/shows/api/fetchVenues.ts` (itself) | `@/lib/constants`, `@/features/shows/types` — unchanged |
| `features/shows/hooks/useShows.ts` | `@/features/shows/api/fetch-shows` |
| `features/shows/hooks/useVenues.ts` | `@/features/shows/api/fetch-venues` |
| `features/shows/hooks/useShowsWithVenues.ts` | `@/features/shows/hooks/use-shows`, `@/features/shows/hooks/use-venues` |
| `features/shows/components/showCard.tsx` | (no cross-feature imports to update) |
| `features/shows/components/showFilters.tsx` | (no cross-feature imports to update) |
| `features/shows/components/showGrid.tsx` | `@/features/shows/hooks/use-shows-with-venues`, `@/features/shows/components/show-card`, `@/features/shows/components/show-filters` |
| `components/siteHeader.tsx` | (no cross-feature imports to update) |

## Approach

Rename files with `git mv` (preserves history), then update all import strings in-place. TypeScript path aliases (`@/`) mean only the file-name segment of each path changes — the prefix stays identical.
