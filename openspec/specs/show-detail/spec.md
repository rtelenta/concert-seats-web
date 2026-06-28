## Purpose

Defines the show detail page at `/shows/[id]`, which displays information about a single show and provides navigation to seat selection and the home page.

## Requirements

### Requirement: Show detail page fetches and displays show data
The show detail page at `/shows/[id]` SHALL fetch show data from `GET /shows/:id` and display the title, artist, formatted date and time, and status.

#### Scenario: Show loads successfully
- **WHEN** the user navigates to `/shows/[id]` with a valid show id
- **THEN** the page displays the show title, artist name, formatted date/time, and status badge

#### Scenario: Show not found
- **WHEN** the API returns a 404 for the given id
- **THEN** the page renders a not-found message (no crash)

#### Scenario: Loading state
- **WHEN** the show data is still being fetched
- **THEN** skeleton placeholders are shown in place of the show fields

### Requirement: Show detail page has a "Select Seats" navigation button
The show detail page SHALL display a prominent button that navigates the user to `/shows/[id]/seats`.

#### Scenario: Button navigates to seats page
- **WHEN** the user clicks the "Select Seats" button on the show detail page
- **THEN** the browser navigates to `/shows/[id]/seats`

### Requirement: Show detail page has a back link to the home page
The show detail page SHALL display a back link that navigates the user to the home page (`/`).

#### Scenario: Back link navigates home
- **WHEN** the user clicks the back link
- **THEN** the browser navigates to `/`
