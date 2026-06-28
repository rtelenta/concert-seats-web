## ADDED Requirements

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
The page SHALL display a persistent summary showing the count of selected seats and the total price.

#### Scenario: Summary updates on selection
- **WHEN** the user selects or deselects seats
- **THEN** the summary shows the correct count and total (sum of `price` for each selected seat)

#### Scenario: No seats selected
- **WHEN** no seats are selected
- **THEN** the summary shows 0 seats and $0 total

### Requirement: Seats page has a back link to the show detail page
The seats page SHALL display a back link that navigates the user back to `/shows/[id]`.

#### Scenario: Back link navigates to show detail
- **WHEN** the user clicks the back link
- **THEN** the browser navigates to `/shows/[id]`
