## Purpose

Defines the requirements for the home page show listing: fetching, filtering, and rendering published concert shows.

## Requirements

### Requirement: Home page displays published shows
The home page SHALL fetch and render only shows with `status === "PUBLISHED"` from the `/shows` endpoint. Shows with any other status SHALL be excluded from the listing.

#### Scenario: Published shows are displayed
- **WHEN** the home page loads
- **THEN** only shows with status "PUBLISHED" are rendered in the grid

#### Scenario: Draft shows are excluded
- **WHEN** the API returns a mix of PUBLISHED and DRAFT shows
- **THEN** only PUBLISHED shows appear in the grid

### Requirement: Show cards display venue name and city
Each show card SHALL display the venue name and city by joining show data with the `/venues` endpoint response. The venues fetch SHALL run in parallel with the shows fetch.

#### Scenario: Venue data is joined successfully
- **WHEN** a show card renders and its venueId matches a venue in the venues list
- **THEN** the card displays the venue name and city (e.g., "Barclays Center · New York")

#### Scenario: Venue not found
- **WHEN** a show's venueId does not match any venue in the venues list
- **THEN** the card renders without venue information (no crash, no empty error)

### Requirement: Show card content and layout
Each show card SHALL display: a gradient placeholder image with a music icon, the artist name (muted style), the show title (prominent style), the formatted date and time, and the venue name and city. The entire card SHALL be a clickable link to `/shows/[id]`.

#### Scenario: Card renders all fields
- **WHEN** a show card is rendered with complete show and venue data
- **THEN** all fields (placeholder image, artist, title, dateTime, venue name + city) are visible

#### Scenario: Card links to show detail
- **WHEN** a user clicks anywhere on a show card
- **THEN** the browser navigates to `/shows/[id]` where `[id]` is the show's id

#### Scenario: Gradient is consistent per show
- **WHEN** the same show is rendered multiple times
- **THEN** the placeholder gradient color is the same each time (derived from the show title)

### Requirement: Responsive show grid
The show grid SHALL display in 1 column on mobile, 2 columns on tablet, and 3 columns on desktop.

#### Scenario: Grid adapts to viewport
- **WHEN** the viewport changes between mobile, tablet, and desktop breakpoints
- **THEN** the column count adjusts accordingly

### Requirement: Filter shows by text search
The home page SHALL include a search input that filters shows by title and artist. The search value SHALL be persisted as a `search` URL search param.

#### Scenario: Filtering by title
- **WHEN** the user types "Solar" in the search input
- **THEN** only shows whose title contains "Solar" (case-insensitive) are displayed

#### Scenario: Filtering by artist
- **WHEN** the user types "Coldplay" in the search input
- **THEN** only shows whose artist matches "Coldplay" (case-insensitive) are displayed

#### Scenario: Search param is in URL
- **WHEN** the user types a search term
- **THEN** the URL updates to include `?search=<term>` without a full page reload

#### Scenario: Search is restored from URL on load
- **WHEN** the page loads with `?search=weeknd` in the URL
- **THEN** the search input is pre-filled and results are filtered accordingly

### Requirement: Filter shows by city
The home page SHALL include a city dropdown populated from the unique cities in the venues list. The selected city SHALL be persisted as a `city` URL search param. A default "All cities" option SHALL clear the filter.

#### Scenario: City dropdown shows unique cities
- **WHEN** the city dropdown is opened
- **THEN** it displays only distinct city values from the loaded venues

#### Scenario: Filtering by city
- **WHEN** the user selects "New York" from the city dropdown
- **THEN** only shows whose venue city is "New York" are displayed

#### Scenario: City param is in URL
- **WHEN** the user selects a city
- **THEN** the URL updates to include `?city=<city>` without a full page reload

### Requirement: Filter shows by month
The home page SHALL include a month dropdown populated from the unique year-month values in the shows' dateTimes. The selected month SHALL be persisted as a `month` URL search param (format: `YYYY-MM`). A default "All dates" option SHALL clear the filter.

#### Scenario: Month dropdown shows upcoming months
- **WHEN** the month dropdown is opened
- **THEN** it lists unique months derived from show dateTimes (e.g., "September 2026")

#### Scenario: Filtering by month
- **WHEN** the user selects "September 2026"
- **THEN** only shows with a dateTime in September 2026 are displayed

### Requirement: Loading and empty states
The show grid SHALL display skeleton cards while data is loading. When no shows match the active filters, an empty state message SHALL be displayed.

#### Scenario: Loading state
- **WHEN** the shows or venues fetch is in progress
- **THEN** skeleton placeholder cards are shown in the grid

#### Scenario: Empty state from filters
- **WHEN** the active filters match no shows
- **THEN** a message is displayed indicating no shows were found, with a way to clear filters
