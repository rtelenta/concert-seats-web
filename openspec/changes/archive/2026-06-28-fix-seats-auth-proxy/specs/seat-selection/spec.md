## MODIFIED Requirements

### Requirement: Seats page requires authentication
_Implementation detail clarified — no behaviour change._

The seats page at `/shows/[id]/seats` SHALL be protected by the Clerk middleware configured in `proxy.ts` (the project's Next.js middleware entry point). The `middleware.ts` file SHALL NOT exist — all middleware logic belongs in `proxy.ts`.
