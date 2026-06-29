## Purpose

Defines the seat selection page at `/shows/[id]/seats`, covering how seats are fetched and displayed, availability states, toggle selection behaviour, the selected seats summary bar, and navigation back to the show detail page.

## Requirements

### Requirement: Seats page fetches and displays seats grouped by section and row
The seats page at `/shows/[id]/seats` SHALL fetch seats from `GET /shows/:id/seats` and render them grouped by `section`, then by `row`, with seats sorted by `number` within each row.

#### Scenario: Seats load successfully
- **WHEN** the user navigates to `/shows/[id]/seats`
- **THEN** seats are displayed in section groups (e.g., "Floor", "Balcony"), each containing row sub-groups (e.g., "Row A", "Row B"), each containing individual seat tiles sorted by number

#### Scenario: Loading state
- **WHEN** the seats fetch is in progress
- **THEN** skeleton placeholders are shown

#### Scenario: Error state
- **WHEN** the seats fetch fails
- **THEN** an error message is shown with no crash

### Requirement: Seat tiles reflect availability status
Each seat tile SHALL visually distinguish between available and unavailable seats.

#### Scenario: Available seat
- **WHEN** a seat has `status === "AVAILABLE"`
- **THEN** the tile is rendered as interactive (clickable, highlighted color)

#### Scenario: Unavailable seat
- **WHEN** a seat has `status !== "AVAILABLE"` (e.g., "HELD", "SOLD")
- **THEN** the tile is rendered as non-interactive (muted, cursor-not-allowed)

### Requirement: Users can select and deselect available seats
Clicking an available seat tile SHALL toggle its selected state. Selected seats SHALL be visually distinguished from unselected available seats.

#### Scenario: Select a seat
- **WHEN** the user clicks an available seat tile
- **THEN** the seat becomes selected and its tile shows a selected visual state

#### Scenario: Deselect a seat
- **WHEN** the user clicks a selected seat tile
- **THEN** the seat is deselected and returns to its available visual state

#### Scenario: Cannot select unavailable seat
- **WHEN** the user clicks an unavailable seat tile
- **THEN** nothing happens (no state change)

### Requirement: Selected seats summary is displayed
The page SHALL display a persistent summary bar showing the count of selected seats, the total price, and a "Hold Seats" button. The button SHALL be disabled when no seats are selected or when a hold request is in progress. When the hold mutation succeeds or fails, the summary bar SHALL reflect the resulting state.

#### Scenario: Summary updates on selection
- **WHEN** the user selects or deselects seats
- **THEN** the summary shows the correct count and total (sum of `price` for each selected seat)

#### Scenario: No seats selected
- **WHEN** no seats are selected
- **THEN** the summary shows 0 seats and $0 total, and the "Hold Seats" button is disabled

#### Scenario: Hold request in progress
- **WHEN** the user clicks "Hold Seats" and the request is in flight
- **THEN** the "Hold Seats" button shows a loading indicator and is disabled

#### Scenario: Hold request fails
- **WHEN** the backend returns an error for the hold request
- **THEN** an error message is shown in the summary bar and the button returns to its clickable state

### Requirement: Seats page has a back link to the show detail page
The seats page SHALL display a back link that navigates the user back to `/shows/[id]`.

#### Scenario: Back link navigates to show detail
- **WHEN** the user clicks the back link
- **THEN** the browser navigates to `/shows/[id]`

### Requirement: Seats page requires authentication
The seats page at `/shows/[id]/seats` SHALL be accessible only to authenticated users. Unauthenticated users SHALL be redirected to the Clerk sign-in flow and returned to the original URL after signing in. The redirect SHALL prevent the page from rendering (no 200 response for unauthenticated requests).

#### Scenario: Unauthenticated user is redirected
- **WHEN** an unauthenticated user navigates to `/shows/[id]/seats`
- **THEN** they are redirected to the Clerk sign-in page

#### Scenario: After sign-in, user is returned to the seats page
- **WHEN** an unauthenticated user is redirected to sign-in and then signs in successfully
- **THEN** they are redirected back to the original `/shows/[id]/seats` URL

#### Scenario: Authenticated user can access the page
- **WHEN** a signed-in user navigates to `/shows/[id]/seats`
- **THEN** the seats page renders normally with no redirect
