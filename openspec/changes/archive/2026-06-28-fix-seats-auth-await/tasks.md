## 1. Fix async middleware handler

- [x] 1.1 In `proxy.ts`, add `async` to the `clerkMiddleware` handler and `await` before `auth.protect()`
