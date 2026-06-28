## Context

`proxy.ts` is the project's Next.js middleware file. It currently calls `clerkMiddleware()` with no handler, making Clerk session data available on all routes but protecting none. The incorrect `middleware.ts` created by `protect-seats-route` duplicates this entry point and must be removed.

## Goals / Non-Goals

**Goals:**
- Remove `middleware.ts`
- Add `createRouteMatcher`-based protection into `proxy.ts`

**Non-Goals:**
- Any other change to `proxy.ts` (keep the matcher config as-is)

## Decisions

### Final state of `proxy.ts`

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
    "/__clerk/:path*",
  ],
}
```

The `/__clerk/:path*` matcher entry that was already in `proxy.ts` is preserved — it is not present in the incorrectly created `middleware.ts`.

## Risks / Trade-offs

- [None] — This is a corrective change. Behaviour after the fix is identical to the intended behaviour from `protect-seats-route`.
