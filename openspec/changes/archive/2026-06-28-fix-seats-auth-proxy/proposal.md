## Why

The previous `protect-seats-route` change incorrectly created a new `middleware.ts` file to protect `/shows/[id]/seats`. The project already has `proxy.ts` at the root that serves as the Next.js middleware entry point — it exports `clerkMiddleware()` with the correct matcher config (including `/__clerk/:path*`). Having two middleware-shaped files creates a conflict and the route protection does not live in the right place.

## What Changes

- Delete the incorrectly created `middleware.ts`
- Update `proxy.ts` to replace the bare `clerkMiddleware()` call with a handler-based call that uses `createRouteMatcher` to protect `/shows/[id]/seats`

## Capabilities

### Modified Capabilities

- `seat-selection`: Route protection behaviour is unchanged — the seats page still requires authentication. The implementation is now correctly placed in `proxy.ts` rather than a separate `middleware.ts`.

## Impact

- `middleware.ts` deleted
- `proxy.ts` updated (minimal diff: add import of `createRouteMatcher`, replace bare call with handler)
- No changes to any component, hook, or spec

## Non-goals

- Changing any other route protection behaviour
- Modifying the matcher config in `proxy.ts`
