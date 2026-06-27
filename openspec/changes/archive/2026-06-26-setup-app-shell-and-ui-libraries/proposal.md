## Why

The project was bootstrapped with `create-next-app` and still contains all the default demo page content. Before any feature work can begin, the app needs a clean shell with all libraries installed, configured, and wired up — including a custom dark-mode-only shadcn/ui theme.

## What Changes

- Remove all Next.js demo content from `app/` (default page, globals, demo assets)
- Install and configure core libraries: shadcn/ui, TanStack Query, Clerk, react-hook-form, zod
- Initialise shadcn/ui with a custom dark-mode-only theme (no light/dark toggle — always dark)
- Apply shadcn's recommended `cursor-pointer` style to the Button component
- Set up the root layout with all required providers (Clerk, TanStack Query)
- Add a minimal placeholder home page following the thin-shell page convention

## Capabilities

### New Capabilities
- `app-shell`: Root layout, global CSS, provider wiring, and clean app entry point
- `ui-theme`: Custom shadcn/ui dark-mode-only theme with concert-brand colour palette

### Modified Capabilities
<!-- none -->

## Impact

- All files under `app/` replaced
- `components/ui/` bootstrapped via shadcn CLI
- New dependencies: `@clerk/nextjs`, `@tanstack/react-query`, `react-hook-form`, `zod`, `shadcn`
- `tailwind.config.ts` and `globals.css` updated for Tailwind v4 + shadcn theme tokens
- No new API endpoints required
- No new environment variables beyond `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` (already expected by Clerk)
- No backend or auth-flow changes

## Non-goals

- No feature pages or domain logic
- No Clerk webhook configuration
- No data fetching setup beyond installing TanStack Query
