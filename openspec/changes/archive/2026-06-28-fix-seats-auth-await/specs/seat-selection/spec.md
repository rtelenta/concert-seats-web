## MODIFIED Requirements

### Requirement: Seats page requires authentication
_Bug fix — behaviour unchanged, previously broken._

The seats page at `/shows/[id]/seats` SHALL redirect unauthenticated users to the Clerk sign-in page. The redirect SHALL prevent the page from rendering (no 200 response for unauthenticated requests).
