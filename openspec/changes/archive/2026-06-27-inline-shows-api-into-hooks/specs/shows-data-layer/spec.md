## ADDED Requirements

### Requirement: Show and venue fetch logic lives in hooks
The fetch logic for shows and venues SHALL reside directly in their respective React Query hooks (`useShows`, `useVenues`). No separate API module SHALL exist for single-caller fetch functions.

#### Scenario: Shows are fetched within useShows
- **WHEN** `useShows` is called
- **THEN** it fetches from the `/shows` endpoint and returns only PUBLISHED shows without delegating to a separate module

#### Scenario: Venues are fetched within useVenues
- **WHEN** `useVenues` is called
- **THEN** it fetches from the `/venues` endpoint directly within the hook without delegating to a separate module
