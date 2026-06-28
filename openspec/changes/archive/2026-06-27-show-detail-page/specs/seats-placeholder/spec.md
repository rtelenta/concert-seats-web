## ADDED Requirements

### Requirement: Seats placeholder page renders at the correct route
The seats page at `/shows/[id]/seats` SHALL render a placeholder UI indicating that seat selection is coming soon. It SHALL display the show id from the URL.

#### Scenario: Seats page renders
- **WHEN** the user navigates to `/shows/[id]/seats`
- **THEN** a placeholder page is shown with a "coming soon" message and the show id

### Requirement: Seats page has a back link to the show detail page
The seats page SHALL display a back link that navigates the user back to `/shows/[id]`.

#### Scenario: Back link navigates to show detail
- **WHEN** the user clicks the back link on the seats page
- **THEN** the browser navigates to `/shows/[id]`
