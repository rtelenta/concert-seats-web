## Why

All multi-word TypeScript files are currently named in kebab-case (e.g., `show-card.tsx`, `use-shows.ts`). Renaming them to camelCase (e.g., `showCard.tsx`, `useShows.ts`) aligns with the project's naming convention for identifiers and makes the relationship between a file name and the symbol it exports immediately obvious.

## What Changes

- Rename 10 multi-word `.ts`/`.tsx` files from kebab-case to camelCase across `features/`, `components/`
- Update every import path that references a renamed file
- No logic, exports, or behavior changes — pure mechanical rename

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

<!-- none — this refactor does not change any specified behaviors -->

## Non-goals

- Renaming single-word files (`types.ts`, `constants.ts`, `button.tsx`, etc.) — already unambiguous
- Renaming Next.js reserved files (`page.tsx`, `layout.tsx`, `next.config.ts`) — framework convention
- Changing any export names, component names, or runtime behavior

## Impact

- **Files renamed**: 10 source files
- **Imports updated**: all files that import renamed modules (`app/page.tsx`, `app/layout.tsx`, `app/shows/[id]/page.tsx`, and every file in `features/`)
- **No API changes**, no new env vars, no Clerk concerns
