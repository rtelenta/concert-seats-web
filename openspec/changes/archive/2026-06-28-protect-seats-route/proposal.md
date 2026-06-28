## Why

The seats page (`/shows/[id]/seats`) lets users browse and select seats for a show. This page should be protected — anonymous users should be redirected to sign in before they can access it.

Clerk is already installed and configured (`@clerk/nextjs@7`, `ClerkProvider` in the root layout, sign-in/sign-up buttons in the site header). There is currently no Next.js middleware, so all routes are public by default.

## What Changes

- Add `middleware.ts` at the project root using `clerkMiddleware` and `createRouteMatcher` from `@clerk/nextjs/server`
- Match only `/shows/[id]/seats` (and any sub-paths) as protected
- Unauthenticated users hitting a protected route are automatically redirected to the Clerk sign-in flow and returned to the original URL after signing in
- All other routes remain public

## Capabilities

### Modified Capabilities

- `seat-selection`: The seats page now requires authentication. Unauthenticated users are redirected to sign-in; after authenticating they are returned to the original URL.

## Impact

- New file: `middleware.ts` at project root
- No changes to any component or API hook
- No new environment variables (reuses `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` already in use)

## Non-goals

- Protecting any other route (home, show detail remain public)
- Role-based access or organisation-level guards
- Custom sign-in page (uses Clerk's hosted UI)
