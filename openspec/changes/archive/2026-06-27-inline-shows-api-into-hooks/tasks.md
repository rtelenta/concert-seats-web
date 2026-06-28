## 1. Update hooks

- [x] 1.1 Inline fetch logic into `features/shows/hooks/useShows.ts` and remove the `fetchShows` import
- [x] 1.2 Inline fetch logic into `features/shows/hooks/useVenues.ts` and remove the `fetchVenues` import

## 2. Delete api folder

- [x] 2.1 `git rm features/shows/api/fetchShows.ts features/shows/api/fetchVenues.ts` and remove the empty `features/shows/api/` directory

## 3. Verify

- [x] 3.1 Run `bun run build` and confirm zero TypeScript errors
