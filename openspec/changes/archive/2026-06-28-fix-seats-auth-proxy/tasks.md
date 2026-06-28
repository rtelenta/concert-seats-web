## 1. Fix middleware placement

- [x] 1.1 Delete `middleware.ts` from the project root
- [x] 1.2 Update `proxy.ts` — add `createRouteMatcher` import, define `isSeatsRoute` matching `/shows/(.*)/seats(.*)`, replace bare `clerkMiddleware()` call with a handler that calls `auth.protect()` when the route matches; preserve the existing `config.matcher` unchanged
