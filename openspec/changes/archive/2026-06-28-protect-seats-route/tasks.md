## 1. Middleware

- [x] 1.1 Create `middleware.ts` at the project root — imports `clerkMiddleware` and `createRouteMatcher` from `@clerk/nextjs/server`; defines `isSeatsRoute` matching `/shows/(.*)/seats(.*)`; calls `auth.protect()` when the route matches; exports the standard Clerk `matcher` config
