## Context

`@clerk/nextjs@7` is installed. `ClerkProvider` wraps the root layout. There is no `middleware.ts` yet — all routes are currently public. Protection is implemented at the middleware layer so it works for all access methods (direct navigation, client-side routing, API calls).

## Goals / Non-Goals

**Goals:**
- Protect `/shows/[id]/seats` at the middleware level
- Redirect unauthenticated users to Clerk sign-in with return URL

**Non-Goals:**
- Protecting any other route
- Custom sign-in UI

## Decisions

### Middleware file

A single `middleware.ts` at the project root:

```ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isSeatsRoute = createRouteMatcher(["/shows/(.*)/seats(.*)"])

export default clerkMiddleware((auth, req) => {
  if (isSeatsRoute(req)) {
    auth.protect()
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
```

### Why middleware, not a Server Component guard

Middleware runs before rendering and handles the redirect with no flash of the protected page. A Server Component guard (`auth().protect()` in the page) would also work but runs after the layout renders and is a secondary layer — middleware is the idiomatic Clerk approach.

### Route pattern

`/shows/(.*)/seats(.*)` captures any show id and any sub-path under `/seats`. The `createRouteMatcher` function from `@clerk/nextjs/server` accepts Next.js-style path patterns.

### `auth.protect()` behaviour

When called inside the middleware handler:
- If the user is signed in: no-op, request continues
- If not signed in: Clerk issues a redirect to the hosted sign-in page with `redirect_url` set to the original request URL, so the user lands back on the seats page after authenticating

### matcher config

The standard Clerk-recommended matcher skips static files and `_next` internals while running middleware on all page and API routes.

## Risks / Trade-offs

- [None] — This is a minimal, additive change. No existing behaviour is modified.
