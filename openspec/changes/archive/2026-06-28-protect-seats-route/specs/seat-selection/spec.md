## MODIFIED Requirements

### Requirement: Seats page requires authentication
The seats page at `/shows/[id]/seats` SHALL be accessible only to authenticated users. Unauthenticated users SHALL be redirected to the Clerk sign-in flow and returned to the original URL after signing in.

#### Scenario: Unauthenticated user is redirected
- **WHEN** an unauthenticated user navigates to `/shows/[id]/seats`
- **THEN** they are redirected to the Clerk sign-in page

#### Scenario: After sign-in, user is returned to the seats page
- **WHEN** an unauthenticated user is redirected to sign-in and then signs in successfully
- **THEN** they are redirected back to the original `/shows/[id]/seats` URL

#### Scenario: Authenticated user can access the page
- **WHEN** a signed-in user navigates to `/shows/[id]/seats`
- **THEN** the seats page renders normally with no redirect
