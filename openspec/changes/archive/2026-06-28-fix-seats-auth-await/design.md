## Context

`proxy.ts` uses `clerkMiddleware((auth, req) => { ... })` with a synchronous handler. `auth.protect()` in `@clerk/nextjs@7` is async — it returns a Promise that either resolves (user is signed in) or throws a `NEXT_REDIRECT` error (user is not signed in). Without `await`, the thrown rejection is unhandled and the middleware handler returns `undefined`, causing Next.js to serve the page normally.

## Goals / Non-Goals

**Goals:** Make `auth.protect()` actually enforce the redirect.

**Non-Goals:** Any other change.

## Decision

Make the handler async and await `auth.protect()`:

```ts
export default clerkMiddleware(async (auth, req) => {
  if (isSeatsRoute(req)) {
    await auth.protect()
  }
})
```

When `await auth.protect()` throws `NEXT_REDIRECT`, the async handler propagates the rejection up to the `clerkMiddleware` wrapper, which catches it and returns the redirect response to Next.js — preventing the page from rendering.

## Evidence

From the error log:
- `unhandledRejection: Error: NEXT_REDIRECT` — the Promise is thrown but not caught
- `clerk_digest: 'CLERK_PROTECT_REDIRECT_TO_SIGN_IN'` — Clerk did generate the redirect
- `GET /shows/[id]/seats 200` — page rendered anyway because middleware returned no response
