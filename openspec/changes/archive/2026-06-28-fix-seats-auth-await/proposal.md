## Why

The seats route protection silently fails. The logs show `unhandledRejection: Error: NEXT_REDIRECT` followed by `GET /shows/[id]/seats 200` — the page renders normally for unauthenticated users despite the redirect being triggered.

Root cause: `auth.protect()` in `@clerk/nextjs` v7 is async. It returns a Promise that throws a `NEXT_REDIRECT` error when the user is not signed in. Without `await`, the Promise rejection goes unhandled and the middleware handler returns without a response — Next.js then continues to render the page, producing a 200.

## What Changes

- Add `async` to the `clerkMiddleware` handler in `proxy.ts`
- Add `await` before `auth.protect()`

## Capabilities

### Modified Capabilities

- `seat-selection`: No behaviour change — unauthenticated users are now actually redirected (the intended behaviour from the previous changes is finally enforced).

## Impact

- `proxy.ts`: two-character change (`async` + `await`)
- No other files touched

## Non-goals

- Any other change to middleware or routing
